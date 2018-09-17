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
    - [Committee](#committee)
- [Follow API](#follow-api)
- [Broadcast API](#broadcast-api)
- [Broadcast](#broadcast)
- [Auth](#auth)
- [Formatter](#formatter)

# Install
```
$ npm install git+https://github.com/VIZ-World/viz-js --save
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
Default config should work with viz. however you can change it to work with viz
as
```js
viz.config.set('websocket','wss://testnet.viz.world'); // assuming websocket is work at testnet.viz.world
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

## Witnesses


### Get Witnesses
```
viz.api.getWitnesses(witnessIds, function(err, result) {
  console.log(err, result);
});
```
### Get Witness By Account
```
viz.api.getWitnessByAccount(accountName, function(err, result) {
  console.log(err, result);
});
```
### Get Witnesses By Vote
```
viz.api.getWitnessesByVote(from, limit, function(err, result) {
  console.log(err, result);
});
```
### Lookup Witness Accounts
```
viz.api.lookupWitnessAccounts(lowerBoundName, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Witness Count
```
viz.api.getWitnessCount(function(err, result) {
  console.log(err, result);
});
```
### Get Active Witnesses
```
viz.api.getActiveWitnesses(function(err, result) {
  console.log(err, result);
});
```
### Get Miner Queue
```
viz.api.getMinerQueue(function(err, result) {
  console.log(err, result);
});
```

## Committee

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

### Account Create
```
viz.broadcast.accountCreate(wif, fee, creator, newAccountName, owner, active, posting, memoKey, jsonMetadata, referer, function(err, result) {
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
 * @param {Object} owner - object containing a new owner key
 * @param {Object} active - object containing a active key
 * @param {Object} posting - object containing a posting key
 * @param {String} memoKey - new memo key
 * @param {String} jsonMetadata - additional data for a new account (avatar, location, etc.)
 * @param {String} referer - name of a referer user, can be empty
*/
var wif = '5K...';
var fee = '10.000 VIZ';
var delegation = '0.000000 SHARES';
var creator = 'viz';
var newAccountName = name;
var owner = {
  weight_threshold: 1,
  account_auths: [],
  key_auths: [[newKeys.owner, 1]]
};
var active = {
  weight_threshold: 1,
  account_auths: [],
  key_auths: [[newKeys.active, 1]]
};
var posting = {
  weight_threshold: 1,
  account_auths: [],
  key_auths: [[newKeys.posting, 1]]
};
var memoKey = newKeys.memo;
var jsonMetadata = '{}';
var referer = '';
var extensions = [];
viz.broadcast.accountCreate(wif, fee, delegation, creator, newAccountName, owner, active, posting, memoKey, jsonMetadata, referer, extensions, function(err, result) {
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
viz.broadcast.accountUpdate(wif, account, owner, active, posting, memoKey, jsonMetadata, function(err, result) {
  console.log(err, result);
});
```
### Account Witness Proxy
```
viz.broadcast.accountWitnessProxy(wif, account, proxy, function(err, result) {
  console.log(err, result);
});
```
### Account Witness Vote
```
viz.broadcast.accountWitnessVote(wif, account, witness, approve, function(err, result) {
  console.log(err, result);
});
```
### Change Recovery Account
```
viz.broadcast.changeRecoveryAccount(wif, accountToRecover, newRecoveryAccount, extensions, function(err, result) {
  console.log(err, result);
});
```
### Content
```
viz.broadcast.content(wif, parentAuthor, parentPermlink, author, permlink, title, body, curation_percent, jsonMetadata, extensions, function(err, result) {
  console.log(err, result);
});
```
#### Example add a post:
```js
/**
 * content() add a post
 * @param {Base58} wif - private posting key
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
 * @param {Base58} wif - private posting key
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

### Custom
```
viz.broadcast.custom(wif, requiredAuths, requiredPostingAuths, id, json, function(err, result) {
  console.log(err, result);
});
```
### Delete Content
```
viz.broadcast.deleteContent(wif, author, permlink, function(err, result) {
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
viz.broadcast.escrowTransfer(wif, from, to, agent, escrowId, Amount, fee, ratificationDeadline, escrowExpiration, jsonMeta, function(err, result) {
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
viz.broadcast.recoverAccount(wif, accountToRecover, newOwnerAuthority, recentOwnerAuthority, extensions, function(err, result) {
  console.log(err, result);
});
```
### Request Account Recovery
```
viz.broadcast.requestAccountRecovery(wif, recoveryAccount, accountToRecover, newOwnerAuthority, extensions, function(err, result) {
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
 * @param {Base58} wif - private owner key
 * @param {String} from - username who send, whose owner key
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
### Vote
```
viz.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
  console.log(err, result);
});
```
### Withdraw Vesting
```
viz.broadcast.withdrawVesting(wif, account, vestingShares, function(err, result) {
  console.log(err, result);
});
```
### Witness Update
```
viz.broadcast.witnessUpdate(wif, owner, url, blockSigningKey, function(err, result) {
  console.log(err, result);
});
```
### Witness Chain Properties Update
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
  flag_energy_additional_cost:0
};
viz.broadcast.chainProperiesUpdate(wif, owner, chain_properties, function(err, result) {
  console.log(err, result);
});
```
### Fill Vesting Withdraw
```
viz.broadcast.fillVestingWithdraw(wif, fromAccount, toAccount, withdrawn, deposited, function(err, result) {
  console.log(err, result);
});
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
// object in which the key type public key (active, memo, owner, posting), and the value of the array in the array itself is the public key
var auths = {
  posting: [['VIZ...']]
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
var newKeys = viz.auth.generateKeys(name, password, ['owner', 'active', 'posting', 'memo']);
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
var roles = ['owner', 'active', 'posting', 'memo']; // optional parameter, if not specify, then all keys will return
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
var role = 'posting'; // private key type, one of owner, active, posting, memo
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
viz.auth.signTransaction(trx, keys);
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
