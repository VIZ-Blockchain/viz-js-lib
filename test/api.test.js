require('babel-polyfill');
import assert from 'assert';
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
});
