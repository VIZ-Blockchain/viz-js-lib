// Websocket-transport / streaming tests.
//
// These require a websocket (ws:// or wss://) node and a persistent
// connection, so they are excluded from `npm run test-ci` and meant to be
// run manually via `npm run test-ws` against a ws endpoint, e.g.:
//   VIZ_WS_NODE=wss://node.example/ws npm run test-ws
require('babel-polyfill');
import Promise from 'bluebird';
import assert from 'assert';
import makeStub from 'mocha-make-stub'
import should from 'should';

import viz, { VIZ } from '../src/api/index';
import config from '../src/config';

describe('viz.api (websocket):', function () {
  this.timeout(30 * 1000);

  const wsNode = process.env.VIZ_WS_NODE;
  before(() => {
    if (wsNode) {
      config.set('websocket', wsNode);
    }
  });

  beforeEach(async () => {
    await viz.apiIdsP;
  });

  describe('new VIZ', () => {
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
