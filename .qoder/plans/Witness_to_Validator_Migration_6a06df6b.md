# Witness → Validator Migration

## Key Design Decisions
- Integer type IDs (6, 7, 8, 30, 42) NEVER change
- Binary wire format is unaffected (field order, not names)
- Library outputs new names by default, accepts old names as aliases
- Broadcast methods: generate BOTH `validatorUpdate()` and `witnessUpdate()` aliases
- API methods: register BOTH old and new names

## Task 1: Add operation name alias map — `src/auth/serializer/src/types.js`

Modify `static_variant` to support alias lookup:

```js
// Add alias map at top of static_variant function
const WITNESS_ALIAS_MAP = {
    'witness_update': 'validator_update',
    'account_witness_vote': 'account_validator_vote',
    'account_witness_proxy': 'account_validator_proxy',
    'shutdown_witness': 'shutdown_validator',
    'witness_reward': 'validator_reward',
};
```

In `opTypeId(value)`: after the existing loop fails to find a match, check `WITNESS_ALIAS_MAP[value]` and iterate again with the mapped name.

## Task 2: Rename operations in serializer — `src/auth/serializer/src/operations.js`

### Operation Serializer renames (5 items):
- `let witness_update` → `let validator_update` + `Serializer("validator_update", ...)`
- `let account_witness_vote` → `let account_validator_vote` + `Serializer("account_validator_vote", ...)`
- `let account_witness_proxy` → `let account_validator_proxy` + `Serializer("account_validator_proxy", ...)`
- `let shutdown_witness` → `let shutdown_validator` + `Serializer("shutdown_validator", ...)`
- `let witness_reward` → `let validator_reward` + `Serializer("validator_reward", ...)`

### Field renames inside operations:
- `account_validator_vote`: field `witness` → `validator`
- `validator_reward`: field `witness` → `validator`

### Block header field renames (with backward compat note):
- `signed_block`: `witness` → `validator`, `witness_signature` → `validator_signature`
- `block_header`: `witness` → `validator`
- `signed_block_header`: `witness` → `validator`, `witness_signature` → `validator_signature`

### Chain properties field renames (in chain_properties_hf4, hf6, hf9, hf13):
- `inflation_witness_percent` → `inflation_validator_percent`
- `witness_miss_penalty_percent` → `validator_miss_penalty_percent`
- `witness_miss_penalty_duration` → `validator_miss_penalty_duration`
- `witness_declaration_fee` → `validator_declaration_fee`

### Update `operation.st_operations` array:
Replace old variable references with new ones.

### Add `module.exports` aliases:
Export old names as aliases pointing to new Serializers (e.g., `module.exports.witness_update = validator_update`).

## Task 3: Update ChainTypes — `src/auth/serializer/src/ChainTypes.js`

Rename operation entries + add alias entries:
```js
validator_update: 6,
account_validator_vote: 7,
account_validator_proxy: 8,
shutdown_validator: 30,
validator_reward: 42,
// Aliases for backward compatibility
witness_update: 6,
account_witness_vote: 7,
account_witness_proxy: 8,
shutdown_witness: 30,
witness_reward: 42,
```

## Task 4: Rename broadcast operations — `src/broadcast/operations.js`

### Rename operation entries:
- `"operation": "witness_update"` → `"operation": "validator_update"`
- `"operation": "account_witness_vote"` → `"operation": "account_validator_vote"`, param `"witness"` → `"validator"`
- `"operation": "account_witness_proxy"` → `"operation": "account_validator_proxy"`

### Add duplicate entries with old names:
Keep old operation entries as well so both `viz.broadcast.witnessUpdate()` and `viz.broadcast.validatorUpdate()` are generated.

## Task 5: Add new API methods — `src/api/methods.js`

### Rename all witness_api references:
- `"api": "witness_api"` → `"api": "validator_api"`

### Rename method entries (keep old ones too):
Add new entries with validator names alongside existing witness ones:
- `get_active_validators` + keep `get_active_witnesses`
- `get_validator_schedule` + keep `get_witness_schedule`
- `get_validators` + keep `get_witnesses`
- `get_validator_by_account` + keep `get_witness_by_account`
- `get_validators_by_vote` + keep `get_witnesses_by_vote`
- `get_validators_by_counted_vote` + keep `get_witnesses_by_counted_vote`
- `get_validator_count` + keep `get_witness_count`
- `lookup_validator_accounts` + keep `lookup_witness_accounts`

## Task 6: Serializer `fromObject` field alias support — `src/auth/serializer/src/serializer.js`

Add a static field alias map for renamed fields:
```js
Serializer.field_aliases = {
    validator: 'witness',           // for account_validator_vote
    validator_signature: 'witness_signature',  // for block headers
    inflation_validator_percent: 'inflation_witness_percent',
    validator_miss_penalty_percent: 'witness_miss_penalty_percent',
    validator_miss_penalty_duration: 'witness_miss_penalty_duration',
    validator_declaration_fee: 'witness_declaration_fee',
};
```

In `fromObject()`: when `serialized_object[field]` is undefined, check if there's an alias for the field and try the old name. This allows old-node responses to deserialize correctly.

Same fallback in `appendByteBuffer()` for the case where the input object uses old field names.

## Task 7: Update test references — `test/methods_by_version.js`

Add new validator method names alongside old witness ones:
- `"get_active_validators"`, `"get_validator_by_account"`, etc.
- Keep old names in the list too

## Task 8: Verify

- Run ESLint on all modified files
- Run `npm run build-node` to verify compilation
- Review the generated broadcast method names work for both old and new

## Files Modified (summary)

| File | Changes |
|------|---------|
| `src/auth/serializer/src/types.js` | Alias map in `static_variant` |
| `src/auth/serializer/src/operations.js` | Rename 5 serializers + fields + chain props + block headers |
| `src/auth/serializer/src/ChainTypes.js` | Rename + alias entries |
| `src/auth/serializer/src/serializer.js` | Field alias support in `fromObject`/`appendByteBuffer` |
| `src/broadcast/operations.js` | Rename + duplicate old entries |
| `src/api/methods.js` | Add validator API methods + keep witness ones |
| `test/methods_by_version.js` | Add validator method names |
