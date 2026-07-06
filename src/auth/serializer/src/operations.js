
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
    int8,
    int16,
    int64,
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

// HF14: adds the Prediction-Market governance parameters (chain_properties_pm)
// on top of every HF13 field. Field order and units follow the integration
// spec §9 (get_pm_chain_properties). Percents that are plain-% or bp both fit
// uint16; durations/counters use uint32; monetary knobs are asset (VIZ).
const chain_properties_hf14 = new Serializer(
    5, {
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
        distribution_epoch_length: uint32,
        // --- Prediction Markets (HF14) governance parameters ---
        pm_oracle_registration_fee: asset,
        pm_min_oracle_insurance: asset,
        pm_market_creation_fee: asset,
        pm_min_liquidity: asset,
        pm_max_outcomes: uint8,
        pm_max_market_duration: uint32,
        pm_max_oracle_fee_percent: uint16,
        pm_oracle_accept_window_sec: uint32,
        pm_listing_min_coverage_percent: uint16,
        pm_betting_min_coverage_percent: uint16,
        pm_default_time_penalty_percent: uint16,
        pm_max_time_penalty: uint32,
        pm_dispute_fee: asset,
        pm_dispute_grace_sec: uint32,
        pm_oracle_dispute_response_sec: uint32,
        pm_dispute_auto_close_sec: uint32,
        pm_dispute_vote_period_sec: uint32,
        pm_dispute_approve_min_percent: uint16,
        pm_oracle_penalty_percent: uint16,
        pm_no_contest_penalty_percent: uint16,
        pm_dispute_reward_multiplier: uint32,
        pm_batch_epoch_blocks: uint32,
        pm_reveal_window_blocks: uint32,
        pm_commit_no_reveal_penalty_percent: uint16,
        pm_min_batch_bet: asset,
        pm_commit_reveal_enabled: bool,
        pm_processing_cap_per_block: uint32,
        pm_lazy_pool_enabled: bool,
        pm_lazy_alloc_percent: uint16,
        pm_lazy_max_total_alloc_percent: uint16,
        pm_lazy_lock_sec: uint32,
        pm_lazy_recall_step_percent: uint16,
        pm_lazy_emergency_penalty_percent: uint16,
        pm_lazy_min_liquidity_fee_percent: uint16,
        pm_leverage_enabled: bool,
        pm_leverage_fund_percent: uint16,
        pm_leverage_max_per_position_bp: uint16,
        pm_leverage_pool_profit_percent: uint16,
        pm_leverage_safety_margin_percent: uint16,
        pm_leverage_max_slippage_percent: uint16,
        pm_leverage_min_market_liquidity: asset,
        pm_leverage_max_position_ratio_percent: uint16,
        pm_leverage_expiration_buffer_sec: uint32,
        pm_leverage_m_factor_percent: uint16,
        pm_conversion_profit_cost_percent: uint16,
        pm_closed_market_retention_sec: uint32
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
            chain_properties_hf13,
            chain_properties_hf14
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

// ---------------------------------------------------------------------------
//  Stakeholder reward (op-id 65) — virtual op, emitted per stakeholder per
//  validator at each distribution epoch end. Parsed from history only.
// ---------------------------------------------------------------------------
const stakeholder_reward = new Serializer(
    "stakeholder_reward", {
        validator: string,
        stakeholder: string,
        shares: asset
    }
);

// ===========================================================================
//  Prediction Markets (Onix, HF14) — op-ids 66..100
//  User ops end with `extensions` (empty set); virtual ops have none.
//  Field order below is the declared (binary) order from the integration spec.
//  share_type / pm_object_id_type fields are int64; percents are uint16 unless
//  noted; `side` is int8; `commitment` is a 32-byte sha256 (bytes(32)).
// ===========================================================================

// 66 — pm_oracle_register (active: owner)
const pm_oracle_register = new Serializer(
    "pm_oracle_register", {
        owner: string,
        insurance: asset,
        fee_percent: uint16,
        fixed_fee: asset,
        rules_url: string,
        auto_accept_creator: string,
        auto_accept_resolver: string,
        auto_accept: bool,
        extensions: set(future_extensions)
    }
);

// 67 — pm_oracle_update (active: owner) — all change fields optional
const pm_oracle_update = new Serializer(
    "pm_oracle_update", {
        owner: string,
        insurance_delta: optional(asset),
        fee_percent: optional(uint16),
        fixed_fee: optional(asset),
        rules_url: optional(string),
        auto_accept_creator: optional(string),
        auto_accept_resolver: optional(string),
        auto_accept: optional(bool),
        extensions: set(future_extensions)
    }
);

// 68 — pm_create_market (active: creator)
const pm_create_market = new Serializer(
    "pm_create_market", {
        creator: string,
        oracle: string,
        market_type: uint8,
        outcomes: array(string),
        url: string,
        oracle_fee_percent: uint16,
        oracle_fixed_fee: asset,
        creator_fee_percent: uint16,
        liquidity_fee_percent: uint16,
        liquidity: asset,
        lmsr_b: int64,
        betting_expiration: time_point_sec,
        result_expiration: time_point_sec,
        time_penalty_type: uint8,
        time_penalty_value: uint32,
        penalty_curve_type: uint8,
        allow_early_resolution: bool,
        allow_cancellation: bool,
        allow_batch: bool,
        allow_instant_bet: bool,
        endogeneity_tier: uint8,
        dispute_mode: uint8,
        dispute_resolver: string,
        dispute_penalty_percent: int16,
        metadata: string,
        extensions: set(future_extensions)
    }
);

// 69 — pm_oracle_accept_market (active: oracle)
const pm_oracle_accept_market = new Serializer(
    "pm_oracle_accept_market", {
        oracle: string,
        market_id: int64,
        accept: bool,
        oracle_fee_percent: uint16,
        oracle_fixed_fee: asset,
        extensions: set(future_extensions)
    }
);

// 70 — pm_place_bet (active: account)
const pm_place_bet = new Serializer(
    "pm_place_bet", {
        account: string,
        market_id: int64,
        side: int8,
        outcome_index: int16,
        amount: asset,
        min_tokens: int64,
        mode: uint8,
        extensions: set(future_extensions)
    }
);

// 71 — pm_commit_bet (active: account)
const pm_commit_bet = new Serializer(
    "pm_commit_bet", {
        account: string,
        market_id: int64,
        commitment: bytes(32),
        escrow_amount: asset,
        no_reveal_fee_percent: uint16,
        extensions: set(future_extensions)
    }
);

// 72 — pm_reveal_bet (active: account)
const pm_reveal_bet = new Serializer(
    "pm_reveal_bet", {
        account: string,
        commit_id: int64,
        side: int8,
        outcome_index: int16,
        amount: asset,
        salt: string,
        min_tokens: int64,
        extensions: set(future_extensions)
    }
);

// 73 — pm_cancel_bet (active: account)
const pm_cancel_bet = new Serializer(
    "pm_cancel_bet", {
        account: string,
        bet_id: int64,
        min_return: int64,
        extensions: set(future_extensions)
    }
);

// 74 — pm_add_liquidity (active: provider)
const pm_add_liquidity = new Serializer(
    "pm_add_liquidity", {
        provider: string,
        market_id: int64,
        amount: asset,
        extensions: set(future_extensions)
    }
);

// 75 — pm_withdraw_liquidity (active: provider)
const pm_withdraw_liquidity = new Serializer(
    "pm_withdraw_liquidity", {
        provider: string,
        liquidity_id: int64,
        amount: asset,
        extensions: set(future_extensions)
    }
);

// 76 — pm_resolve_market (active: oracle)
const pm_resolve_market = new Serializer(
    "pm_resolve_market", {
        oracle: string,
        market_id: int64,
        winning_outcome: int16,
        decision_url: string,
        decision_reason: string,
        extensions: set(future_extensions)
    }
);

// 77 — pm_no_contest (active: oracle)
const pm_no_contest = new Serializer(
    "pm_no_contest", {
        oracle: string,
        market_id: int64,
        reason: string,
        extensions: set(future_extensions)
    }
);

// 78 — pm_dispute_create (active: disputer)
const pm_dispute_create = new Serializer(
    "pm_dispute_create", {
        disputer: string,
        market_id: int64,
        proposed_outcome: int16,
        reason: string,
        extensions: set(future_extensions)
    }
);

// 79 — pm_dispute_vote (regular: voter)
const pm_dispute_vote = new Serializer(
    "pm_dispute_vote", {
        voter: string,
        market_id: int64,
        vote_outcome: int16,
        vote_percent: int16,
        extensions: set(future_extensions)
    }
);

// 80 — pm_dispute_resolve (active: resolver)
const pm_dispute_resolve = new Serializer(
    "pm_dispute_resolve", {
        resolver: string,
        market_id: int64,
        correct_outcome: int16,
        penalty_amount: asset,
        ban_oracle: bool,
        ban_oracle_until: time_point_sec,
        ban_creator: bool,
        ban_creator_until: time_point_sec,
        extensions: set(future_extensions)
    }
);

// 81 — pm_transfer_position (active: from)
const pm_transfer_position = new Serializer(
    "pm_transfer_position", {
        from: string,
        bet_id: int64,
        to: string,
        amount: int64,
        memo: string,
        extensions: set(future_extensions)
    }
);

// 82 — pm_lazy_deposit (active: account)
const pm_lazy_deposit = new Serializer(
    "pm_lazy_deposit", {
        account: string,
        amount: asset,
        extensions: set(future_extensions)
    }
);

// 83 — pm_lazy_withdraw (active: account)
const pm_lazy_withdraw = new Serializer(
    "pm_lazy_withdraw", {
        account: string,
        shares: int64,
        emergency: bool,
        extensions: set(future_extensions)
    }
);

// 84 — pm_batch_settle (virtual)
const pm_batch_settle = new Serializer(
    "pm_batch_settle", {
        market_id: int64,
        epoch: uint32,
        settled_bets: uint32
    }
);

// 85 — pm_commit_forfeit (virtual)
const pm_commit_forfeit = new Serializer(
    "pm_commit_forfeit", {
        account: string,
        commit_id: int64,
        market_id: int64,
        penalty: asset,
        refund: asset
    }
);

// 86 — pm_auto_payout (virtual)
const pm_auto_payout = new Serializer(
    "pm_auto_payout", {
        account: string,
        market_id: int64,
        bet_id: int64,
        payout: asset
    }
);

// 87 — pm_dispute_finalize (virtual)
const pm_dispute_finalize = new Serializer(
    "pm_dispute_finalize", {
        market_id: int64,
        winning_outcome: int16,
        oracle_penalty: asset
    }
);

// 88 — pm_dispute_auto_close (virtual)
const pm_dispute_auto_close = new Serializer(
    "pm_dispute_auto_close", {
        market_id: int64,
        oracle_penalty: asset
    }
);

// 89 — pm_oracle_missed_penalty (virtual)
const pm_oracle_missed_penalty = new Serializer(
    "pm_oracle_missed_penalty", {
        oracle: string,
        market_id: int64,
        slashed: asset
    }
);

// 90 — pm_lazy_recall (virtual)
const pm_lazy_recall = new Serializer(
    "pm_lazy_recall", {
        market_id: int64,
        recalled: asset
    }
);

// 91 — pm_leverage_open (active: account)
const pm_leverage_open = new Serializer(
    "pm_leverage_open", {
        account: string,
        market_id: int64,
        outcome_index: int16,
        collateral: asset,
        loan: asset,
        min_tokens: int64,
        max_slippage_percent: uint16,
        extensions: set(future_extensions)
    }
);

// 92 — pm_leverage_close (active: account)
const pm_leverage_close = new Serializer(
    "pm_leverage_close", {
        account: string,
        position_id: int64,
        min_return: int64,
        extensions: set(future_extensions)
    }
);

// 93 — pm_leverage_convert (active: account)
const pm_leverage_convert = new Serializer(
    "pm_leverage_convert", {
        account: string,
        position_id: int64,
        conversion_profit_cost: uint16,
        extensions: set(future_extensions)
    }
);

// 94 — pm_leverage_liquidate (virtual)
const pm_leverage_liquidate = new Serializer(
    "pm_leverage_liquidate", {
        account: string,
        position_id: int64,
        market_id: int64,
        cancel_value: asset,
        pool_received: asset,
        bettor_received: asset,
        reason: uint8
    }
);

// 95 — pm_leverage_resolve (virtual)
const pm_leverage_resolve = new Serializer(
    "pm_leverage_resolve", {
        account: string,
        position_id: int64,
        market_id: int64,
        won: bool,
        pool_received: asset,
        bettor_received: asset,
        outcome_index: int16,
        leverage: uint16
    }
);

// 96 — pm_market_accepted (virtual)
const pm_market_accepted = new Serializer(
    "pm_market_accepted", {
        oracle: string,
        creator: string,
        market_id: int64,
        oracle_fee_percent: uint16,
        oracle_fixed_fee: asset,
        self_oracle: bool
    }
);

// 97 — pm_payout (virtual)
const pm_payout = new Serializer(
    "pm_payout", {
        account: string,
        market_id: int64,
        bet_id: int64,
        side: int8,
        outcome_index: int16,
        amount: asset,
        payout: asset
    }
);

// 98 — pm_dispute_oracle_respond (active: oracle)
const pm_dispute_oracle_respond = new Serializer(
    "pm_dispute_oracle_respond", {
        oracle: string,
        market_id: int64,
        response: string,
        extensions: set(future_extensions)
    }
);

// 99 — pm_unban (active: resolver)
const pm_unban = new Serializer(
    "pm_unban", {
        resolver: string,
        target: string,
        unban_oracle: bool,
        unban_creator: bool,
        extensions: set(future_extensions)
    }
);

// 100 — pm_ban_expired (virtual)
const pm_ban_expired = new Serializer(
    "pm_ban_expired", {
        account: string,
        oracle: bool,
        creator: bool
    }
);

// 101 — pm_market_expired (virtual)
const pm_market_expired = new Serializer(
    "pm_market_expired", {
        oracle: string,
        creator: string,
        market_id: int64,
        refunded_liquidity: asset
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
    set_reward_sharing,
    stakeholder_reward,
    // Prediction Markets (HF14) — op-ids 66..101, positional order is the tag
    pm_oracle_register,
    pm_oracle_update,
    pm_create_market,
    pm_oracle_accept_market,
    pm_place_bet,
    pm_commit_bet,
    pm_reveal_bet,
    pm_cancel_bet,
    pm_add_liquidity,
    pm_withdraw_liquidity,
    pm_resolve_market,
    pm_no_contest,
    pm_dispute_create,
    pm_dispute_vote,
    pm_dispute_resolve,
    pm_transfer_position,
    pm_lazy_deposit,
    pm_lazy_withdraw,
    pm_batch_settle,
    pm_commit_forfeit,
    pm_auto_payout,
    pm_dispute_finalize,
    pm_dispute_auto_close,
    pm_oracle_missed_penalty,
    pm_lazy_recall,
    pm_leverage_open,
    pm_leverage_close,
    pm_leverage_convert,
    pm_leverage_liquidate,
    pm_leverage_resolve,
    pm_market_accepted,
    pm_payout,
    pm_dispute_oracle_respond,
    pm_unban,
    pm_ban_expired,
    pm_market_expired
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
