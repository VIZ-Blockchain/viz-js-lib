const api = require('./api');
const auth = require('./auth');
const broadcast = require('./broadcast');
const formatter = require('./formatter')(api);
const agent = require('./agent')(api);
const memo = require('./auth/memo');
const aes = require('./auth/ecc/src/aes');
const config = require('./config');
const utils = require('./utils');

const viz = {
  api,
  auth,
  broadcast,
  config,
  formatter,
  agent,
  memo,
  aes,
  utils
};

if (typeof window !== 'undefined') {
  window.viz = viz;
}

if (typeof global !== 'undefined') {
  global.viz = viz;
}

exports = module.exports = viz;
