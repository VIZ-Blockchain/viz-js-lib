# Witness → Validator Migration

VIZ blockchain has renamed "witness" terminology to "validator" across the entire protocol stack. This document describes what changed in `viz-js-lib` and how to work with both old and new names during the transition.

---

## Key Principles

1. **Integer type IDs never change.** Binary wire format is positional — field names are never written to the wire. Submitting transactions by integer ID is always safe.
2. **`witness_api` namespace is gone.** All RPC calls must use `"validator_api"`. `witness_api` returns an error on upgraded nodes. Old method names (e.g. `get_active_witnesses`) remain as deprecated aliases *within* `validator_api` for one release cycle.
3. **Node accepts both old and new field names in incoming transactions.** Responses use new names only.

---

## Changes Made in viz-js-lib

### [`src/auth/serializer/src/operations.js`](../../src/auth/serializer/src/operations.js)

Five operations renamed. Old names re-exported as backward-compat aliases.

| Type ID | Old name | New name | Field changes |
|---|---|---|---|
| 6 | `witness_update` | `validator_update` | none |
| 7 | `account_witness_vote` | `account_validator_vote` | `witness` → `validator` |
| 8 | `account_witness_proxy` | `account_validator_proxy` | none |
| 30 | `shutdown_witness` | `shutdown_validator` | none |
| 42 | `witness_reward` | `validator_reward` | `witness` → `validator` |

Block header schema fields renamed (binary unaffected — positional):
- `witness` → `validator`, `witness_signature` → `validator_signature`

Chain properties fields renamed across all hardfork variants:

| Old field | New field | First appeared in |
|---|---|---|
| `inflation_witness_percent` | `inflation_validator_percent` | `chain_properties_hf4` |
| `witness_miss_penalty_percent` | `validator_miss_penalty_percent` | `chain_properties_hf6` |
| `witness_miss_penalty_duration` | `validator_miss_penalty_duration` | `chain_properties_hf6` |
| `witness_declaration_fee` | `validator_declaration_fee` | `chain_properties_hf9` |

All fields appear in every later variant (`hf9` carries hf4+hf6 fields; `hf13` carries hf9 fields). Old names re-exported:

```js
module.exports.witness_update        = validator_update;
module.exports.account_witness_vote  = account_validator_vote;
module.exports.account_witness_proxy = account_validator_proxy;
module.exports.shutdown_witness      = shutdown_validator;
module.exports.witness_reward        = validator_reward;
```

### [`src/auth/serializer/src/types.js`](../../src/auth/serializer/src/types.js)

`static_variant.opTypeId()` accepts old operation names as aliases — `'witness_update'` still resolves to type ID 6.

### [`src/auth/serializer/src/ChainTypes.js`](../../src/auth/serializer/src/ChainTypes.js)

Both new and old names present in `ChainTypes.operations`, pointing to the same integer IDs:

```js
validator_update: 6,   account_validator_vote: 7,   account_validator_proxy: 8,
shutdown_validator: 30, validator_reward: 42,
// backward-compat aliases:
witness_update: 6,     account_witness_vote: 7,     account_witness_proxy: 8,
shutdown_witness: 30,  witness_reward: 42,
```

### [`src/auth/serializer/src/serializer.js`](../../src/auth/serializer/src/serializer.js)

`Serializer.field_aliases` (new name → old name) added. `fromObject()` and `appendByteBuffer()` fall back to the old name when the new field is absent — old-format inputs are accepted transparently:

```js
Serializer.field_aliases = {
    'validator':                      'witness',
    'validator_signature':            'witness_signature',
    'inflation_validator_percent':    'inflation_witness_percent',
    'validator_miss_penalty_percent': 'witness_miss_penalty_percent',
    'validator_miss_penalty_duration':'witness_miss_penalty_duration',
    'validator_declaration_fee':      'witness_declaration_fee',
};
```

### [`src/broadcast/operations.js`](../../src/broadcast/operations.js)

New validator entries added alongside old witness entries. Both old and new JS method names are generated:

| Old JS method | New JS method | Note |
|---|---|---|
| `viz.broadcast.witnessUpdate()` | `viz.broadcast.validatorUpdate()` | same params |
| `viz.broadcast.accountWitnessVote(…, witness, …)` | `viz.broadcast.accountValidatorVote(…, validator, …)` | param renamed |
| `viz.broadcast.accountWitnessProxy()` | `viz.broadcast.accountValidatorProxy()` | same params |

The old `accountWitnessVote` passes `witness` as the field name; `Serializer.field_aliases` maps it to `validator` transparently at serialization time.

### [`src/api/methods.js`](../../src/api/methods.js)

All entries use `"validator_api"`. Each renamed method has two entries — the new primary name and the old deprecated-alias name, both calling `validator_api`:

| New JS method | Old JS method (deprecated alias) |
|---|---|
| `viz.api.getActiveValidators()` | `viz.api.getActiveWitnesses()` |
| `viz.api.getValidatorSchedule()` | `viz.api.getWitnessSchedule()` |
| `viz.api.getValidators()` | `viz.api.getWitnesses()` |
| `viz.api.getValidatorByAccount()` | `viz.api.getWitnessByAccount()` |
| `viz.api.getValidatorsByVote()` | `viz.api.getWitnessesByVote()` |
| `viz.api.getValidatorsByCountedVote()` | `viz.api.getWitnessesByCountedVote()` |
| `viz.api.getValidatorCount()` | `viz.api.getWitnessCount()` |
| `viz.api.lookupValidatorAccounts()` | `viz.api.lookupWitnessAccounts()` |

`viz.api.getMinerQueue()` — name unchanged, moved to `validator_api`.

### [`test/methods_by_version.js`](../../test/methods_by_version.js)

New validator method names added alongside old witness names in the `methods_test` array.

---

## Usage Guide

### Sending Transactions

```js
// Safest: use integer type ID — never breaks
const op = [6, { owner: 'alice', url: 'https://alice.example.com', block_signing_key: 'VIZ5hq...' }];

// New string name:
const op = ['validator_update', { owner: 'alice', url: '...', block_signing_key: '...' }];

// Old string name (resolved via alias):
const op = ['witness_update', { owner: 'alice', url: '...', block_signing_key: '...' }];
```

### Voting for a Validator

```js
// New:
viz.broadcast.accountValidatorVote(privateKey, account, validatorAccount, approve, cb);

// Old (field alias handled transparently by serializer):
viz.broadcast.accountWitnessVote(privateKey, account, witnessAccount, approve, cb);
```

### Reading Validator Info

```js
// New (preferred):
viz.api.getValidatorByAccount('alice', (err, result) => { ... });

// Old (deprecated alias within validator_api — works for one release cycle):
viz.api.getWitnessByAccount('alice', (err, result) => { ... });
```

### Chain Properties

```js
// New field names:
const props = {
    inflation_validator_percent:     1500,
    validator_miss_penalty_percent:  100,
    validator_miss_penalty_duration: 86400,
    validator_declaration_fee:       '10.000 VIZ',
};

// Old field names (still accepted via Serializer.field_aliases):
const props = {
    inflation_witness_percent:     1500,
    witness_miss_penalty_percent:  100,
    witness_miss_penalty_duration: 86400,
    witness_declaration_fee:       '10.000 VIZ',
};
```

### Handling Renamed Fields in Node Responses (caller code)

The library relays these fields as-is from the node. After node upgrade, responses use new names. Use safe accessors:

```js
// validator_schedule_object
const validators = schedule.current_shuffled_validators ?? schedule.current_shuffled_witnesses;

// dynamic_global_properties
const currentValidator = dgp.current_validator ?? dgp.current_witness;

// account object (from get_accounts)
const votedFor = account.validators_voted_for ?? account.witnesses_voted_for;
const votes    = account.validator_votes       ?? account.witness_votes;
const weight   = account.validators_vote_weight ?? account.witnesses_vote_weight;

// block header — node now returns validator / validator_signature
// update any code that accessed .witness or .witness_signature on block objects
const producer  = block.validator;          // was block.witness
const blockSig  = block.validator_signature; // was block.witness_signature
```

---

## Complete Rename Reference

### API namespace

`witness_api` → `validator_api` (old namespace returns error on upgraded nodes).

### API Methods

| Old name | New name |
|---|---|
| `get_active_witnesses` | `get_active_validators` |
| `get_witness_schedule` | `get_validator_schedule` |
| `get_witnesses` | `get_validators` |
| `get_witness_by_account` | `get_validator_by_account` |
| `get_witnesses_by_vote` | `get_validators_by_vote` |
| `get_witnesses_by_counted_vote` | `get_validators_by_counted_vote` |
| `get_witness_count` | `get_validator_count` |
| `lookup_witness_accounts` | `lookup_validator_accounts` |
| `get_miner_queue` | `get_miner_queue` *(name unchanged, namespace changed)* |

### Block Header Fields

| Old | New |
|---|---|
| `witness` | `validator` |
| `witness_signature` | `validator_signature` |

### Dynamic Global Properties

| Old | New |
|---|---|
| `current_witness` | `current_validator` |

### Account Object (`get_accounts` response)

| Old | New |
|---|---|
| `witnesses_voted_for` | `validators_voted_for` |
| `witnesses_vote_weight` | `validators_vote_weight` |
| `witness_votes` | `validator_votes` |

### `validator_schedule_object` Fields

| Old | New |
|---|---|
| `current_shuffled_witnesses` | `current_shuffled_validators` |
| `num_scheduled_witnesses` | `num_scheduled_validators` |

### Chain Properties Fields

| Old | New | In structs |
|---|---|---|
| `inflation_witness_percent` | `inflation_validator_percent` | hf4, hf6, hf9, hf13 |
| `witness_miss_penalty_percent` | `validator_miss_penalty_percent` | hf6, hf9, hf13 |
| `witness_miss_penalty_duration` | `validator_miss_penalty_duration` | hf6, hf9, hf13 |
| `witness_declaration_fee` | `validator_declaration_fee` | hf9, hf13 |

### `get_config` Response Keys

| Old | New |
|---|---|
| `CHAIN_HARDFORK_REQUIRED_WITNESSES` | `CHAIN_HARDFORK_REQUIRED_VALIDATORS` |
| `CHAIN_MAX_ACCOUNT_WITNESS_VOTES` | `CHAIN_MAX_ACCOUNT_VALIDATOR_VOTES` |
| `CHAIN_MAX_WITNESSES` | `CHAIN_MAX_VALIDATORS` |
| `CHAIN_MAX_SUPPORT_WITNESSES` | `CHAIN_MAX_SUPPORT_VALIDATORS` |
| `CHAIN_MAX_TOP_WITNESSES` | `CHAIN_MAX_TOP_VALIDATORS` |
| `CHAIN_MAX_WITNESS_URL_LENGTH` | `CHAIN_MAX_VALIDATOR_URL_LENGTH` |

---

## What NEVER Changes

| Item | Reason |
|---|---|
| Integer type IDs (6, 7, 8, 30, 42) | Binary wire format uses integer indices |
| Binary serialization order | Field names not written to binary; only positional values |
| `block_signing_key`, `url`, `approve`, `proxy` | Describe data, not the role |
| Signing authority level (`active`) | Unchanged |
| Null key `VIZ1111111111111111111111111111111114T1Anm` | Same null key format |

---

## Migration Phases

**Phase A — current (node upgraded):**
- Use `validator_api` for all RPC calls — `witness_api` returns error
- Use new operation and field names in new code
- Old operation string names resolved via alias maps (library handles transparently)
- Old field names in fromObject/appendByteBuffer accepted via `Serializer.field_aliases`
- Old method names work as deprecated aliases within `validator_api`

**Phase B — cleanup (after deprecated aliases removed from node):**
- Remove old-name method entries from `methods.js`
- Remove `module.exports.witness_*` alias exports from `operations.js`
- Remove `WITNESS_ALIAS_MAP` from `types.js`
- Remove old names from `ChainTypes.js`
- Remove `Serializer.field_aliases`
