
// This file is merge updated from js_operation_serializer program.
/*

./js_operation_serializer |
sed 's/void/future_extensions/g'|
sed 's/steemit_protocol:://g'|
sed 's/14static_variantIJNS_12fixed_stringINSt3__14pairIyyEEEEEEE/string/g'|
sed 's/steemit_future_extensions/future_extensions/g'|
sed 's/steemit_protocol_//g' > tmp.coffee

*/
// coffee tmp.coffee # fix errors until you see: `ChainTypes is not defined`

// npm i -g decaffeinate
// decaffeinate tmp.coffee

// Merge tmp.js - See "Generated code follows" below

import types from "./types"
import SerializerImpl from "./serializer"

const {
    int16,
    uint8,
    uint16,
    uint32,
    uint64,
    string,
    string_binary,
    bytes,
    bool,
    array,
    static_variant,
    map,
    set,
    public_key,
    time_point_sec,
    optional,
    asset,
    asset_16
} = types

const future_extensions = types.void
const hardfork_version_vote = types.void
const version = types.void

// Place-holder, their are dependencies on "operation" .. The final list of
// operations is not avialble until the very end of the generated code.
// See: operation.st_operations = ...
const operation = static_variant();
module.exports.operation = operation;

// For module.exports
const Serializer = function(operation_name, serilization_types_object) {
    const s = new SerializerImpl(operation_name, serilization_types_object);
    return module.exports[operation_name] = s;
}

const beneficiaries = new Serializer(
    "beneficiaries", {
        account: string,
        weight: uint16
    }
);

const content_payout_beneficiaries = new Serializer(
    0, {
        beneficiaries: set(beneficiaries)
    }
);

const transaction = new Serializer(
    "transaction", {
        ref_block_num: uint16,
        ref_block_prefix: uint32,
        expiration: time_point_sec,
        operations: array(operation),
        extensions: set(future_extensions)
    }
);

const encrypted_memo = new Serializer(
    "encrypted_memo", {
        from: public_key,
        to: public_key,
        nonce: uint64,
        check: uint32,
        encrypted: string_binary
    }
);
// Custom-types after Generated code

// ##  Generated code follows
// -------------------------------
/*
When updating generated code (fix closing notation)
Replace:  var operation = static_variant([
with:     operation.st_operations = [

Delete (these are custom types instead):
let public_key = new Serializer(
    "public_key",
    {key_data: bytes(33)}
);

let asset = new Serializer(
    "asset",
    {amount: int64,
    symbol: uint64}
);

Replace: authority.prototype.account_authority_map
With: map((string), (uint16))
*/
let signed_transaction = new Serializer(
    "signed_transaction", {
        ref_block_num: uint16,
        ref_block_prefix: uint32,
        expiration: time_point_sec,
        operations: array(operation),
        extensions: set(future_extensions),
        signatures: array(bytes(65))
    }
);

let signed_block = new Serializer(
    "signed_block", {
        previous: bytes(20),
        timestamp: time_point_sec,
        witness: string,
        transaction_merkle_root: bytes(20),
        extensions: set(static_variant([
            future_extensions,
            version,
            hardfork_version_vote
        ])),
        witness_signature: bytes(65),
        transactions: array(signed_transaction)
    }
);

let block_header = new Serializer(
    "block_header", {
        previous: bytes(20),
        timestamp: time_point_sec,
        witness: string,
        transaction_merkle_root: bytes(20),
        extensions: set(static_variant([
            future_extensions,
            version,
            hardfork_version_vote
        ]))
    }
);

let signed_block_header = new Serializer(
    "signed_block_header", {
        previous: bytes(20),
        timestamp: time_point_sec,
        witness: string,
        transaction_merkle_root: bytes(20),
        extensions: set(static_variant([
            future_extensions,
            version,
            hardfork_version_vote
        ])),
        witness_signature: bytes(65)
    }
);

let vote = new Serializer(
    "vote", {
        voter: string,
        author: string,
        permlink: string,
        weight: int16
    }
);

let content = new Serializer(
    "content", {
        parent_author: string,
        parent_permlink: string,
        author: string,
        permlink: string,
        title: string,
        body: string,
        curation_percent: int16,
        json_metadata: string,
        extensions: set(static_variant([
            content_payout_beneficiaries
        ]))
    }
);

let transfer = new Serializer(
    "transfer", {
        from: string,
        to: string,
        amount: asset,
        memo: string
    }
);

let transfer_to_vesting = new Serializer(
    "transfer_to_vesting", {
        from: string,
        to: string,
        amount: asset
    }
);

let withdraw_vesting = new Serializer(
    "withdraw_vesting", {
        account: string,
        vesting_shares: asset
    }
);

let authority = new Serializer(
    "authority", {
        weight_threshold: uint32,
        account_auths: map((string), (uint16)),
        key_auths: map((public_key), (uint16))
    }
);

let account_update = new Serializer(
    "account_update", {
        account: string,
        owner: optional(authority),
        active: optional(authority),
        posting: optional(authority),
        memo_key: public_key,
        json_metadata: string
    }
);

let chain_properties = new Serializer(
    "chain_properties", {
        account_creation_fee: asset,
        maximum_block_size: uint32,
        create_account_delegation_ratio: uint32,
        create_account_delegation_time: uint32,
        min_delegation: asset,
        min_curation_percent: int16,
        max_curation_percent: int16,
        bandwidth_reserve_percent: int16,
        bandwidth_reserve_below: asset,
    }
);

let witness_update = new Serializer(
    "witness_update", {
        owner: string,
        url: string,
        block_signing_key: public_key
    }
);

let chain_properties_update = new Serializer(
    "chain_properties_update", {
    	owner: string,
        props: chain_properties
    }
);

let account_witness_vote = new Serializer(
    "account_witness_vote", {
        account: string,
        witness: string,
        approve: bool
    }
);

let account_witness_proxy = new Serializer(
    "account_witness_proxy", {
        account: string,
        proxy: string
    }
);

let delete_content = new Serializer(
    "delete_content", {
        author: string,
        permlink: string
    }
);

let custom = new Serializer(
    "custom", {
        required_auths: set(string),
        required_posting_auths: set(string),
        id: string,
        json: string
    }
);

let set_withdraw_vesting_route = new Serializer(
    "set_withdraw_vesting_route", {
        from_account: string,
        to_account: string,
        percent: uint16,
        auto_vest: bool
    }
);

let request_account_recovery = new Serializer(
    "request_account_recovery", {
        recovery_account: string,
        account_to_recover: string,
        new_owner_authority: authority,
        extensions: set(future_extensions)
    }
);

let recover_account = new Serializer(
    "recover_account", {
        account_to_recover: string,
        new_owner_authority: authority,
        recent_owner_authority: authority,
        extensions: set(future_extensions)
    }
);

let change_recovery_account = new Serializer(
    "change_recovery_account", {
        account_to_recover: string,
        new_recovery_account: string,
        extensions: set(future_extensions)
    }
);

let escrow_transfer = new Serializer(
    "escrow_transfer", {
        from: string,
        to: string,
        amount: asset,
        escrow_id: uint32,
        agent: string,
        fee: asset,
        json_meta: string,
        ratification_deadline: time_point_sec,
        escrow_expiration: time_point_sec
    }
);

let escrow_dispute = new Serializer(
    "escrow_dispute", {
        from: string,
        to: string,
        agent: string,
        who: string,
        escrow_id: uint32
    }
);

let escrow_release = new Serializer(
    "escrow_release", {
        from: string,
        to: string,
        agent: string,
        who: string,
        receiver: string,
        escrow_id: uint32,
        amount: asset
    }
);

let escrow_approve = new Serializer(
    "escrow_approve", {
        from: string,
        to: string,
        agent: string,
        who: string,
        escrow_id: uint32,
        approve: bool
    }
);

let delegate_vesting_shares = new Serializer(
    "delegate_vesting_shares", {
        delegator: string,
        delegatee: string,
        vesting_shares: asset
  }
);

let account_create = new Serializer(
    "account_create", {
        fee: asset,
        delegation: asset,
        creator: string,
        new_account_name: string,
        owner: authority,
        active: authority,
        posting: authority,
        memo_key: public_key,
        json_metadata: string,
        referrer: string,
        extensions: set(future_extensions)
  }
);

let account_metadata = new Serializer(
    "account_metadata", {
        account: string,
        json_metadata: string
  }
);

let operation_wrapper = new Serializer(
    "operation_wrapper", {
        op: operation
  }
);

let proposal_create = new Serializer(
    "proposal_create", {
        author: string,
        title: string,
        memo: string,
        expiration_time: time_point_sec,
        proposed_operations: array(operation_wrapper),
        review_period_time: optional(time_point_sec),
        extensions: set(future_extensions)
  }
);

let proposal_update = new Serializer(
    "proposal_update", {
        author: string,
        title: string,
        active_approvals_to_add: set(string),
        active_approvals_to_remove: set(string),
        owner_approvals_to_add: set(string),
        owner_approvals_to_remove: set(string),
        posting_approvals_to_add: set(string),
        posting_approvals_to_remove: set(string),
        key_approvals_to_add: set(public_key),
        key_approvals_to_remove: set(public_key),
        extensions: set(future_extensions)
  }
);

let proposal_delete = new Serializer(
    "proposal_delete", {
        author: string,
        title: string,
        requester: string,
        extensions: set(future_extensions)
  }
);

let author_reward = new Serializer(
    "author_reward", {
        author: string,
        permlink: string,
        payout: asset,
        vesting_payout: asset
    }
);

let curation_reward = new Serializer(
    "curation_reward", {
        curator: string,
        reward: asset,
        content_author: string,
        content_permlink: string
    }
);

let content_reward = new Serializer(
    "content_reward", {
        author: string,
        permlink: string,
        payout: asset
    }
);

let fill_vesting_withdraw = new Serializer(
    "fill_vesting_withdraw", {
        from_account: string,
        to_account: string,
        withdrawn: asset,
        deposited: asset
    }
);

let shutdown_witness = new Serializer(
    "shutdown_witness", {
        owner: string
    }
);

let hardfork = new Serializer(
    "hardfork", {
        hardfork_id: uint32
    }
);

let content_payout_update = new Serializer(
    "content_payout_update", {
        author: string,
        permlink: string
    }
);

let content_benefactor_reward = new Serializer(
    "content_benefactor_reward", {
        benefactor: string,
        author: string,
        permlink: string,
        reward: asset
  }
);

let return_vesting_delegation = new Serializer(
    "return_vesting_delegation", {
        account: string,
        vesting_shares: asset
  }
);

let committee_worker_create_request = new Serializer(
    "committee_worker_create_request", {
        creator: string,
        url: string,
        worker: string,
        required_amount_min: asset,
        required_amount_max: asset,
        duration: uint32
    }
);

let committee_worker_cancel_request = new Serializer(
    "committee_worker_cancel_request", {
        creator: string,
        request_id: uint32
    }
);

let committee_vote_request = new Serializer(
    "committee_vote_request", {
        voter: string,
        request_id: uint32,
        vote_percent: int16
    }
);

let committee_cancel_request = new Serializer(
    "committee_cancel_request", {
        request_id: uint32
    }
);

let committee_approve_request = new Serializer(
    "committee_approve_request", {
        request_id: uint32
    }
);

let committee_pay_request = new Serializer(
    "committee_pay_request", {
        worker: string,
        request_id: uint32,
        tokens: asset
    }
);

let committee_payout_request = new Serializer(
    "committee_payout_request", {
        request_id: uint32
    }
);

let witness_reward = new Serializer(
    "witness_reward", {
        witness: string,
        block_id: uint32,
        shares: asset
    }
);

operation.st_operations = [
    vote,
    content,
    transfer,
    transfer_to_vesting,
    withdraw_vesting,
    account_update,
    witness_update,
    account_witness_vote,
    account_witness_proxy,
    delete_content,
    custom,
    set_withdraw_vesting_route,
    request_account_recovery,
    recover_account,
    change_recovery_account,
    escrow_transfer,
    escrow_dispute,
    escrow_release,
    escrow_approve,
    delegate_vesting_shares,
    account_create,
    account_metadata,
    proposal_create,
    proposal_update,
    proposal_delete,
    chain_properties_update,
    author_reward,
    curation_reward,
    content_reward,
    fill_vesting_withdraw,
    shutdown_witness,
    hardfork,
    content_payout_update,
    content_benefactor_reward,
    return_vesting_delegation,
    committee_worker_create_request,
    committee_worker_cancel_request,
    committee_vote_request,
    committee_cancel_request,
    committee_approve_request,
    committee_pay_request,
    committee_payout_request,
    witness_reward
];

//# -------------------------------
//#  Generated code end  S T O P
//# -------------------------------

// Make sure all tests pass
// npm test
