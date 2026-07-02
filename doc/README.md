# Documentation

- [Install](#install)
- [Browser](#browser)
- [Config](#config)
- [Database API](#api)
    - [Subscriptions](#subscriptions)
    - [Blocks and transactions](#blocks-and-transactions)
    - [Globals](#globals)
    - [Keys](#keys)
    - [Accounts](#accounts)
    - [Authority / validation](#authority--validation)
    - [Validators](#validators)
    - [Committee API](#committee-api)
    - [Invite API](#invite-api)
    - [Paid subscription API](#paid-subscription-api)
    - [Prediction Markets API](#prediction-markets-api)
- [Broadcast API](#broadcast-api)
- [Broadcast](#broadcast)
    - [Prediction Markets](#prediction-markets)
- [Auth](#auth)
- [Formatter](#formatter)
- Deprecated: [Content](#content)
- Deprecated: [Tags](#tags)
- Deprecated: [Follow API](#follow-api)
- Deprecated: [Votes](#votes)

# Install
```
$ npm install viz-js-lib --save
```
Or
```
$ npm install git+https://github.com/VIZ-Blockchain/viz-js-lib.git --save
```

# Browser
```html
<script src="./viz.min.js"></script>
<script>
viz.api.getAccounts(['viz','in'], function(err, response){
    console.log(err, response);
});
</script>
```

## Config
Default config should not work with VIZ without JSONRPC adress websocket in config. However you can change it to work with any viz fork
as
```js
viz.config.set('websocket','https://rpc.viz.lexai.host/'); // assuming JSONRPC transport is work at https://rpc.viz.lexai.host/
viz.config.set('address_prefix','VIZ');
viz.config.set('chain_id','2040effda178d4fffff5eab7a915d4019879f5205cc5392e4bcced2b6edda0cd');
```
### set
```
viz.config.set('address_prefix','VIZ');
```
### get
```
viz.config.get('chain_id');
```

# API

## Subscriptions

### Set Subscribe Callback
```
viz.api.setSubscribeCallback(callback, clearFilter, function(err, result) {
  console.log(err, result);
});
```
### Set Pending Transaction Callback
```
viz.api.setPendingTransactionCallback(cb, function(err, result) {
  console.log(err, result);
});
```
### Set Block Applied Callback
```
viz.api.setBlockAppliedCallback(cb, function(err, result) {
  console.log(err, result);
});
```
### Cancel All Subscriptions
```
viz.api.cancelAllSubscriptions(function(err, result) {
  console.log(err, result);
});
```

## Blocks and transactions

### Get Block Header
```
viz.api.getBlockHeader(blockNum, function(err, result) {
  console.log(err, result);
});
```
### Get Block
```
viz.api.getBlock(blockNum, function(err, result) {
  console.log(err, result);
});
```
### Get State
```
viz.api.getState(path, function(err, result) {
  console.log(err, result);
});
```
### Get Trending Categories
```
viz.api.getTrendingCategories(after, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Best Categories
```
viz.api.getBestCategories(after, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Active Categories
```
viz.api.getActiveCategories(after, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Recent Categories
```
viz.api.getRecentCategories(after, limit, function(err, result) {
  console.log(err, result);
});
```

## Globals

### Get Config
```
viz.api.getConfig(function(err, result) {
  console.log(err, result);
});
```
### Get Dynamic Global Properties
```
viz.api.getDynamicGlobalProperties(function(err, result) {
  console.log(err, result);
});
```
### Get Chain Properties
```
viz.api.getChainProperties(function(err, result) {
  console.log(err, result);
});
```
### Get Hardfork Version
```
viz.api.getHardforkVersion(function(err, result) {
  console.log(err, result);
});
```
### Get Next Scheduled Hardfork
```
viz.api.getNextScheduledHardfork(function(err, result) {
  console.log(err, result);
});
```

## Keys

### Get Key References
```
viz.api.getKeyReferences(key, function(err, result) {
  console.log(err, result);
});
```
#### Example:
```js
var publicKeys = ['VIZ...', 'VIZ...'];
viz.api.getKeyReferences(publicKeys, function(err, result) {
  //console.log(err, result);
  if (!err) {
    result.forEach(function(item) {
      console.log('getKeyReferences', 'username: [', item[0], ']');
    });
  }
  else console.error(err);
});
```

## Accounts

### Get Accounts
```
viz.api.getAccounts(names, function(err, result) {
  console.log(err, result);
});
```
#### Example:
```js
var accounts=['viz','in'];
viz.api.getAccounts(accounts, function(err, result) {
  //console.log(err, result);
  if (!err) {
    result.forEach(function(item) {
      console.log('getAccounts', 'username: [', item.name, '] id: [', item.id, ']');
    });
  }
  else console.error(err);
});
```
### Lookup Account Names
```
viz.api.lookupAccountNames(accountNames, function(err, result) {
  console.log(err, result);
});
```
#### Example:
```js
var usernames=['viz','in'];
viz.api.lookupAccountNames(usernames, function(err, result) {
  //console.log(err, result);
  if (!err) {
    result.forEach(function(item) {
    if (item) console.log('lookupAccountNames', 'username: [', item.name, '] id: [', item.id, ']');
    else console.log('lookupAccountNames', 'account not found!');
    });
  }
  else console.error(err);
});
```
### Lookup Accounts
```
viz.api.lookupAccounts(lowerBoundName, limit, function(err, result) {
  console.log(err, result);
});
```
#### Example:
```js
var searchAccountsQuery = 'vi';
var limitResults = 10;
viz.api.lookupAccounts(searchAccountsQuery, limitResults, function(err, result) {
  //console.log(err, result);
  if (!err) {
    result.forEach(function(item) {
      console.log('lookupAccounts', 'username: [', item, ']');
    });
  }
  else console.error(err);
});
```
### Get Account Count
```
viz.api.getAccountCount(function(err, result) {
  console.log(err, result);
});
```
### Get Conversion Requests
```
viz.api.getConversionRequests(accountName, function(err, result) {
  console.log(err, result);
});
```
### Get Account History
```
viz.api.getAccountHistory(account, from, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Owner History
```
viz.api.getOwnerHistory(account, function(err, result) {
  console.log(err, result);
});
```
### Get Recovery Request
```
viz.api.getRecoveryRequest(account, function(err, result) {
  console.log(err, result);
});
```
### Get Accounts on sale
```
viz.api.getAccountsOnSale(from, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Subaccounts on sale
```
viz.api.getSubccountsOnSale(from, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Account Custom Protocol data
```
viz.api.getAccount(name, custom_protocol_id, function(err, result) {
  console.log(err, result);
});
```
#### Example:
```js
var account='on1x';
var custom_protocol_id='V';//Voice
viz.api.getAccount(account, custom_protocol_id, function(err, response) {
  if (!err) {
      console.log(response);
  }
  else {
      console.error(err);
  }
});
```

## Authority / validation

### Get Transaction Hex
```
viz.api.getTransactionHex(trx, function(err, result) {
  console.log(err, result);
});
```
### Get Transaction
```
viz.api.getTransaction(trxId, function(err, result) {
  console.log(err, result);
});
```
### Get Required Signatures
```
viz.api.getRequiredSignatures(trx, availableKeys, function(err, result) {
  console.log(err, result);
});
```
### Get Potential Signatures
```
viz.api.getPotentialSignatures(trx, function(err, result) {
  console.log(err, result);
});
```
### Verify Authority
```
viz.api.verifyAuthority(trx, function(err, result) {
  console.log(err, result);
});
```
### Verify Account Authority
```
viz.api.verifyAccountAuthority(nameOrId, signers, function(err, result) {
  console.log(err, result);
});
```

## Validators


### Get Validators
```
viz.api.getValidators(validatorIds, function(err, result) {
  console.log(err, result);
});
```
Deprecated alias: `viz.api.getWitnesses(witnessIds, ...)`

### Get Validator By Account
```
viz.api.getValidatorByAccount(accountName, function(err, result) {
  console.log(err, result);
});
```
Deprecated alias: `viz.api.getWitnessByAccount(accountName, ...)`

### Get Validators By Vote
```
viz.api.getValidatorsByVote(from, limit, function(err, result) {
  console.log(err, result);
});
```
Deprecated alias: `viz.api.getWitnessesByVote(from, limit, ...)`

### Get Validators By Counted Vote
```
viz.api.getValidatorsByCountedVote(from, limit, function(err, result) {
  console.log(err, result);
});
```
Deprecated alias: `viz.api.getWitnessesByCountedVote(from, limit, ...)`

### Lookup Validator Accounts
```
viz.api.lookupValidatorAccounts(lowerBoundName, limit, function(err, result) {
  console.log(err, result);
});
```
Deprecated alias: `viz.api.lookupWitnessAccounts(lowerBoundName, limit, ...)`

### Get Validator Count
```
viz.api.getValidatorCount(function(err, result) {
  console.log(err, result);
});
```
Deprecated alias: `viz.api.getWitnessCount(...)`

### Get Active Validators
```
viz.api.getActiveValidators(function(err, result) {
  console.log(err, result);
});
```
Deprecated alias: `viz.api.getActiveWitnesses(...)`

### Get Validator Schedule
```
viz.api.getValidatorSchedule(function(err, result) {
  console.log(err, result);
});
```
Deprecated alias: `viz.api.getWitnessSchedule(...)`

### Get Miner Queue
```
viz.api.getMinerQueue(function(err, result) {
  console.log(err, result);
});
```

## Committee API

### Get committee request by id
```js
var request_id=1;
var votes_limit=-1; //-1 all, 0 none, >0 limit
viz.api.getCommitteeRequest(request_id, votes_limit, function(err, result) {
  console.log(err, result);
});
```

### Get all committee votes by request id
```js
var request_id=1;
viz.api.getCommitteeRequestVotes(request_id, function(err, result) {
  console.log(err, result);
});
```

### Get committee requests list by status
```js
var status=0;
viz.api.getCommitteeRequestsList(status, function(err, result) {
  console.log(err, result);
});
```

## Invite API

### Get invites list by status
```js
var status=0;// active invites
viz.api.getInvitesList(status, function(err, result) {
  console.log(err, result);
});
```

### Get invite by id
```js
viz.api.getInviteById(id, function(err, result) {
  console.log(err, result);
});
```

### Get invite by key
```js
var key='VIZ77gW5bga9JEsT8Ke1A2RPUN2hyiNAnveB4D7phBDH3TBw1kzBg';
viz.api.getInviteByKey(key, function(err, result) {
  console.log(err, result);
});
```

## Paid subscription API

### Get paid subscription options
```js
viz.api.getPaidSubscriptionOptions(account, function(err, result) {
  console.log(err, result);
});
```

### Get paid subscription status
```js
viz.api.getPaidSubscriptionStatus(subscriber, account, function(err, result) {
  console.log(err, result);
});
```

### Get active paid subscriptions
```js
viz.api.getActivePaidSubscriptions(subscriber, function(err, result) {
  console.log(err, result);
});
```

### Get inactive paid subscriptions
```js
viz.api.getInactivePaidSubscriptions(subscriber, function(err, result) {
  console.log(err, result);
});
```

## Prediction Markets API

Read methods of the `prediction_market_api` plugin (Onix, HF14). All ids
(`market_id`, `bet_id`, `liquidity_id`, `position_id`, `commit_id`) are plain
numeric instances. Pagination is `(…key, from, limit)` with `limit ≤ 1000`.
Monetary fields inside returned objects are `share_type` integers (raw, ×1000);
`asset` fields are strings like `"10.000 VIZ"`. See the integration spec for the
full object schemas and enums.

### Markets
```js
viz.api.getMarket(market_id, function(err, result) { console.log(err, result); });
// status: -1 deleted/rejected, 0 waiting, 1 active, 2 closed, 3 resolved
// accept_deadline (time): on a pending market = created_time + pm_oracle_accept_window_sec
//   (show as a countdown); 0/epoch on markets active at creation. If the oracle misses the
//   window the cron refunds the creator's seed and emits pm_market_expired (vop 101).
// show_risky (optional, default false): reveal under-collateralized markets
viz.api.listMarkets(status, from, limit, show_risky, function(err, result) { console.log(err, result); });
viz.api.listMarketsByOracle(oracle, from, limit, function(err, result) { console.log(err, result); });
viz.api.listMarketsByCreator(creator, from, limit, function(err, result) { console.log(err, result); });
viz.api.getMarketOutcomes(market_id, function(err, result) { console.log(err, result); });
viz.api.getMarketWeightSums(market_id, function(err, result) { console.log(err, result); });
viz.api.getMarketBets(market_id, from, limit, function(err, result) { console.log(err, result); });
viz.api.getAccountPositions(account, from, limit, function(err, result) { console.log(err, result); });
viz.api.getMarketLiquidity(market_id, from, limit, function(err, result) { console.log(err, result); });
// One-call enriched view; account is optional (adds that account's bets/leverage/LP on the market)
viz.api.getMarketFull(market_id, account, function(err, result) { console.log(err, result); });
```

### Leverage
```js
viz.api.getAccountLeveragePositions(account, from, limit, function(err, result) { console.log(err, result); });
viz.api.getMarketLeveragePositions(market_id, from, limit, function(err, result) { console.log(err, result); });
viz.api.getCreatorBan(account, function(err, result) { console.log(err, result); });
// collateral is a share_type integer (milli-VIZ)
viz.api.getLeverageQuote(market_id, outcome_index, collateral, function(err, result) { console.log(err, result); });
viz.api.getLeverageClosePreview(position_id, function(err, result) { console.log(err, result); });
viz.api.getLeverageConvertPreview(position_id, function(err, result) { console.log(err, result); });
```
> The three leverage previews are **non-consensus quotes** at the head block — always
> send the on-chain slippage guards (`min_tokens` / `min_return` / `conversion_profit_cost`)
> in the matching broadcast op.

### Oracles
```js
viz.api.getOracle(owner, function(err, result) { console.log(err, result); });
viz.api.listOracles(from, limit, function(err, result) { console.log(err, result); });
```

### Disputes
```js
viz.api.getDispute(market_id, function(err, result) { console.log(err, result); });
// live ballots + stake-weighted projection of the finalize cron
viz.api.getDisputeVotes(market_id, function(err, result) { console.log(err, result); });
```

### Lazy pool & chain properties
```js
viz.api.getLazyPool(function(err, result) { console.log(err, result); });
viz.api.getLazyDeposit(account, function(err, result) { console.log(err, result); });
viz.api.getLazyAllocations(from, limit, function(err, result) { console.log(err, result); });
viz.api.getMarketLazyAllocation(market_id, function(err, result) { console.log(err, result); });
// median (active, consensus) values of every PM governance parameter.
// Includes pm_oracle_accept_window_sec (uint32, seconds, default 3600) and
// pm_lazy_min_liquidity_fee_percent (uint16, bp, default 200) — read them live,
// don't hard-code. Below the lazy floor the lazy pool won't co-provide liquidity.
viz.api.getPmChainProperties(function(err, result) { console.log(err, result); });
```

### Metadata & charts
```js
viz.api.getMarketMeta(market_id, function(err, result) { console.log(err, result); });
// optional: jurisdiction (ISO code), subcategory, tag, sort (newest|oldest|volume|expiration)
viz.api.listMarketsByCategory(category, from, limit, jurisdiction, subcategory, tag, sort, function(err, result) { console.log(err, result); });
viz.api.getMarketCategories(function(err, result) { console.log(err, result); });
// kline pagination is offset-from-newest: from skips the newest N points
viz.api.getMarketKline(market_id, from, limit, function(err, result) { console.log(err, result); });
```

## Follow API

### Get Followers
```
viz.api.getFollowers(following, startFollower, followType, limit, function(err, result) {
  console.log(err, result);
});
```
#### Example
```js
/**
 * getFollowers() returns subscribers
 * @param {String} following - username whom return subscribers
 * @param {String} startFollower - position from which item to return result
 * @param {String} followType - subscription type, value: 'blog' or null
 * @param {Integer} limit - how many records to return, the maximum value: 100
*/
var following = 'epexa';
var startFollower = '';
var followType = null;
var limit = 100;
viz.api.getFollowers(following, startFollower, followType, limit, function(err, result) {
  //console.log(err, result);
  if ( ! err) {
    result.forEach(function(item) {
      console.log('getFollowers', item);
    });
  }
  else console.error(err);
});
```
### Get Following
```
viz.api.getFollowing(follower, startFollowing, followType, limit, function(err, result) {
  console.log(err, result);
});
```
#### Example:
```js
/**
 * getFollowing() returns subscriptions
 * @param {String} follower - username subscriber
 * @param {String} startFollower - position from which item to return result
 * @param {String} followType - subscription type, value: 'blog' или null
 * @param {Integer} limit - how many records to return, the maximum value: 100
*/
var follower = 'epexa';
var startFollower = '';
var followType = null;
var limit = 100;
viz.api.getFollowing(follower, startFollower, followType, limit, function(err, result) {
  //console.log(err, result);
  if ( ! err) {
    result.forEach(function(item) {
      console.log('getFollowing', item);
    });
  }
  else console.error(err);
});
```
### Get Follow Count
```
viz.api.getFollowCount(account, function(err, result) {
  console.log(err, result);
});
```
#### Example:
```js
/**
 * getFollowCount() returns count of subscribers and subscriptions
 * @param {String} account - username of the user to return data
*/
var account = 'epexa';
viz.api.getFollowCount(account, function(err, result) {
  console.log(err, result);
  if (!err) {
    console.log('getFollowCount', result);
  }
  else console.error(err);
});
```

## Broadcast API

### Broadcast Transaction
```
viz.api.broadcastTransaction(trx, function(err, result) {
  console.log(err, result);
});
```
### Broadcast Transaction Synchronous
```
viz.api.broadcastTransactionSynchronous(trx, function(err, result) {
  console.log(err, result);
});
```
### Broadcast Block
```
viz.api.broadcastBlock(b, function(err, result) {
  console.log(err, result);
});
```
### Broadcast Transaction With Callback
```
viz.api.broadcastTransactionWithCallback(confirmationCallback, trx, function(err, result) {
  console.log(err, result);
});
```
# Broadcast

### Committee Worker Create Request
```
viz.broadcast.committeeWorkerCreateRequest(wif, creator, url, worker, reward_amount_min, reward_amount_max, duration, function(err, result) {
  console.log(err, result);
});
```
#### Example:
```js
var wif='5K...';
var creator='on1x';
var url='https://goldvoice.club/...'; //URL with worker request for discussion
var worker='lightextension-escrow'; //account login for get payments from committee fund, it may be escrow with multisig
var reward_amount_min='1000.000 VIZ'; //Min amount of tokens needed for doing the work
var reward_amount_max='10000.000 VIZ'; //Targeted amount of tokens needed for doing the work (can not be greater that current committee fund)
var duration=432000; //60*60*24*5 - Request duration in sec (between COMMITTEE_MIN_DURATION=5 days and COMMITTEE_MAX_DURATION=30 days)
viz.broadcast.committeeWorkerCreateRequest(wif, creator, url, worker, reward_amount_min, reward_amount_max, duration, function(err, result) {
  console.log(err, result);
});
```

### Committee Worker Cancel Request
```
viz.broadcast.committeeWorkerCancelRequest(wif, creator, request_id, function(err, result) {
  console.log(err, result);
});
```

### Committee Vote Request
```
// vote_percent can be from -10000 to 10000
viz.broadcast.committeeVoteRequest(wif, voter, request_id, vote_percent, function(err, result) {
  console.log(err, result);
});
```

### Create invite
```js
viz.broadcast.createInvite(wif, creator, balance, invite_key, function(err, result) {
  console.log(err, result);
});
```

### Claim invite balance
```js
// initiator can be temp account with any wif
viz.broadcast.claimInviteBalance(wif, initator, receiver, invite_secret, function(err, result) {
  console.log(err, result);
});
```

### Use invite balance
```js
// initiator can be temp account with any wif
// Using invite balance to receive shares
viz.broadcast.useInviteBalance(wif, initator, receiver, invite_secret, function(err, result) {
  console.log(err, result);
});
```

### Invite registration
```js
viz.broadcast.inviteRegistration(wif, initator, new_account_name, invite_secret, new_account_key, function(err, result) {
  console.log(err, result);
});
```

### Set paid subscription options
```js
var levels=2;
var amount='5.000 VIZ';
var period=30;//days
var url='https://...';
viz.broadcast.setPaidSubscription(wif, account, url, levels, amount, period, function(err, result) {
  console.log(err, result);
});
```

### Paid subscribe
```js
var levels=2;
var amount='5.000 VIZ';
var period=30;//days
var auto_renewal=true;
viz.broadcast.paidSubscribe(wif, subscriber, account, levels, amount, period, auto_renewal, function(err, result) {
  console.log(err, result);
});
```

### Account Create
```
viz.broadcast.accountCreate(wif, fee, delegation, creator, newAccountName, master, active, regular, memoKey, jsonMetadata, referer, extensions, function(err, result) {
  console.log(err, result);
});
```
#### Example:
```js
/**
 * accountCreate() new account registration
 * @param {Base58} wif - private active key
 * @param {String} fee - the cost of creating an account. It will be listed by virtue of the voice of the new account
 * @param {String} creator - name of user who registers an account
 * @param {String} newAccountName - new account username
 * @param {Object} master - object containing a new master key
 * @param {Object} active - object containing a active key
 * @param {Object} regular - object containing a regular key
 * @param {String} memoKey - new memo key
 * @param {String} jsonMetadata - additional data for a new account (avatar, location, etc.)
 * @param {String} referer - name of a referer user, can be empty
*/
var wif = '5K...';
var fee = '10.000 VIZ';
var delegation = '0.000000 SHARES';
var creator = 'viz';
var newAccountName = name;
var master = {
  weight_threshold: 1,
  account_auths: [],
  key_auths: [[newKeys.masterPubkey, 1]]
};
var active = {
  weight_threshold: 1,
  account_auths: [],
  key_auths: [[newKeys.activePubkey, 1]]
};
var regular = {
  weight_threshold: 1,
  account_auths: [],
  key_auths: [[newKeys.regularPubkey, 1]]
};
var memoKey = newKeys.memo;
var jsonMetadata = '{}';
var referer = '';
var extensions = [];
viz.broadcast.accountCreate(wif, fee, delegation, creator, newAccountName, master, active, regular, memoKey, jsonMetadata, referer, extensions, function(err, result) {
  //console.log(err, result);
  if (!err) {
    console.log('accountCreate', result);
  }
  else console.error(err);
});
```

### Delegate Vesting Shares
```
viz.broadcast.delegateVestingShares(wif, delegator, delegatee, vesting_shares, function(err, result) {
  console.log(err, result);
});
```
### Account Update
```
viz.broadcast.accountUpdate(wif, account, master, active, regular, memoKey, jsonMetadata, function(err, result) {
  console.log(err, result);
});
```
####  Example

```js
/**
 * @param {Base58} wif - private master key
 * @param {String} accountName - account username
 * @param {Object} master - object containing a new master key
 * @param {Object} active - object containing a active key
 * @param {Object} regular - object containing a regular key
 * @param {String} memoKey - new memo key
 * @param {String} jsonMetadata - additional data for a new account (avatar, location, etc.)
*/

var accountName = name;
var masterWif = '5J...'

var master = {
  weight_threshold: 1,
  account_auths: [],
  key_auths: [[newKeys.masterPubkey, 1]]
};

var active = {
  weight_threshold: 1,
  account_auths: [],
  key_auths: [[newKeys.activePubkey, 1]]
};

var regular = {
  weight_threshold: 1,
  account_auths: [],
  key_auths: [[newKeys.regularPubkey, 1]]
};

var memoKey = newKeys.memo;
var jsonMetadata = account.json_metadata;

viz.broadcast.accountUpdate(masterWif, account, master, active, regular, memoKey, json_met, function(err, result)
{
	if (!err)
	{
		console.log(viz.auth.getPrivateKeys(name, password, roles));
	} else {
		console.log('Error accountUpdate: ');
		console.log(err);
	}
});
```



### Account Validator Proxy

```
viz.broadcast.accountValidatorProxy(wif, account, proxy, function(err, result) {
  console.log(err, result);
});
```
Deprecated alias: `viz.broadcast.accountWitnessProxy(wif, account, proxy, ...)`

### Account Validator Vote
```
viz.broadcast.accountValidatorVote(wif, account, validator, approve, function(err, result) {
  console.log(err, result);
});
```
Deprecated alias: `viz.broadcast.accountWitnessVote(wif, account, witness, approve, ...)`
### Change Recovery Account
```
viz.broadcast.changeRecoveryAccount(wif, accountToRecover, newRecoveryAccount, extensions, function(err, result) {
  console.log(err, result);
});
```

### Custom
```
viz.broadcast.custom(wif, requiredAuths, requiredRegularAuths, id, json, function(err, result) {
  console.log(err, result);
});
```

### Escrow Dispute
```
viz.broadcast.escrowDispute(wif, from, to, agent, who, escrowId, function(err, result) {
  console.log(err, result);
});
```
### Escrow Release
```
viz.broadcast.escrowRelease(wif, from, to, agent, who, receiver, escrowId, Amount, function(err, result) {
  console.log(err, result);
});
```
### Escrow Transfer
```
viz.broadcast.escrowTransfer(wif, from, to, Amount,escrowId, agent, fee, jsonMeta, ratificationDeadline, escrowExpiration, function(err, result) {
  console.log(err, result);
});
```

### Fill Vesting Withdraw
```
viz.broadcast.fillVestingWithdraw(wif, fromAccount, toAccount, withdrawn, deposited, function(err, result) {
  console.log(err, result);
});
```

### Recover Account
```
viz.broadcast.recoverAccount(wif, accountToRecover, newMasterAuthority, recentMasterAuthority, extensions, function(err, result) {
  console.log(err, result);
});
```
### Request Account Recovery
```
viz.broadcast.requestAccountRecovery(wif, recoveryAccount, accountToRecover, newMasterAuthority, extensions, function(err, result) {
  console.log(err, result);
});
```
### Escrow Approve
```
viz.broadcast.escrowApprove(wif, from, to, agent, who, escrowId, approve, function(err, result) {
  console.log(err, result);
});
```
### Set Withdraw Vesting Route
```
viz.broadcast.setWithdrawVestingRoute(wif, fromAccount, toAccount, percent, autoVest, function(err, result) {
  console.log(err, result);
});
```
### Transfer
```
viz.broadcast.transfer(wif, from, to, amount, memo, function(err, result) {
  console.log(err, result);
});
```
#### Example:
```js
/**
 * transfer() transfer VIZ
 * @param {Base58} wif - private master key
 * @param {String} from - username who send, whose master key
 * @param {String} to - username who get
 * @param {String} amount - number of coins in the format: 0.001 VIZ
 * @param {String} memo - a content
*/
var wif = '5J...';
var from = 'epexa';
var to = 'melnikaite';
var amount = '0.001 VIZ';
var memo = 'gift';
viz.broadcast.transfer(wif, from, to, amount, memo, function(err, result) {
  //console.log(err, result);
  if (!err) {
    console.log('transfer', result);
  }
  else console.error(err);
});
```
### Transfer To Vesting
```
viz.broadcast.transferToVesting(wif, from, to, amount, function(err, result) {
  console.log(err, result);
});
```

### Withdraw Vesting
```
viz.broadcast.withdrawVesting(wif, account, vestingShares, function(err, result) {
  console.log(err, result);
});
```
### Validator Update
```
viz.broadcast.validatorUpdate(wif, owner, url, blockSigningKey, function(err, result) {
  console.log(err, result);
});
```
Deprecated alias: `viz.broadcast.witnessUpdate(wif, owner, url, blockSigningKey, ...)`

### Validator Chain Properties Update
```
let chain_properties = {
  account_creation_fee:"1.000 VIZ",
  create_account_delegation_ratio:10,
  create_account_delegation_time:2592000,
  maximum_block_size:131072,
  min_delegation:"0.001 VIZ",
  min_curation_percent:0,
  max_curation_percent:10000,
  bandwidth_reserve_percent:1000,
  bandwidth_reserve_below:"500.000000 SHARES",
  flag_energy_additional_cost:0,
  vote_accounting_min_rshares:500000,
  committee_request_approve_min_percent:1000,
};
viz.broadcast.chainPropertiesUpdate(wif, owner, chain_properties, function(err, result) {
  console.log(err, result);
});
```
### Validator Versioned Chain Properties Update
```
var chain_properties_init = {
  account_creation_fee:"1.000 VIZ",
  create_account_delegation_ratio:10,
  create_account_delegation_time:2592000,
  maximum_block_size:131072,
  min_delegation:"0.001 VIZ",
  min_curation_percent:0,//deprecated
  max_curation_percent:10000,//deprecated
  bandwidth_reserve_percent:1000,
  bandwidth_reserve_below:"500.000000 SHARES",
  flag_energy_additional_cost:0,//deprecated
  vote_accounting_min_rshares:500000,
  committee_request_approve_min_percent:1000,
};

var chain_properties_hf4=chain_properties_init;
chain_properties_hf4.inflation_validator_percent=2000;
chain_properties_hf4.inflation_ratio_committee_vs_reward_fund=5000;
chain_properties_hf4.inflation_recalc_period=2000;

var chain_properties_hf6=chain_properties_hf4;
chain_properties_hf6.data_operations_cost_additional_bandwidth=0;
chain_properties_hf6.validator_miss_penalty_percent=10;
chain_properties_hf6.validator_miss_penalty_duration=86400;

var chain_properties_hf9=chain_properties_hf6;
chain_properties_hf9.create_invite_min_balance="10.000 VIZ";
chain_properties_hf9.committee_create_request_fee="100.000 VIZ";
chain_properties_hf9.create_paid_subscription_fee="100.000 VIZ";
chain_properties_hf9.account_on_sale_fee="10.000 VIZ";
chain_properties_hf9.subaccount_on_sale_fee="100.000 VIZ";
chain_properties_hf9.validator_declaration_fee="10.000 VIZ";
chain_properties_hf9.withdraw_intervals=28;

viz.broadcast.versionedChainPropertiesUpdate(wif, owner, [3,chain_properties_hf9], function(err, result) {
  console.log(err, result);
});
```
### Fill Vesting Withdraw
```
viz.broadcast.fillVestingWithdraw(wif, fromAccount, toAccount, withdrawn, deposited, function(err, result) {
  console.log(err, result);
});
```
### Award
```
var receiver='committee';
var energy=2;//0.02%
var custom_sequence=0;
var memo='Hello';
var beneficiaries=[]
viz.broadcast.award(wif,initiator,receiver,energy,custom_sequence,memo,beneficiaries,function(err,result){
  console.log(err,result)
});
```
### Set Account Price
```
var price='100.000 VIZ';
var on_sale=true;
viz.broadcast.setAccountPrice(master_wif,account_owner,account_seller,price,on_sale,function(err,result){
  console.log(err,result)
});
```
### Set Subaccount Price
```
var price='100.000 VIZ';
var on_sale=true;
viz.broadcast.setSubaccountPrice(master_wif,account_owner,subaccount_seller,price,on_sale,function(err,result){
  console.log(err,result)
});
```
### Buy Account
```
var price='100.000 VIZ';
var token_to_shares='1.000 VIZ';//minimum account creation fee, will be converted in SHARES
var new_authority_key='VIZ6qHF4v41yNf1nEyyzMFK9iC6uMs4fQVbj2e76iBhjZXFUaQiiz';
viz.broadcast.buyAccount(active_wif,buyer_login,account_or_subaccount_to_buy,offer_price,new_authority_key,token_to_shares,function(err,result){
  console.log(err,result)
});
```

## Prediction Markets

Builders for the 23 signed prediction-market operations (Onix, HF14). Every op
ends with an `extensions` argument — pass `[]`. Signer authority is **active**
for all of them **except** `pmDisputeVote`, which is signed with the **regular**
key. `market_id` / `bet_id` / `liquidity_id` / `position_id` / `commit_id` are
plain numeric instances; `amount`/`insurance`/`liquidity`/… are VIZ asset strings
(`"10.000 VIZ"`); `min_tokens` / `min_return` / `shares` and other `share_type`
values are raw ×1000 integers; percent fields are basis points (`10000 = 100%`)
unless noted.

### Oracle registration & market lifecycle
```js
// side: binary 0/1, multi -1 | outcome_index: multi 0..N-1, binary -1
viz.broadcast.pmOracleRegister(wif, owner, insurance, fee_percent, fixed_fee, rules_url, auto_accept_creator, auto_accept_resolver, auto_accept, [], function(err, result) { console.log(err, result); });
// pmOracleUpdate: pass null for any field you want to leave unchanged
viz.broadcast.pmOracleUpdate(wif, owner, insurance_delta, fee_percent, fixed_fee, rules_url, auto_accept_creator, auto_accept_resolver, auto_accept, [], function(err, result) { console.log(err, result); });
// market_type: 0 binary (CPMM), 1 multi (LMSR); outcomes: string[]; lmsr_b: 0 for binary
viz.broadcast.pmCreateMarket(wif, creator, oracle, market_type, outcomes, url, oracle_fee_percent, oracle_fixed_fee, creator_fee_percent, liquidity_fee_percent, liquidity, lmsr_b, betting_expiration, result_expiration, time_penalty_type, time_penalty_value, penalty_curve_type, allow_early_resolution, allow_cancellation, allow_batch, allow_instant_bet, endogeneity_tier, dispute_mode, dispute_resolver, dispute_penalty_percent, metadata, [], function(err, result) { console.log(err, result); });
viz.broadcast.pmOracleAcceptMarket(wif, oracle, market_id, accept, oracle_fee_percent, oracle_fixed_fee, [], function(err, result) { console.log(err, result); });
viz.broadcast.pmResolveMarket(wif, oracle, market_id, winning_outcome, decision_url, decision_reason, [], function(err, result) { console.log(err, result); });
viz.broadcast.pmNoContest(wif, oracle, market_id, reason, [], function(err, result) { console.log(err, result); });
```

### Betting
```js
// mode: 0 instant, 1 batch (queued to next epoch)
viz.broadcast.pmPlaceBet(wif, account, market_id, side, outcome_index, amount, min_tokens, mode, [], function(err, result) { console.log(err, result); });
// commit-reveal: compute commitment with viz.formatter.predictionMarketCommitment (see Formatter)
viz.broadcast.pmCommitBet(wif, account, market_id, commitment, escrow_amount, no_reveal_fee_percent, [], function(err, result) { console.log(err, result); });
viz.broadcast.pmRevealBet(wif, account, commit_id, side, outcome_index, amount, salt, min_tokens, [], function(err, result) { console.log(err, result); });
viz.broadcast.pmCancelBet(wif, account, bet_id, min_return, [], function(err, result) { console.log(err, result); });
// reassign bet weight to another account; amount 0 = full; no market impact
viz.broadcast.pmTransferPosition(wif, from, bet_id, to, amount, memo, [], function(err, result) { console.log(err, result); });
```

### Liquidity & lazy pool
```js
viz.broadcast.pmAddLiquidity(wif, provider, market_id, amount, [], function(err, result) { console.log(err, result); });
// amount 0 = withdraw full LP position
viz.broadcast.pmWithdrawLiquidity(wif, provider, liquidity_id, amount, [], function(err, result) { console.log(err, result); });
viz.broadcast.pmLazyDeposit(wif, account, amount, [], function(err, result) { console.log(err, result); });
// shares 0 = all; emergency true = withdraw before lock ends (penalty on locked-share profit)
viz.broadcast.pmLazyWithdraw(wif, account, shares, emergency, [], function(err, result) { console.log(err, result); });
```

### Disputes & bans
```js
// proposed_outcome: outcome claimed correct, -1 = void/no-contest challenge
viz.broadcast.pmDisputeCreate(wif, disputer, market_id, proposed_outcome, reason, [], function(err, result) { console.log(err, result); });
// committee mode — signed with the REGULAR key. vote_outcome -1 = uphold oracle
viz.broadcast.pmDisputeVote(regular_wif, voter, market_id, vote_outcome, vote_percent, [], function(err, result) { console.log(err, result); });
// account mode — verdict by the market's configured dispute_resolver
viz.broadcast.pmDisputeResolve(wif, resolver, market_id, correct_outcome, penalty_amount, ban_oracle, ban_oracle_until, ban_creator, ban_creator_until, [], function(err, result) { console.log(err, result); });
// oracle posts a public rebuttal onto the open dispute
viz.broadcast.pmDisputeOracleRespond(wif, oracle, market_id, response, [], function(err, result) { console.log(err, result); });
// lift a ban set by that resolver; at least one of unban_oracle/unban_creator must be true
viz.broadcast.pmUnban(wif, resolver, target, unban_oracle, unban_creator, [], function(err, result) { console.log(err, result); });
```

### Leverage (gated by `pm_leverage_enabled`)
```js
// binary CPMM only; outcome_index is the side 0/1
viz.broadcast.pmLeverageOpen(wif, account, market_id, outcome_index, collateral, loan, min_tokens, max_slippage_percent, [], function(err, result) { console.log(err, result); });
viz.broadcast.pmLeverageClose(wif, account, position_id, min_return, [], function(err, result) { console.log(err, result); });
// conversion_profit_cost MUST equal median(pm_conversion_profit_cost_percent) — see getLeverageConvertPreview
viz.broadcast.pmLeverageConvert(wif, account, position_id, conversion_profit_cost, [], function(err, result) { console.log(err, result); });
```

# Auth

### Verify
```
viz.auth.verify(name, password, auths);
```
#### Example:
```js
var username = 'epexa';
var password = 'P5...';  // master password
// object in which the key type public key (active, memo, master, regular), and the value of the array in the array itself is the public key
var auths = {
  regular: [['VIZ...']]
};
var verifyResult = viz.auth.verify(username, password, auths);
console.log('verify', verifyResult);
```

### Generate Keys
```
viz.auth.generateKeys(name, password, roles);
```
#### Example:
```js
/**
 * generateKeys() generating new keys for a new account
 * @param {String} name - new account username
 * @param {String} password - master-password for a new account
*/
var name = 'epexa4';
var password = 'qwerty12345';
var newKeys = viz.auth.generateKeys(name, password, ['master', 'active', 'regular', 'memo']);
console.log('newKeys', newKeys);
```

### Get Private Keys
```
viz.auth.getPrivateKeys(name, password, roles);
```
#### Example:
```js
var username = 'epexa';
var password = 'P5H...'; // master password
var roles = ['master', 'active', 'regular', 'memo']; // optional parameter, if not specify, then all keys will return
var keys = viz.auth.getPrivateKeys(username, password, roles);
console.log('getPrivateKeys', keys);
```

### Is Wif
```
viz.auth.isWif(privWif);
```
#### Example:
```js
var privWif = '5J...';
var resultIsWif = viz.auth.isWif(privWif);
console.log('isWif', resultIsWif);
```

### To Wif
```
viz.auth.toWif(name, password, role);
```
#### Example:
```js
var username = 'epexa';
var password = 'P5H...'; // master password
var role = 'regular'; // private key type, one of master, active, regular, memo
var privateKey = viz.auth.toWif(username, password, role);
console.log('toWif', privateKey);
```

### Wif Is Valid
```
viz.auth.wifIsValid(privWif, pubWif);
```
#### Example:
```js
var privWif = '5J...'; // private key
var pubWif = 'VIZ...'; // public key
var resultWifIsValid = viz.auth.wifIsValid(privWif, pubWif);
console.log('wifIsValid', resultWifIsValid);
```

### Wif To Public
```
viz.auth.wifToPublic(privWif);
```
#### Example:
```js
var privWif = '5J...'; // private key
var resultWifToPublic = viz.auth.wifToPublic(privWif, pubWif);
console.log('wifToPublic', resultWifToPublic);
```

### Sign Transaction
```
// you can set debug to true for see in console transaction, raw transaction in hex and signature in hex
viz.auth.signTransaction(trx, keys, debug);
```

# Formatter

### Create Suggested Password
```
var password = viz.formatter.createSuggestedPassword();
console.log(password);
// => 'GAz3GYFvvQvgm7t2fQmwMDuXEzDqTzn9'
```

### Content Permlink
```
var parentAuthor = 'ned';
var parentPermlink = 'a-selfie';
var contentPermlink = viz.formatter.contentPermlink(parentAuthor, parentPermlink);
console.log(contentPermlink);
// => 're-ned-a-selfie-20170621t080403765z'
```

### Estimate Account Value
```
var VIZPower = viz.formatter.estimateAccountValue(account);
```

### SHARES To VIZ
```
var shares = viz.formatter.sharesToVIZ(vestingShares, totalVestingShares, totalVestingFund);
console.log(shares);
```

### Prediction Market Commitment
Builds the byte-exact SHA-256 commitment for the commit-reveal flow
(`pmCommitBet` → `pmRevealBet`). The node recomputes this hash in the reveal
evaluator and **forfeits the escrow on any mismatch**, so the same
`side` / `outcome_index` / `amount` / `min_tokens` / `salt` MUST be re-supplied
to `pmRevealBet`. `amount` may be a milli-VIZ integer or a 3-decimal VIZ asset
string (`"10.000 VIZ"`).
```js
// (marketId, account, side, outcomeIndex, amount, minTokens, salt)
var salt = '...'; // random per-commit entropy, kept secret until reveal
var commitment = viz.formatter.predictionMarketCommitment(5, 'alice', 0, -1, '10.000 VIZ', 0, salt);
// => 64-char hex, e.g. 'acc2fbc9e024509a529584baba41dc2eabdb82c3c107dc041d37c94b24f4b3c0'
viz.broadcast.pmCommitBet(wif, 'alice', 5, commitment, '10.000 VIZ', 2000, [], function(err, result) {
  console.log(err, result);
});
```

# Utils

### Validate Username
```
var isValidUsername = viz.utils.validateAccountName('test1234');
console.log(isValidUsername);
// => 'null'

var isValidUsername = viz.utils.validateAccountName('a1');
console.log(isValidUsername);
// => 'Account name should be longer.'
```

### Post Voice Text
```
//wif,account,text,reply,share,beneficiaries,loop,callback
viz.utils.voiceText('5K...','on1x','Just a test from viz-js-lib',false,false,false,false,function(result){console.log(result)});

### Add Voice Event
```
//get last V/Voice custom protocol block sequencer from account
viz.api.getAccount(account,'V',function(err,result){
  if(!err){
    let object={
      'p':previous,
      'e':event_type,
      'b':target_block,//block to hide, edit or append
      'd':{//new data for edited object
        't':'Just a SECOND test from viz-js-lib',
      }
    };
    let new_data=JSON.stringify(object);

    //wif,account,event_type,target_account,target_block,data,loop,callback
    //event_type: h - hide, e - edit, a - append
    viz.utils.voiceText('5K...','on1x','e','on1x',result.custom_sequence_block_num,new_data,false,false,false,false,function(result){console.log(result)});
  }
});

### Post Voice Encoded Text
```
//wif,account,passphrase,comment,text,reply,share,beneficiaries,loop,callback
let passphrase='decode me :)';
let comment='You see a bottle labeled, "decode me :)"';
viz.utils.voiceEncodedText('5K...','on1x',passphrase,comment,'Just a test from viz-js-lib',false,false,false,false,function(result){console.log(result)});
```

### Post Voice Encoded Text
```
//wif,account,passphrase,comment,text,reply,share,beneficiaries,loop,callback
let passphrase=['test1','pass2','password3'];
let comment=['Do your 1 test','Type your 2 pass','Enter your 3 password'];
viz.utils.voiceEncodedText('5K...','on1x',passphrase,comment,'Just a test from viz-js-lib',false,false,false,false,function(result){console.log(result)});
```

### Post Voice Publication
```
//wif,account,text,reply,share,beneficiaries,loop,callback
let wif='5K...';
let account='on1x';
let markdown=`Well, Voice protocol markdown have **bold**, __italic__, ~~stroke~~ and \`code\`

## Headers 2

### And 3

Also we got:

> Quotes and

>> Second style for citation

Support lists:

* Unordered
* as ordinary
* items

And ordered, ofc:

*n Yes
*n it is!

After all, simple images:
![Alt text for image](https://viz.world/ubi-circle-300.jpg)

Paragraph
with
multiline

...and #en #example tags support :)`;

//wif,account,title,markdown,description,image,reply,share,beneficiaries,loop,callback
viz.utils.voicePublication(wif,account,'Test publication from viz-js-lib',markdown,false,false,false,false,false,false,function(result){console.log(result)});

/*
//encoded publication work same way as text

let passphrase='decode me :)';
let comment='You see a bottle labeled, "decode me :)"';
viz.utils.voiceEncodedPublication(wif,account,passphrase,comment,'Test publication from viz-js-lib',markdown,false,false,false,false,false,false,function(result){console.log(result)});
*/
```

# deprecated api methods
## Content


### Get Content
```
viz.api.getContent(author, permlink, votes_count, function(err, result) {
  console.log(err, result);
});
```
#### Example:
```js
/**
 * getContent() receiving a post
 * @param {String} author - author of the post
 * @param {String} permlink - url-address of the post
 * @param {Integer} votes_count - use -1 for showing all votes
*/
var author = 'viz';
var permlink = 'test';
viz.api.getContent(author, permlink, -1, function(err, result) {
  //console.log(err, result);
  if (!err) {
    console.log('getContent', result.title);
  }
  else console.error(err);
});
```
### Get Content Replies
```
viz.api.getContentReplies(parent, parentPermlink, function(err, result) {
  console.log(err, result);
});
```
#### Example:
```js
/**
 * getContentReplies() receiving a contents
 * @param {String} parent - author of the post
 * @param {String} parentPermlink - url-address of the post
*/
var parent = 'epexa';
var parentPermlink = 'test-url';
viz.api.getContentReplies(parent, parentPermlink, function(err, result) {
  //console.log(err, result);
  if (!err) {
    result.forEach(function(item) {
      console.log('getContentReplies', item.body);
    });
  }
  else console.error(err);
});
```
### Get Discussions By Author Before Date
```
viz.api.getDiscussionsByAuthorBeforeDate(author, startPermlink, beforeDate, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Replies By Last Update
```
viz.api.getRepliesByLastUpdate(startAuthor, startPermlink, limit, function(err, result) {
  console.log(err, result);
});
```

## Tags

### Get Trending Tags
```
viz.api.getTrendingTags(afterTag, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Trending
```
viz.api.getDiscussionsByTrending(query, function(err, result) {
  console.log(err, result);
});
```
#### Example:
```js
/**
 * getDiscussionsByTrending() receiving posts by tags
 * @param {Object} query - A search object that includes tags and a limit or authors username and url-address of post
*/
var query = {
  select_tags: ['dev', 'test'],
  limit: 100,
  //start_author: 'epexa',
  //start_permlink: 'test-url'
};
viz.api.getDiscussionsByTrending(query, function(err, result) {
  //console.log(err, result);
  if (!err) {
    result.forEach(function(item) {
      console.log('getDiscussionsByTrending', item.title);
    });
  }
  else console.error(err);
});
```
### Get Discussions By Created
```
viz.api.getDiscussionsByCreated(query, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Active
```
viz.api.getDiscussionsByActive(query, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Cashout
```
viz.api.getDiscussionsByCashout(query, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Payout
```
viz.api.getDiscussionsByPayout(query, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Votes
```
viz.api.getDiscussionsByVotes(query, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Children
```
viz.api.getDiscussionsByChildren(query, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Hot
```
viz.api.getDiscussionsByHot(query, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Feed
```
viz.api.getDiscussionsByFeed(query, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Blog
```
viz.api.getDiscussionsByBlog(query, function(err, result) {
  console.log(err, result);
});
```
#### Example:
```js
/**
 * getDiscussionsByBlog() receiving posts by author and tag
 * @param {Object} query - search object that includes the author, tag, limit
*/
var query = {
  select_authors: ['epexa'],
  select_tags: ['dev'],
  limit: 100
};
viz.api.getDiscussionsByBlog(query, function(err, result) {
  //console.log(err, result);
  if (!err) {
    result.forEach(function(item) {
      console.log('getDiscussionsByBlog', item.title);
    });
  }
  else console.error(err);
});
```
### Get Discussions By Contents
```
viz.api.getDiscussionsByContents(query, function(err, result) {
  console.log(err, result);
});
```

## Votes

### Get Active Votes
```
viz.api.getActiveVotes(author, permlink, function(err, result) {
  console.log(err, result);
});
```
### Get Account Votes
```
viz.api.getAccountVotes(voter, function(err, result) {
  console.log(err, result);
});
```

# deprecated broadcast
### Content
```
// deprecated
viz.broadcast.content(wif, parentAuthor, parentPermlink, author, permlink, title, body, curation_percent, jsonMetadata, extensions, function(err, result) {
  console.log(err, result);
});
```
#### Example add a post:
```js
/**
 * content() add a post
 * @param {Base58} wif - private regular key
 * @param {String} parentAuthor - for add a post, empty field
 * @param {String} parentPermlink - main tag
 * @param {String} author - author of the post
 * @param {String} permlink - url-address of the post
 * @param {String} title - header of the post
 * @param {String} body - text of the post
 * @param {String} jsonMetadata - meta-data of the post (images etc.)
 * @param {Array} extensions - example: [[ 0, {"beneficiaries":[{"account":"viz","weight":2000},{"account":"on1x","weight":1000}]} ]]
*/
var wif = '5K...';
var parentAuthor = '';
var parentPermlink = 'dev';
var author = 'epexa';
var permlink = 'test-url';
var title = 'test';
var body = 'test2';
var curation_percent = 5000;//50%
var jsonMetadata = '{}';
var extensions = [];
viz.broadcast.content(wif, parentAuthor, parentPermlink, author, permlink, title, body, curation_percent, jsonMetadata, extensions, function(err, result) {
  //console.log(err, result);
  if (!err) {
    console.log('content', result);
  }
  else console.error(err);
});
```
#### Example add a content:
```js
/**
 * content() add a content
 * @param {Base58} wif - private regular key
 * @param {String} parentAuthor - for add a content, author of the post
 * @param {String} parentPermlink - for add a content, url-address of the post
 * @param {String} author - author of the content
 * @param {String} permlink - unique url-address of the content
 * @param {String} title - for create a content, empty field
 * @param {String} body - text of the content
 * @param {String} jsonMetadata - meta-data of the post (images etc.)
*/
var wif = '5K...';
var parentAuthor = 'epexa';
var parentPermlink = 'test-url';
var author = 'epexa';
var permlink = 're-' + parentAuthor + '-' + parentPermlink + '-' + Date.now(); // re-epexa-test-url-1517333064308
var title = '';
var body = 'hi!';
var curation_percent = 5000;//50%
var jsonMetadata = '{}';
viz.broadcast.content(wif, parentAuthor, parentPermlink, author, permlink, title, body, curation_percent, jsonMetadata, extensions, function(err, result) {
  //console.log(err, result);
  if (!err) {
    console.log('content', result);
  }
  else console.error(err);
});
```

### Content Reward
```
viz.broadcast.contentReward(wif, author, permlink, Payout, vestingPayout, function(err, result) {
  console.log(err, result);
});
```

### Delete Content
```
// deprecated
viz.broadcast.deleteContent(wif, author, permlink, function(err, result) {
  console.log(err, result);
});
```

### Vote
```
// deprecated
viz.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
  console.log(err, result);
});
```