const viz = require('../lib');

const username = process.env.VIZ_USERNAME;
const password = process.env.VIZ_PASSWORD;
const wif = viz.auth.toWif(username, password, 'posting');

viz
  .broadcast
  .upvote(
    wif,
    username,
    'pal',
    '2scmtp-test',
    null,
    function(err, result) {
      console.log(err, result);
    }
  );
