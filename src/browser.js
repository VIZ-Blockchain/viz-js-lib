const api = require("./api");
const auth = require("./auth");
const broadcast = require("./broadcast");
const config = require("./config");
const formatter = require("./formatter")(api);
const memo = require('./auth/memo');
const utils = require("./utils");

const viz = {
  api,
  auth,
  broadcast,
  config,
  formatter,
  memo,
  utils
};

if (typeof window !== "undefined") {
  window.viz = viz;
}

if (typeof global !== "undefined") {
  global.viz = viz;
}

exports = module.exports = viz;
