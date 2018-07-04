const viz = require('../lib');

const resultP = viz.api.getContentAsync('pal', '2scmtp-test');
resultP.then(result => console.log(result));
