
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
const signed_transaction = new Serializer(
    "signed_transaction", {
        ref_block_num: uint16,
        ref_block_prefix: uint32,
        expiration: time_point_sec,
        operations: array(operation),
        extensions: set(future_extensions),
        signatures: array(bytes(65))
    }
);

const signed_block = new Serializer(
    "signed_block", {
        previous: bytes(20),
        timestamp: time_point_sec,
        validator: string,
        transaction_merkle_root: bytes(20),
        extensions: set(static_variant([
            future_extensions,
            version,
            hardfork_version_vote
        ])),
        validator_signature: bytes(65),
        transactions: array(signed_transaction)
    }
);

const block_header = new Serializer(
    "block_header", {
        previous: bytes(20),
        timestamp: time_point_sec,
        validator: string,
        transaction_merkle_root: bytes(20),
        extensions: set(static_variant([
            future_extensions,
            version,
            hardfork_version_vote
        ]))
    }
);

const signed_block_header = new Serializer(
    "signed_block_header", {
        previous: bytes(20),
        timestamp: time_point_sec,
        validator: string,
        transaction_merkle_root: bytes(20),
        extensions: set(static_variant([
            future_extensions,
            version,
            hardfork_version_vote
        ])),
        validator_signature: bytes(65)
    }
);

const vote = new Serializer(
    "vote", {
        voter: string,
        author: string,
        permlink: string,
        weight: int16
    }
);

const content = new Serializer(
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

const transfer = new Serializer(
    "transfer", {
        from: string,
        to: string,
        amount: asset,
        memo: string
    }
);

const transfer_to_vesting = new Serializer(
    "transfer_to_vesting", {
        from: string,
        to: string,
        amount: asset
    }
);

const withdraw_vesting = new Serializer(
    "withdraw_vesting", {
        account: string,
        vesting_shares: asset
    }
);

const authority = new Serializer(
    "authority", {
        weight_threshold: uint32,
        account_auths: map((string), (uint16)),
        key_auths: map((public_key), (uint16))
    }
);

const account_update = new Serializer(
    "account_update", {
        account: string,
        master: optional(authority),
        active: optional(authority),
        regular: optional(authority),
        memo_key: public_key,
        json_metadata: string
    }
);

const chain_properties_init = new Serializer(
    "chain_properties_init", {
        account_creation_fee: asset,
        maximum_block_size: uint32,
        create_account_delegation_ratio: uint32,
        create_account_delegation_time: uint32,
        min_delegation: asset,
        min_curation_percent: int16,
        max_curation_percent: int16,
        bandwidth_reserve_percent: int16,
        bandwidth_reserve_below: asset,
        flag_energy_additional_cost: int16,
        vote_accounting_min_rshares: uint32,
        committee_request_approve_min_percent: int16
    }
);

const validator_update = new Serializer(
    "validator_update", {
        owner: string,
        url: string,
        block_signing_key: public_key
    }
);

const chain_properties_update = new Serializer(
    "chain_properties_update", {
        owner: string,
        props: chain_properties_init
    }
);

const account_validator_vote = new Serializer(
    "account_validator_vote", {
        account: string,
        validator: string,
        approve: bool
    }
);

const account_validator_proxy = new Serializer(
    "account_validator_proxy", {
        account: string,
        proxy: string
    }
);

const delete_content = new Serializer(
    "delete_content", {
        author: string,
        permlink: string
    }
);

const custom = new Serializer(
    "custom", {
        required_active_auths: set(string),
        required_regular_auths: set(string),
        id: string,
        json: string
    }
);

const set_withdraw_vesting_route = new Serializer(
    "set_withdraw_vesting_route", {
        from_account: string,
        to_account: string,
        percent: uint16,
        auto_vest: bool
    }
);

const request_account_recovery = new Serializer(
    "request_account_recovery", {
        recovery_account: string,
        account_to_recover: string,
        new_master_authority: authority,
        extensions: set(future_extensions)
    }
);

const recover_account = new Serializer(
    "recover_account", {
        account_to_recover: string,
        new_master_authority: authority,
        recent_master_authority: authority,
        extensions: set(future_extensions)
    }
);

const change_recovery_account = new Serializer(
    "change_recovery_account", {
        account_to_recover: string,
        new_recovery_account: string,
        extensions: set(future_extensions)
    }
);

const escrow_transfer = new Serializer(
    "escrow_transfer", {
        from: string,
        to: string,
        token_amount: asset,
        escrow_id: uint32,
        agent: string,
        fee: asset,
        json_metadata: string,
        ratification_deadline: time_point_sec,
        escrow_expiration: time_point_sec
    }
);

const escrow_dispute = new Serializer(
    "escrow_dispute", {
        from: string,
        to: string,
        agent: string,
        who: string,
        escrow_id: uint32
    }
);

const escrow_release = new Serializer(
    "escrow_release", {
        from: string,
        to: string,
        agent: string,
        who: string,
        receiver: string,
        escrow_id: uint32,
        token_amount: asset
    }
);

const escrow_approve = new Serializer(
    "escrow_approve", {
        from: string,
        to: string,
        agent: string,
        who: string,
        escrow_id: uint32,
        approve: bool
    }
);

const delegate_vesting_shares = new Serializer(
    "delegate_vesting_shares", {
        delegator: string,
        delegatee: string,
        vesting_shares: asset
  }
);

const account_create = new Serializer(
    "account_create", {
        fee: asset,
        delegation: asset,
        creator: string,
        new_account_name: string,
        master: authority,
        active: authority,
        regular: authority,
        memo_key: public_key,
        json_metadata: string,
        referrer: string,
        extensions: set(future_extensions)
  }
);

const account_metadata = new Serializer(
    "account_metadata", {
        account: string,
        json_metadata: string
  }
);

const operation_wrapper = new Serializer(
    "operation_wrapper", {
        op: operation
  }
);

const proposal_create = new Serializer(
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

const proposal_update = new Serializer(
    "proposal_update", {
        author: string,
        title: string,
        active_approvals_to_add: set(string),
        active_approvals_to_remove: set(string),
        master_approvals_to_add: set(string),
        master_approvals_to_remove: set(string),
        regular_approvals_to_add: set(string),
        regular_approvals_to_remove: set(string),
        key_approvals_to_add: set(public_key),
        key_approvals_to_remove: set(public_key),
        extensions: set(future_extensions)
  }
);

const proposal_delete = new Serializer(
    "proposal_delete", {
        author: string,
        title: string,
        requester: string,
        extensions: set(future_extensions)
  }
);

const author_reward = new Serializer(
    "author_reward", {
        author: string,
        permlink: string,
        payout: asset,
        vesting_payout: asset
    }
);

const curation_reward = new Serializer(
    "curation_reward", {
        curator: string,
        reward: asset,
        content_author: string,
        content_permlink: string
    }
);

const content_reward = new Serializer(
    "content_reward", {
        author: string,
        permlink: string,
        payout: asset
    }
);

const fill_vesting_withdraw = new Serializer(
    "fill_vesting_withdraw", {
        from_account: string,
        to_account: string,
        withdrawn: asset,
        deposited: asset
    }
);

const shutdown_validator = new Serializer(
    "shutdown_validator", {
        owner: string
    }
);

const hardfork = new Serializer(
    "hardfork", {
        hardfork_id: uint32
    }
);

const content_payout_update = new Serializer(
    "content_payout_update", {
        author: string,
        permlink: string
    }
);

const content_benefactor_reward = new Serializer(
    "content_benefactor_reward", {
        benefactor: string,
        author: string,
        permlink: string,
        reward: asset
  }
);

const return_vesting_delegation = new Serializer(
    "return_vesting_delegation", {
        account: string,
        vesting_shares: asset
  }
);

const committee_worker_create_request = new Serializer(
    "committee_worker_create_request", {
        creator: string,
        url: string,
        worker: string,
        required_amount_min: asset,
        required_amount_max: asset,
        duration: uint32
    }
);

const committee_worker_cancel_request = new Serializer(
    "committee_worker_cancel_request", {
        creator: string,
        request_id: uint32
    }
);

const committee_vote_request = new Serializer(
    "committee_vote_request", {
        voter: string,
        request_id: uint32,
        vote_percent: int16
    }
);

const committee_cancel_request = new Serializer(
    "committee_cancel_request", {
        request_id: uint32
    }
);

const committee_approve_request = new Serializer(
    "committee_approve_request", {
        request_id: uint32
    }
);

const committee_pay_request = new Serializer(
    "committee_pay_request", {
        worker: string,
        request_id: uint32,
        tokens: asset
    }
);

const committee_payout_request = new Serializer(
    "committee_payout_request", {
        request_id: uint32
    }
);

const validator_reward = new Serializer(
    "validator_reward", {
        validator: string,
        shares: asset
    }
);

const create_invite = new Serializer(
    "create_invite", {
        creator: string,
        balance: asset,
        invite_key: public_key
    }
);

const claim_invite_balance = new Serializer(
    "claim_invite_balance", {
        initiator: string,
        receiver: string,
        invite_secret: string
    }
);

const invite_registration = new Serializer(
    "invite_registration", {
        initiator: string,
        new_account_name: string,
        invite_secret: string,
        new_account_key: public_key
    }
);

const award = new Serializer("award", {
    initiator: string,
    receiver: string,
    energy: uint16,
    custom_sequence: uint64,
    memo: string,
    beneficiaries: set(beneficiaries)
});

const fixed_award = new Serializer("fixed_award", {
    initiator: string,
    receiver: string,
    reward_amount: asset,
    max_energy: uint16,
    custom_sequence: uint64,
    memo: string,
    beneficiaries: set(beneficiaries)
});

const chain_properties_hf4 = new Serializer(
    1, {
        account_creation_fee: asset,
        maximum_block_size: uint32,
        create_account_delegation_ratio: uint32,
        create_account_delegation_time: uint32,
        min_delegation: asset,
        min_curation_percent: int16,
        max_curation_percent: int16,
        bandwidth_reserve_percent: int16,
        bandwidth_reserve_below: asset,
        flag_energy_additional_cost: int16,
        vote_accounting_min_rshares: uint32,
        committee_request_approve_min_percent: int16,
        inflation_validator_percent: int16,
        inflation_ratio_committee_vs_reward_fund: int16,
        inflation_recalc_period: uint32
  }
);
const chain_properties_hf6 = new Serializer(
    2, {
        account_creation_fee: asset,
        maximum_block_size: uint32,
        create_account_delegation_ratio: uint32,
        create_account_delegation_time: uint32,
        min_delegation: asset,
        min_curation_percent: int16,
        max_curation_percent: int16,
        bandwidth_reserve_percent: int16,
        bandwidth_reserve_below: asset,
        flag_energy_additional_cost: int16,
        vote_accounting_min_rshares: uint32,
        committee_request_approve_min_percent: int16,
        inflation_validator_percent: int16,
        inflation_ratio_committee_vs_reward_fund: int16,
        inflation_recalc_period: uint32,
        data_operations_cost_additional_bandwidth: uint32,
        validator_miss_penalty_percent: int16,
        validator_miss_penalty_duration: uint32
  }
);
const chain_properties_hf9 = new Serializer(
    3, {
        account_creation_fee: asset,
        maximum_block_size: uint32,
        create_account_delegation_ratio: uint32,
        create_account_delegation_time: uint32,
        min_delegation: asset,
        min_curation_percent: int16,
        max_curation_percent: int16,
        bandwidth_reserve_percent: int16,
        bandwidth_reserve_below: asset,
        flag_energy_additional_cost: int16,
        vote_accounting_min_rshares: uint32,
        committee_request_approve_min_percent: int16,
        inflation_validator_percent: int16,
        inflation_ratio_committee_vs_reward_fund: int16,
        inflation_recalc_period: uint32,
        data_operations_cost_additional_bandwidth: uint32,
        validator_miss_penalty_percent: int16,
        validator_miss_penalty_duration: uint32,
        create_invite_min_balance: asset,
        committee_create_request_fee: asset,
        create_paid_subscription_fee: asset,
        account_on_sale_fee: asset,
        subaccount_on_sale_fee: asset,
        validator_declaration_fee: asset,
        withdraw_intervals: uint16
  }
);
const chain_properties_hf13 = new Serializer(
    4, {
        account_creation_fee: asset,
        maximum_block_size: uint32,
        create_account_delegation_ratio: uint32,
        create_account_delegation_time: uint32,
        min_delegation: asset,
        min_curation_percent: int16,
        max_curation_percent: int16,
        bandwidth_reserve_percent: int16,
        bandwidth_reserve_below: asset,
        flag_energy_additional_cost: int16,
        vote_accounting_min_rshares: uint32,
        committee_request_approve_min_percent: int16,
        inflation_validator_percent: int16,
        inflation_ratio_committee_vs_reward_fund: int16,
        inflation_recalc_period: uint32,
        data_operations_cost_additional_bandwidth: uint32,
        validator_miss_penalty_percent: int16,
        validator_miss_penalty_duration: uint32,
        create_invite_min_balance: asset,
        committee_create_request_fee: asset,
        create_paid_subscription_fee: asset,
        account_on_sale_fee: asset,
        subaccount_on_sale_fee: asset,
        validator_declaration_fee: asset,
        withdraw_intervals: uint16,
        distribution_epoch_length: uint32
  }
);

const versioned_chain_properties_update = new Serializer(
    "versioned_chain_properties_update", {
        owner: string,
        props: static_variant([
            chain_properties_init,
            chain_properties_hf4,
            chain_properties_hf6,
            chain_properties_hf9,
            chain_properties_hf13
        ])
    }
);

const receive_award = new Serializer(
    "receive_award", {
        receiver: string,
        custom_sequence: uint64,
        memo: string,
        shares: asset
    }
);

const benefactor_award = new Serializer(
    "benefactor_award", {
        benefactor: string,
        receiver: string,
        custom_sequence: uint64,
        memo: string,
        shares: asset
    }
);

const set_paid_subscription = new Serializer("set_paid_subscription", {
    account: string,
    url: string,
    levels: uint16,
    amount: asset,
    period: uint16
});

const paid_subscribe = new Serializer("paid_subscribe", {
    subscriber: string,
    account: string,
    level: uint16,
    amount: asset,
    period: uint16,
    auto_renewal: bool
});

const paid_subscription_action = new Serializer("paid_subscription_action", {
    subscriber: string,
    account: string,
    level: uint16,
    amount: asset,
    period: uint16,
    summary_duration_sec: uint64,
    summary_amount: asset
});

const cancel_paid_subscription = new Serializer("cancel_paid_subscription", {
    subscriber: string,
    account: string
});

const set_account_price = new Serializer(
    "set_account_price", {
        account: string,
        account_seller: string,
        account_offer_price: asset,
        account_on_sale: bool
    }
);

const target_account_sale = new Serializer(
    "target_account_sale", {
        account: string,
        account_seller: string,
        target_buyer: string,
        account_offer_price: asset,
        account_on_sale: bool
    }
);

const set_subaccount_price = new Serializer(
    "set_subaccount_price", {
        account: string,
        subaccount_seller: string,
        subaccount_offer_price: asset,
        subaccount_on_sale: bool
    }
);

const buy_account = new Serializer(
    "buy_account", {
        buyer: string,
        account: string,
        account_offer_price: asset,
        account_authorities_key: public_key,
        tokens_to_shares: asset
    }
);

const account_sale = new Serializer(
    "account_sale", {
        account: string,
        price: asset,
        buyer: string,
        seller: string
    }
);

const use_invite_balance = new Serializer(
    "use_invite_balance", {
        initiator: string,
        receiver: string,
        invite_secret: string
    }
);

const expire_escrow_ratification = new Serializer(
    "expire_escrow_ratification", {
        from: string,
        to: string,
        agent: string,
        escrow_id: uint32,
        token_amount: asset,
        fee: asset,
        ratification_deadline: time_point_sec
    }
);

const bid = new Serializer(
    "bid", {
        account: string,
        bidder: string,
        bid: asset
    }
);

const outbid = new Serializer(
    "outbid", {
        account: string,
        bidder: string,
        bid: asset
    }
);

const set_reward_sharing = new Serializer(
    "set_reward_sharing", {
        owner: string,
        sharing_rate: uint16
    }
);

operation.st_operations = [
    vote,
    content,
    transfer,
    transfer_to_vesting,
    withdraw_vesting,
    account_update,
    validator_update,
    account_validator_vote,
    account_validator_proxy,
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
    shutdown_validator,
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
    validator_reward,
    create_invite,
    claim_invite_balance,
    invite_registration,
    versioned_chain_properties_update,
    award,
    receive_award,
    benefactor_award,
    set_paid_subscription,
    paid_subscribe,
    paid_subscription_action,
    cancel_paid_subscription,
    set_account_price,
    set_subaccount_price,
    buy_account,
    account_sale,
    use_invite_balance,
    expire_escrow_ratification,
    fixed_award,
    target_account_sale,
    bid,
    outbid,
    set_reward_sharing
];

// Export old witness names as aliases for backward compatibility
module.exports.witness_update = validator_update;
module.exports.account_witness_vote = account_validator_vote;
module.exports.account_witness_proxy = account_validator_proxy;
module.exports.shutdown_witness = shutdown_validator;
module.exports.witness_reward = validator_reward;

//# -------------------------------
//#  Generated code end  S T O P
//# -------------------------------

// Make sure all tests pass
// npm test
