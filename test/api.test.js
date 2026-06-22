require('babel-polyfill');
import Promise from 'bluebird';
import assert from 'assert';
import makeStub from 'mocha-make-stub'
import should from 'should';

import viz, { VIZ } from '../src/api/index';
import config from '../src/config';

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
    const originalNode = config.get('websocket');
    after(() => {
      viz.setWebSocket(originalNode);
    });

    it('works', () => {
      viz.setWebSocket('ws://localhost');
      config.get('websocket').should.be.eql('ws://localhost');
    });
  });

  beforeEach(async () => {
    await viz.apiIdsP;
  });

  describe('getAccounts', () => {
    describe('getting viz\'s account', () => {
      it('works', async () => {
        const result = await viz.getAccountsAsync(['viz']);
        assert(result, 'getAccountsAsync resolved to null?');
        result.should.have.lengthOf(1);
        result[0].should.have.property('name', 'viz');
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
      // console.log('RECONNECT TEST make accounts call');
      await viz.getAccountsAsync(['viz']);
      assert(viz.ws, 'There was no websocket connection after a call?');
      // console.log('RECONNECT TEST wait 1s');
      await Promise.delay(1000);
      // console.log('RECONNECT TEST simulate close event');
      assert(!viz.stop.calledOnce, 'VIZ::stop was already called before disconnect?');
      viz.ws.emit('close');
      assert(!viz.ws);
      assert(!viz.startP);
      assert(viz.stop.calledOnce, 'VIZ::stop wasn\'t called when the connection closed?');
      // console.log('RECONNECT TEST make accounts call');
      await viz.getAccountsAsync(['viz']);
      assert(viz.ws, 'There was no websocket connection after a call?');
      assert(viz.isOpen, 'There was no websocket connection after a call?');
    });
  });
});
