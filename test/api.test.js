require('babel-polyfill');
import Promise from 'bluebird';
import assert from 'assert';
import makeStub from 'mocha-make-stub'
import should from 'should';

import viz, { VIZ } from '../src/api/index';
import config from '../src/config';
import testPost from './test-post.json';

describe('viz.api:', function () {
  this.timeout(30 * 1000);

  describe('new VIZ', () => {
    it('doesn\'t open a connection until required', () => {
      assert(!viz.ws, 'There was a connection on the singleton?');
      assert(!new VIZ().ws, 'There was a connection on a new instance?');
    });

    it('opens a connection on demand', (done) => {
      const s = new VIZ();
      assert(!new VIZ().ws, 'There was a connection on a new instance?');
      s.start();
      process.nextTick(() => {
        assert(s.ws, 'There was no connection?');
        done();
      });
    });
  });

  describe('setWebSocket', () => {
    it('works', () => {
      viz.setWebSocket('ws://localhost');
      config.get('websocket').should.be.eql('ws://localhost');
    });
  });

  beforeEach(async () => {
    await viz.apiIdsP;
  });

  describe('getFollowers', () => {
    describe('getting viz\'s followers', () => {
      it('works', async () => {
        const followersCount = 1;
        const result = await viz.getFollowersAsync('viz', 0, 'blog', followersCount);
        assert(result, 'getFollowersAsync resoved to null?');
        result.should.have.lengthOf(followersCount);
      });

      it('the startFollower parameter has an impact on the result', async () => {
        const followersCount = 1;
        // Get the first followersCount
        const result1 = await viz.getFollowersAsync('viz', 0, 'blog', followersCount)
        result1.should.have.lengthOf(followersCount);
        const result2 = await viz.getFollowersAsync('viz', result1[result1.length - 1].follower, 'blog', followersCount)
        result2.should.have.lengthOf(followersCount);
        result1.should.not.be.eql(result2);
      });

      it('clears listeners', async () => {
        viz.listeners('message').should.have.lengthOf(0);
      });
    });
  });

  describe('getContent', () => {
    describe('getting a random post', () => {
      it('works', async () => {
        const result = await viz.getContentAsync('pal', '2scmtp-test');
        result.should.have.properties(testPost);
      });

      it('clears listeners', async () => {
        viz.listeners('message').should.have.lengthOf(0);
      });
    });
  });

  describe('streamBlockNumber', () => {
    it('streams viz transactions', (done) => {
      let i = 0;
      const release = viz.streamBlockNumber((err, block) => {
        should.exist(block);
        block.should.be.instanceOf(Number);
        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('streamBlock', () => {
    it('streams viz blocks', (done) => {
      let i = 0;
      const release = viz.streamBlock((err, block) => {
        try {
          should.exist(block);
          block.should.have.properties([
            'previous',
            'transactions',
            'timestamp',
          ]);
        } catch (err) {
          release();
          done(err);
          return;
        }

        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('streamTransactions', () => {
    it('streams viz transactions', (done) => {
      let i = 0;
      const release = viz.streamTransactions((err, transaction) => {
        try {
          should.exist(transaction);
          transaction.should.have.properties([
            'ref_block_num',
            'operations',
            'extensions',
          ]);
        } catch (err) {
          release();
          done(err);
          return;
        }

        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('streamOperations', () => {
    it('streams viz operations', (done) => {
      let i = 0;
      const release = viz.streamOperations((err, operation) => {
        try {
          should.exist(operation);
        } catch (err) {
          release();
          done(err);
          return;
        }

        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('when there are network failures (the ws closes)', () => {
    const originalStart = VIZ.prototype.start;
    makeStub(VIZ.prototype, 'start', function () {
      return originalStart.apply(this, arguments);
    });

    const originalStop = VIZ.prototype.stop;
    makeStub(VIZ.prototype, 'stop', function () {
      return originalStop.apply(this, arguments);
    });

    it('tries to reconnect automatically', async () => {
      const viz = new VIZ();
      // console.log('RECONNECT TEST start');
      assert(!viz.ws, 'There was a websocket connection before a call?');
      // console.log('RECONNECT TEST make followers call');
      const followersCount = 1;
      await viz.getFollowersAsync('viz', 0, 'blog', followersCount);
      assert(viz.ws, 'There was no websocket connection after a call?');
      // console.log('RECONNECT TEST wait 1s');
      await Promise.delay(1000);
      // console.log('RECONNECT TEST simulate close event');
      assert(!viz.stop.calledOnce, 'VIZ::stop was already called before disconnect?');
      viz.ws.emit('close');
      assert(!viz.ws);
      assert(!viz.startP);
      assert(viz.stop.calledOnce, 'VIZ::stop wasn\'t called when the connection closed?');
      // console.log('RECONNECT TEST make followers call');
      await viz.getFollowersAsync('viz', 0, 'blog', followersCount);
      assert(viz.ws, 'There was no websocket connection after a call?');
      assert(viz.isOpen, 'There was no websocket connection after a call?');
    });
  });
});
