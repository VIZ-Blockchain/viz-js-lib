/**
 * The browser entry (src/browser.js) has its own export list, separate from src/index.js, and
 * webpack builds dist/viz.min.js from it. In 0.18.3 the agent module existed in the Node build but
 * was missing here, so the released browser bundle silently lacked `viz.agent` while the READMEs
 * said it was a Node-only module. This test pins the shared surface of the two entries.
 */

require('babel-polyfill');
const assert = require('assert');
const browser = require('../src/browser');
const node = require('../src/index');

const SHARED = ['api', 'auth', 'broadcast', 'config', 'formatter', 'agent', 'memo', 'aes', 'utils'];

describe('browser entry exports', function () {
  SHARED.forEach(function (key) {
    it('exposes ' + key + ', like the Node entry does', function () {
      assert.ok(browser[key], key + ' is missing from src/browser.js');
      assert.strictEqual(typeof browser[key], typeof node[key]);
    });
  });

  it('exposes the agent helpers the browser bundle is documented to carry', function () {
    ['check', 'get', 'find', 'has', 'grants', 'poisoned', 'addonMatches', 'isExpired', 'inAuthority']
      .forEach(function (name) {
        assert.strictEqual(typeof browser.agent[name], 'function', 'viz.agent.' + name + ' is missing');
      });
  });

  it('publishes viz on window/global, which is how a browser page reaches it', function () {
    assert.strictEqual(global.viz, browser);
  });
});
