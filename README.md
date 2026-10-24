# viz.js
viz.js the JavaScript Library with API Support for VIZ blockchain

[![npm version](https://badge.fury.io/js/viz-js-lib.svg)](https://badge.fury.io/js/viz-js-lib)

# Documentation

Here is full documentation:
https://github.com/VIZ-Blockchain/viz-js-lib/tree/master/doc

# Install
```
$ npm install viz-js-lib --save
```

## Browser
Online library minify js available in [jsDelivr CND](https://cdn.jsdelivr.net/npm/viz-js-lib@latest/dist/viz.min.js) and [Unpkg CDN](https://unpkg.com/viz-js-lib@latest/dist/viz.min.js).
```html
<script src="./viz.min.js"></script>
<script>
viz.api.getAccounts(['ned', 'dan'], function(err, response){
    console.log(err, response);
});
</script>
```
## Build

```
apt-get install -y webpack
apt-get install -y npm
apt-get install -y git

npm install -g n
n v8.4.0
PATH="$PATH"

git clone https://github.com/VIZ-Blockchain/viz-js-lib.git
cd viz-js-lib/

npm install
npm run build-browser
ls dist
```

## Server

## WebSockets and HTTP transport
Library support 2 transport types: ws, wss for websocket and http, https for pure HTTP JSONRPC.
Examples:
```js
viz.config.set('websocket','wss://viz.lexai.host/');
viz.config.set('websocket','https://rpc.viz.lexai.host/');
```

## Examples
### Broadcast Vote
```js
var viz = require('viz-js-lib');//nodejs lib

var wif = viz.auth.toWif(username, password, 'regular');
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

### Key checks: authority or agent (HF15)

HF15 added `set_agent_permission` (op 105): a principal may hand a key an explicit, frozen list of
its operations — an *agent*. An agent is not an account and never appears in any authority, so the
old check ("`getAccount` and look at `active_authority.key_auths`") silently rejects agent keys.
The recipe is now **authority OR agents**, and `viz.agent.check()` does both in one call.

Rules the helper mirrors from the node (`agent_evaluator.cpp::usable_agent_row`):

- an agent answers direct active/regular requirements only, and only for operations on its list —
  the master authority is never satisfied by an agent, nor is a nested/other authority;
- `expiration` epoch (`1970-01-01T00:00:00`) = perpetual; a date in the past = revoked;
- empty `operations` and `addons` = revoked; `addons` are off-chain scopes the node stores and
  never interprets, so a service matches its own scope there;
- one key belongs to one agent of a principal; a change of master/active, a recovery or a sale
  wipes every agent of the principal.

`check(account, key, operation)` resolves to `{allowed, source: 'authority'|'agent'|'none', role,
agent, operation}`; `find()` resolves to the raw row (or `false`), `has()` to a bool. Pass the wire
operation name (`transfer`, `pm_place_bet`, ...) to check a specific operation — with no operation
an agent key is only answered as "this is a live agent key", because its grants are per-operation.
A key that is only in a nested authority (`account_auths`) is not resolved here: use
`verify_authority` with a signed transaction for the full recursive check. On a node without HF15
the agent call fails, `find()` reads that as "no agents", and the check degrades to authorities
only.

`poisoned(row)` and `addonMatches(row, scope)` are the two pure row predicates the verdicts are
built from, exported for callers that already hold a row (and mirrored by `VIZ\Agent` in the PHP
lib).

```js
viz.config.set('websocket', 'https://api.viz.world/');

//the key recovered from the request signature
viz.agent.check('altbettor', 'VIZ7iiYUk6hFuieveBJcTVTV33aNuC2vZauXuYc9Hki3moxsm9WXe', 'transfer')
	.then(verdict => {
		if (verdict.allowed) console.log('allowed by', verdict.source);//'authority' or 'agent'
		else console.log('denied');
	});

viz.agent.get('altbettor').then(rows => console.log(rows));//every agent of the principal
viz.agent.find('altbettor', 'VIZ7ii...').then(row => console.log(row));//live row, or false
```

The write side is `viz.broadcast.setAgentPermission(...)`. The raw read method is
`viz.api.getAgentPermissionsAsync(account)`.

`viz.agent` is exported by both entries — the Node module and, since 0.18.4, the browser bundle
(`dist/viz.min.js`). The raw read method stays available as `viz.api.getAgentPermissionsAsync(account)`,
and the write side is `viz.broadcast.setAgentPermission(...)`.

## Contributions
Patches are welcome! Contributors are listed in the package.json file. Please run the tests before opening a pull request and make sure that you are passing all of them. If you would like to contribute, but don't know what to work on, check the issues list.

## Issues
When you find issues, please report them!

## License
MIT

## HF16 (0.18.5)

Block header serializers support the append-only QC (3), timeout certificate (4),
and equivocation proof (5) extensions, including validator signature maps. Version
reporting (1) and hardfork votes (2) accept the node JSON version strings. The
`validator_equivocation` virtual operation remains at index 106.

DAO requests keep the same wire format. From HF16 the node limits their maximum
amount to 1% of current supply at creation; clients must not keep a fixed 500,000
VIZ ceiling. This release does not change transaction signing or transaction extensions.
