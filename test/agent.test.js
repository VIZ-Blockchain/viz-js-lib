/**
 * Offline tests for the HF15 agent helpers. The decision rules are pure functions on purpose:
 * they mirror the node's agent_evaluator.cpp::usable_agent_row and must be testable without a node.
 */

require('babel-polyfill');
const assert = require('assert');
const agentFactory = require('../src/agent');

const KEY = 'VIZ7iiYUk6hFuieveBJcTVTV33aNuC2vZauXuYc9Hki3moxsm9WXe';
const OTHER_KEY = 'VIZ7FzBqZJmTdve9iuHXWvB3Ncu7VeJWKwpA1FpbLi4X4ZdsVAYjC';

function row(overrides) {
  return Object.assign({
    account: 'alice',
    agent_name: 'shop',
    agent_key: KEY,
    operations: ['transfer'],
    expiration: '1970-01-01T00:00:00',
    addons: ['wallet'],
    expired: false,
  }, overrides || {});
}

describe('viz.agent', function () {
  const agent = agentFactory({});

  describe('isExpired', function () {
    it('treats the epoch as perpetual, not as expired', function () {
      assert.strictEqual(agent.isExpired(row()), false);
    });

    it('flags a past expiration when the node sent no flag', function () {
      //the timestamp path is the fallback for a node that does not compute `expired`
      assert.strictEqual(
        agent.isExpired(row({ expiration: '2020-01-01T00:00:00', expired: undefined })),
        true
      );
    });

    it('keeps a future expiration live', function () {
      assert.strictEqual(agent.isExpired(row({ expiration: '2099-01-01T00:00:00' })), false);
    });

    it('lets the node flag outrank the client clock', function () {
      assert.strictEqual(
        agent.isExpired(row({ expiration: '2099-01-01T00:00:00', expired: true })),
        true
      );
    });
  });

  describe('grants', function () {
    it('covers only listed operations', function () {
      assert.strictEqual(agent.grants(row(), 'transfer'), true);
      assert.strictEqual(agent.grants(row(), 'pm_place_bet'), false);
    });

    it('refuses a row holding a never-delegable name whole', function () {
      const poisoned = row({ operations: ['transfer', 'account_update'] });
      assert.strictEqual(agent.grants(poisoned, 'transfer'), false);
    });

    it('refuses a malformed row', function () {
      assert.strictEqual(agent.grants(row({ operations: undefined }), 'transfer'), false);
    });
  });

  describe('inAuthority', function () {
    it('accepts a member that alone meets the threshold', function () {
      const authority = {
        weight_threshold: 2,
        key_auths: [[KEY, 2], [OTHER_KEY, 1]],
      };
      assert.strictEqual(agent.inAuthority(authority, KEY), true);
    });

    it('refuses a member below the threshold', function () {
      const authority = { weight_threshold: 2, key_auths: [[KEY, 1]] };
      assert.strictEqual(agent.inAuthority(authority, KEY), false);
    });

    it('refuses a missing authority', function () {
      assert.strictEqual(agent.inAuthority(false, KEY), false);
      assert.strictEqual(agent.inAuthority(undefined, KEY), false);
    });
  });

  describe('keyEquals / normalizeKey', function () {
    it('tolerates whitespace and a missing prefix', function () {
      assert.strictEqual(agent.keyEquals(KEY, ` ${KEY} `), true);
      assert.strictEqual(agent.keyEquals(KEY, KEY.slice(3)), true);
      assert.strictEqual(agent.keyEquals(KEY, OTHER_KEY), false);
    });

    it('returns the canonical form', function () {
      assert.strictEqual(agent.normalizeKey(KEY.slice(3)), KEY);
      assert.strictEqual(agent.normalizeKey(KEY), KEY);
    });

    it('hands back an unparsable value trimmed', function () {
      assert.strictEqual(agent.normalizeKey(' not-a-key '), 'not-a-key');
    });
  });

  describe('find / has / check against a stubbed node', function () {
    function stub(rows, accountObject) {
      return agentFactory({
        getAgentPermissionsAsync: () => Promise.resolve(rows),
        getAccountAsync: () => Promise.resolve(accountObject),
      });
    }

    it('finds the key and applies the operation list', function () {
      const stubbed = stub([row()], false);
      return stubbed.has('alice', KEY, 'transfer').then((allowed) => {
        assert.strictEqual(allowed, true);
        return stubbed.has('alice', KEY, 'pm_place_bet');
      }).then((allowed) => {
        assert.strictEqual(allowed, false);
        return stubbed.has('alice', OTHER_KEY, 'transfer');
      }).then((allowed) => {
        assert.strictEqual(allowed, false);
      });
    });

    it('skips expired rows', function () {
      const stubbed = stub([row({ expired: true })], false);
      return stubbed.has('alice', KEY, 'transfer').then((allowed) => {
        assert.strictEqual(allowed, false);
      });
    });

    it('answers an authority key from the account object', function () {
      const stubbed = stub([], {
        name: 'alice',
        active_authority: { weight_threshold: 1, key_auths: [[KEY, 1]] },
      });
      return stubbed.check('alice', KEY, 'transfer').then((verdict) => {
        assert.strictEqual(verdict.allowed, true);
        assert.strictEqual(verdict.source, 'authority');
        assert.strictEqual(verdict.role, 'active');
      });
    });

    it('answers an agent key from the rows', function () {
      const stubbed = stub([row()], false);
      return stubbed.check('alice', KEY, 'transfer').then((verdict) => {
        assert.strictEqual(verdict.allowed, true);
        assert.strictEqual(verdict.source, 'agent');
        assert.strictEqual(verdict.agent.agent_name, 'shop');
      });
    });

    it('denies a key matching neither', function () {
      const stubbed = stub([], { name: 'alice' });
      return stubbed.check('alice', OTHER_KEY, 'transfer').then((verdict) => {
        assert.strictEqual(verdict.allowed, false);
        assert.strictEqual(verdict.source, 'none');
      });
    });

    it('degrades to authorities when the node refuses the agent call', function () {
      const stubbed = agentFactory({
        getAgentPermissionsAsync: () => Promise.reject(new Error('unknown method')),
        getAccountAsync: () => Promise.resolve({ name: 'alice' }),
      });
      return stubbed.check('alice', KEY, 'transfer').then((verdict) => {
        assert.strictEqual(verdict.allowed, false);
        assert.strictEqual(verdict.source, 'none');
      });
    });
  });
});
