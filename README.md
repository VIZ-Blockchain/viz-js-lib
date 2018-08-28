# viz.js
viz.js the JavaScript API for VIZ blockchain

[![npm version](https://badge.fury.io/js/viz-world-js.svg)](https://badge.fury.io/js/viz-world-js)

# Documentation

Here is full documentation:
https://github.com/VIZ-World/viz-world-js/tree/master/doc

# Install
```
$ npm install viz-world-js --save
```

## Browser
```html
<script src="./viz.min.js"></script>
<script>
viz.api.getAccounts(['ned', 'dan'], function(err, response){
    console.log(err, response);
});
</script>
```

## Server

## WebSockets
wss://testnet.viz.world By Default<br/>

## Examples
### Broadcast Vote
```js
var viz = require('viz');

var wif = viz.auth.toWif(username, password, 'posting');
viz.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
	console.log(err, result);
});
```

### Get Accounts
```js
viz.api.getAccounts(['ned', 'dan'], function(err, result) {
	console.log(err, result);
});
```

## Contributions
Patches are welcome! Contributors are listed in the package.json file. Please run the tests before opening a pull request and make sure that you are passing all of them. If you would like to contribute, but don't know what to work on, check the issues list.

## Issues
When you find issues, please report them!

## License
MIT
