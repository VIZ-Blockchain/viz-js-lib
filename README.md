# viz.js
viz.js the JavaScript API for VIZ blockchain

[![npm version](https://badge.fury.io/js/golos-js.svg)](https://badge.fury.io/js/golos-js)

# Documentation

- [Install](#install)
- [Browser](#browser)
- [Config](#config)
- [Database API](#api)
    - [Subscriptions](#subscriptions)
    - [Tags](#tags)
    - [Blocks and transactions](#blocks-and-transactions)
    - [Globals](#globals)
    - [Keys](#keys)
    - [Accounts](#accounts)
    - [Market](#market)
    - [Authority / validation](#authority--validation)
    - [Votes](#votes)
    - [Content](#content)
    - [Witnesses](#witnesses)
- [Login API](#login)
- [Follow API](#follow-api)
- [Broadcast API](#broadcast-api)
- [Broadcast](#broadcast)
- [Auth](#auth)

# Install
```
$ npm install golos-js --save
```

Here is full documentation:
https://github.com/GolosChain/golos-js/tree/master/doc

## Browser
```html
<script src="./golos.min.js"></script>
<script>
golos.api.getAccounts(['ned', 'dan'], function(err, response){
    console.log(err, response);
});
</script>
```

## Server

## WebSockets
wss://ws.golos.io By Default<br/>

## Examples
### Broadcast Vote
```js
var golos = require('golos');

var wif = golos.auth.toWif(username, password, 'posting');
golos.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
	console.log(err, result);
});
```

### Get Accounts
```js
golos.api.getAccounts(['ned', 'dan'], function(err, result) {
	console.log(err, result);
});
```

### Get State
```js
golos.api.getState('/trends/funny', function(err, result) {
	console.log(err, result);
});
```

### Reputation Formatter
```js
var reputation = golos.formatter.reputation(user.reputation);
console.log(reputation);
```

## Contributions
Patches are welcome! Contributors are listed in the package.json file. Please run the tests before opening a pull request and make sure that you are passing all of them. If you would like to contribute, but don't know what to work on, check the issues list or on Golos Chat https://chat.golos.io/ channel #golosjs.

## Issues
When you find issues, please report them!

## License
MIT
