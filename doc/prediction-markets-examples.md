# Prediction Markets — end-to-end example (viz-js-lib)

> Onix / HF14. A single market walked **from creation to payout**: oracle →
> market → bet → resolve → read positions. Copy-paste runnable (swap in your node
> and keys). For the full per-operation reference (all 23 builders, read methods,
> commit-reveal) see the **Prediction Markets** sections of [`doc/README.md`](./README.md).

Conventions:
- **object ids** (`market_id`, `bet_id`, `liquidity_id`, `position_id`, `commit_id`)
  are the bare numeric instance of the on-chain object.
- **percent** fields are basis points (`10000 = 100%`) unless a builder note says otherwise.
- **assets** are VIZ strings (`"10.000 VIZ"`); `min_tokens` / `share_type` are raw
  milli-VIZ integers (VIZ×1000).
- every op's last argument is `extensions` — pass `[]`.
- signer authority is **active** for all ops **except** `pmDisputeVote` (signed with
  the **regular** key).

## Scenario

A binary (CPMM) market "Will X happen by 2026?", the creator is its own oracle
(self-oracle), seeded with 100 VIZ liquidity. One account bets 10 VIZ on "Yes";
after betting closes the oracle resolves the outcome and the bettor's payout is settled.

Lifecycle: `pending` → (oracle accepts) `active` → (betting expires) `resolving` →
(oracle resolves) `resolved` → payouts.

```js
var viz = require('viz-js-lib'); // or the webpack build via <script>
viz.config.set('websocket', 'wss://node.viz.world/ws'); // your node

var oracle    = 'alice';
var oracleWif = '5K...';      // active key of the oracle/creator
var bettor    = 'bob';
var bettorWif = '5J...';      // active key of the bettor

// 1. Register the oracle (insurance deposit + default accept policy).
//    auto_accept=true -> the oracle auto-accepts its own markets.
viz.broadcast.pmOracleRegister(oracleWif, oracle,
  '50.000 VIZ' /*insurance*/, 300 /*fee_percent bp*/, '0.000 VIZ' /*fixed_fee*/,
  'https://rules.example/oracle' /*rules_url*/,
  true /*auto_accept_creator*/, true /*auto_accept_resolver*/, true /*auto_accept*/,
  [], function(err, res){ console.log('oracle_register', err, res); });

// 2. Create a binary market, seeded with 100 VIZ. market_type: 0 binary (CPMM), 1 multi (LMSR).
viz.broadcast.pmCreateMarket(oracleWif, oracle /*creator*/, oracle /*oracle*/,
  0 /*market_type binary*/, ['Yes','No'] /*outcomes*/,
  'Will X happen by 2026?' /*url/question*/,
  300 /*oracle_fee_percent bp*/, '0.000 VIZ' /*oracle_fixed_fee*/,
  100 /*creator_fee_percent bp*/, 200 /*liquidity_fee_percent bp*/,
  '100.000 VIZ' /*liquidity seed*/, 0 /*lmsr_b, 0 for binary*/,
  '2026-08-01T00:00:00' /*betting_expiration*/,
  '2026-08-02T00:00:00' /*result_expiration*/,
  0 /*time_penalty_type*/, 0 /*time_penalty_value*/, 0 /*penalty_curve_type*/,
  false /*allow_early_resolution*/, false /*allow_cancellation*/,
  false /*allow_batch*/, true /*allow_instant_bet*/, 1 /*endogeneity_tier*/,
  0 /*dispute_mode*/, '' /*dispute_resolver*/, 0 /*dispute_penalty_percent*/,
  '' /*metadata (free-form, custom-like)*/,
  [], function(err, res){ console.log('create_market', err, res); });

// If auto_accept is off, the oracle accepts manually (market_id comes from the vop / a read):
// viz.broadcast.pmOracleAcceptMarket(oracleWif, oracle, 5, true, 300, '0.000 VIZ', [], cb);

// 3. Bet. binary: side 0/1, outcome_index -1 (outcome_index is only used by multi).
//    mode: 0 instant, 1 batch. min_tokens = minimum shares (milli-VIZ), slippage guard.
viz.broadcast.pmPlaceBet(bettorWif, bettor, 5 /*market_id*/, 0 /*side Yes*/,
  -1 /*outcome_index*/, '10.000 VIZ' /*amount*/, 0 /*min_tokens*/, 0 /*instant*/,
  [], function(err, res){ console.log('place_bet', err, res); });

// 4. Resolve (after betting_expiration). winning_outcome: outcome index (0 = Yes).
viz.broadcast.pmResolveMarket(oracleWif, oracle, 5 /*market_id*/,
  0 /*winning_outcome*/, 'https://proof.example' /*decision_url*/,
  'X happened' /*decision_reason*/,
  [], function(err, res){ console.log('resolve', err, res); });

// 5. Read the result (prediction_market_api plugin).
viz.api.getMarketFull(5, bettor, function(err, market){
  console.log('market_full', err, market); // status, outcome, bettor position
});
viz.api.getAccountPositions(bettor, 5, 0, 100, function(err, positions){
  console.log('positions', err, positions);
});
```

Read methods (market / lists / chart series):

```js
viz.api.getMarket(5, cb);
viz.api.listMarkets(1 /*status active*/, 0 /*from*/, 100 /*limit*/, cb);
viz.api.getPmChainProperties(cb);           // live median governance params
viz.api.getMarketKline(5, 0, 1000, cb);     // chart series (offset from newest)
```

## Beyond the happy path

- **commit–reveal** betting (`pmCommitBet` → `pmRevealBet`) — byte-exact commitment
  via `viz.formatter.predictionMarketCommitment`; a wrong preimage forfeits the escrow.
- **liquidity**: `pmAddLiquidity` / `pmWithdrawLiquidity`, lazy pool (`pmLazyDeposit` /
  `pmLazyWithdraw`).
- **disputes**: `pmDisputeCreate` → `pmDisputeVote` (**regular** key!) / `pmDisputeResolve`,
  oracle rebuttal `pmDisputeOracleRespond`, `pmUnban`.
- **leverage** (gated by `pm_leverage_enabled`): `pmLeverageOpen/Close/Convert`.
- **multi-outcome (LMSR)** market: `market_type=1`, `outcomes=['A','B','C']`,
  `outcome_index` 0..N-1, `lmsr_b>0`, `side=-1`.

See [`doc/README.md`](./README.md) for the full signatures of each of these.
