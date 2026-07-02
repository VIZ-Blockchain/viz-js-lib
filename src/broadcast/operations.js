module.exports = [
  {
    "roles": ["regular"],
    "operation": "vote",
    "params": [
      "voter",
      "author",
      "permlink",
      "weight"
    ]
  },
  {
    "roles": ["regular"],
    "operation": "content",
    "params": [
      "parent_author",
      "parent_permlink",
      "author",
      "permlink",
      "title",
      "body",
      "curation_percent",
      "json_metadata",
      "extensions"
    ]
  },
  {
    "roles": ["active", "master"],
    "operation": "transfer",
    "params": [
      "from",
      "to",
      "amount",
      "memo"
    ]
  },
  {
    "roles": ["active"],
    "operation": "transfer_to_vesting",
    "params": [
      "from",
      "to",
      "amount"
    ]
  },
  {
    "roles": ["active"],
    "operation": "withdraw_vesting",
    "params": [
      "account",
      "vesting_shares"
    ]
  },
  {
    "roles": ["master", "active"],
    "operation": "account_update",
    "params": [
      "account",
      "master",
      "active",
      "regular",
      "memo_key",
      "json_metadata"
    ]
  },
  {
    "roles": ["active"],
    "operation": "validator_update",
    "params": [
      "owner",
      "url",
      "block_signing_key"
    ]
  },
  {
    "roles": ["active"],
    "operation": "witness_update",
    "params": [
      "owner",
      "url",
      "block_signing_key"
    ]
  },
  {
    "roles": ["active"],
    "operation": "chain_properties_update",
    "params": [
      "owner",
      "props"
    ]
  },
  {
    "roles": ["regular"],
    "operation": "account_validator_vote",
    "params": [
      "account",
      "validator",
      "approve"
    ]
  },
  {
    "roles": ["regular"],
    "operation": "account_witness_vote",
    "params": [
      "account",
      "witness",
      "approve"
    ]
  },
  {
    "roles": ["regular"],
    "operation": "account_validator_proxy",
    "params": [
      "account",
      "proxy"
    ]
  },
  {
    "roles": ["regular"],
    "operation": "account_witness_proxy",
    "params": [
      "account",
      "proxy"
    ]
  },
  {
    "roles": ["regular"],
    "operation": "delete_content",
    "params": [
      "author",
      "permlink"
    ]
  },
  {
    "roles": ["regular", "active"],
    "operation": "custom",
    "params": [
      "required_active_auths",
      "required_regular_auths",
      "id",
      "json"
    ]
  },
  {
    "roles": ["active"],
    "operation": "set_withdraw_vesting_route",
    "params": [
      "from_account",
      "to_account",
      "percent",
      "auto_vest"
    ]
  },
  {
    "roles": ["active"],
    "operation": "request_account_recovery",
    "params": [
      "recovery_account",
      "account_to_recover",
      "new_master_authority",
      "extensions"
    ]
  },
  {
    "roles": ["master"],
    "operation": "recover_account",
    "params": [
      "account_to_recover",
      "new_master_authority",
      "recent_master_authority",
      "extensions"
    ]
  },
  {
    "roles": ["master"],
    "operation": "change_recovery_account",
    "params": [
      "account_to_recover",
      "new_recovery_account",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "escrow_transfer",
    "params": [
      "from",
      "to",
      "token_amount",
      "escrow_id",
      "agent",
      "fee",
      "json_metadata",
      "ratification_deadline",
      "escrow_expiration"
    ]
  },
  {
    "roles": ["active"],
    "operation": "escrow_dispute",
    "params": [
      "from",
      "to",
      "agent",
      "who",
      "escrow_id"
    ]
  },
  {
    "roles": ["active"],
    "operation": "escrow_release",
    "params": [
      "from",
      "to",
      "agent",
      "who",
      "receiver",
      "escrow_id",
      "token_amount"
    ]
  },
  {
    "roles": ["active"],
    "operation": "escrow_approve",
    "params": [
      "from",
      "to",
      "agent",
      "who",
      "escrow_id",
      "approve"
    ]
  },
  {
    "roles": ["regular"],
    "operation": "claim_reward_balance",
    "params": [
      "account",
      "reward",
      "reward_vests"
    ]
  },
  {
    "roles": ["regular"],
    "operation": "content_reward",
    "params": [
      "author",
      "permlink",
      "payout"
    ]
  },
  {
    "roles": ["active"],
    "operation": "fill_vesting_withdraw",
    "params": [
      "from_account",
      "to_account",
      "withdrawn",
      "deposited"
    ]
  },
  {
    "roles": ["active", "master"],
    "operation": "delegate_vesting_shares",
    "params": [
      "delegator",
      "delegatee",
      "vesting_shares"
    ]
  },
  {
    "roles": ["active", "master"],
    "operation": "account_create",
    "params": [
      "fee",
      "delegation",
      "creator",
      "new_account_name",
      "master",
      "active",
      "regular",
      "memo_key",
      "json_metadata",
      "referrer",
      "extensions"
    ]
  },
  {
    "roles": ["regular"],
    "operation": "account_metadata",
    "params": [
      "account",
      "json_metadata"
    ]
  },
  {
    "roles": ["active", "master"],
    "operation": "proposal_create",
    "params": [
      "author",
      "title",
      "memo",
      "expiration_time",
      "proposed_operations",
      "review_period_time",
      "extensions"
    ]
  },
  {
    "roles": ["regular", "active", "master"],
    "operation": "proposal_update",
    "params": [
      "author",
      "title",
      "active_approvals_to_add",
      "active_approvals_to_remove",
      "master_approvals_to_add",
      "master_approvals_to_remove",
      "regular_approvals_to_add",
      "regular_approvals_to_remove",
      "key_approvals_to_add",
      "key_approvals_to_remove",
      "extensions"
    ]
  },
  {
    "roles": ["active", "master"],
    "operation": "proposal_delete",
    "params": [
      "author",
      "title",
      "requester",
      "extensions"
    ]
  },
  {
    "roles": ["regular"],
    "operation": "committee_worker_create_request",
    "params": [
      "creator",
      "url",
      "worker",
      "required_amount_min",
      "required_amount_max",
      "duration"
    ]
  },
  {
    "roles": ["regular"],
    "operation": "committee_worker_cancel_request",
    "params": [
      "creator",
      "request_id"
    ]
  },
  {
    "roles": ["regular"],
    "operation": "committee_vote_request",
    "params": [
      "voter",
      "request_id",
      "vote_percent"
    ]
  },
  {
    "roles": ["active"],
    "operation": "create_invite",
    "params": [
      "creator",
      "balance",
      "invite_key"
    ]
  },
  {
    "roles": ["active"],
    "operation": "claim_invite_balance",
    "params": [
      "initiator",
      "receiver",
      "invite_secret"
    ]
  },
  {
    "roles": ["active"],
    "operation": "invite_registration",
    "params": [
      "initiator",
      "new_account_name",
      "invite_secret",
      "new_account_key"
    ]
  },
  {
    "roles": ["active"],
    "operation": "versioned_chain_properties_update",
    "params": [
      "owner",
      "props"
    ]
  },
  {
    "roles": ["regular"],
    "operation": "award",
    "params": [
      "initiator",
      "receiver",
      "energy",
      "custom_sequence",
      "memo",
      "beneficiaries"
    ]
  },
  {
    "roles": ["regular"],
    "operation": "fixed_award",
    "params": [
      "initiator",
      "receiver",
      "reward_amount",
      "max_energy",
      "custom_sequence",
      "memo",
      "beneficiaries"
    ]
  },
  {
    "roles": ["active"],
    "operation": "set_paid_subscription",
    "params": [
      "account",
      "url",
      "levels",
      "amount",
      "period"
    ]
  },
  {
    "roles": ["active"],
    "operation": "paid_subscribe",
    "params": [
      "subscriber",
      "account",
      "level",
      "amount",
      "period",
      "auto_renewal"
    ]
  },
  {
    "roles": ["master"],
    "operation": "set_account_price",
    "params": [
      "account",
      "account_seller",
      "account_offer_price",
      "account_on_sale"
    ]
  },
  {
    "roles": ["master"],
    "operation": "target_account_sale",
    "params": [
      "account",
      "account_seller",
      "target_buyer",
      "account_offer_price",
      "account_on_sale"
    ]
  },
  {
    "roles": ["master"],
    "operation": "set_subaccount_price",
    "params": [
      "account",
      "subaccount_seller",
      "subaccount_offer_price",
      "subaccount_on_sale"
    ]
  },
  {
    "roles": ["active"],
    "operation": "buy_account",
    "params": [
      "buyer",
      "account",
      "account_offer_price",
      "account_authorities_key",
      "tokens_to_shares"
    ]
  },
  {
    "roles": ["active"],
    "operation": "use_invite_balance",
    "params": [
      "initiator",
      "receiver",
      "invite_secret"
    ]
  },
  {
    "roles": ["active"],
    "operation": "set_reward_sharing",
    "params": [
      "owner",
      "sharing_rate"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_oracle_register",
    "params": [
      "owner",
      "insurance",
      "fee_percent",
      "fixed_fee",
      "rules_url",
      "auto_accept_creator",
      "auto_accept_resolver",
      "auto_accept",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_oracle_update",
    "params": [
      "owner",
      "insurance_delta",
      "fee_percent",
      "fixed_fee",
      "rules_url",
      "auto_accept_creator",
      "auto_accept_resolver",
      "auto_accept",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_create_market",
    "params": [
      "creator",
      "oracle",
      "market_type",
      "outcomes",
      "url",
      "oracle_fee_percent",
      "oracle_fixed_fee",
      "creator_fee_percent",
      "liquidity_fee_percent",
      "liquidity",
      "lmsr_b",
      "betting_expiration",
      "result_expiration",
      "time_penalty_type",
      "time_penalty_value",
      "penalty_curve_type",
      "allow_early_resolution",
      "allow_cancellation",
      "allow_batch",
      "allow_instant_bet",
      "endogeneity_tier",
      "dispute_mode",
      "dispute_resolver",
      "dispute_penalty_percent",
      "metadata",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_oracle_accept_market",
    "params": [
      "oracle",
      "market_id",
      "accept",
      "oracle_fee_percent",
      "oracle_fixed_fee",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_place_bet",
    "params": [
      "account",
      "market_id",
      "side",
      "outcome_index",
      "amount",
      "min_tokens",
      "mode",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_commit_bet",
    "params": [
      "account",
      "market_id",
      "commitment",
      "escrow_amount",
      "no_reveal_fee_percent",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_reveal_bet",
    "params": [
      "account",
      "commit_id",
      "side",
      "outcome_index",
      "amount",
      "salt",
      "min_tokens",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_cancel_bet",
    "params": [
      "account",
      "bet_id",
      "min_return",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_add_liquidity",
    "params": [
      "provider",
      "market_id",
      "amount",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_withdraw_liquidity",
    "params": [
      "provider",
      "liquidity_id",
      "amount",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_resolve_market",
    "params": [
      "oracle",
      "market_id",
      "winning_outcome",
      "decision_url",
      "decision_reason",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_no_contest",
    "params": [
      "oracle",
      "market_id",
      "reason",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_dispute_create",
    "params": [
      "disputer",
      "market_id",
      "proposed_outcome",
      "reason",
      "extensions"
    ]
  },
  {
    "roles": ["regular"],
    "operation": "pm_dispute_vote",
    "params": [
      "voter",
      "market_id",
      "vote_outcome",
      "vote_percent",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_dispute_resolve",
    "params": [
      "resolver",
      "market_id",
      "correct_outcome",
      "penalty_amount",
      "ban_oracle",
      "ban_oracle_until",
      "ban_creator",
      "ban_creator_until",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_transfer_position",
    "params": [
      "from",
      "bet_id",
      "to",
      "amount",
      "memo",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_lazy_deposit",
    "params": [
      "account",
      "amount",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_lazy_withdraw",
    "params": [
      "account",
      "shares",
      "emergency",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_leverage_open",
    "params": [
      "account",
      "market_id",
      "outcome_index",
      "collateral",
      "loan",
      "min_tokens",
      "max_slippage_percent",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_leverage_close",
    "params": [
      "account",
      "position_id",
      "min_return",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_leverage_convert",
    "params": [
      "account",
      "position_id",
      "conversion_profit_cost",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_dispute_oracle_respond",
    "params": [
      "oracle",
      "market_id",
      "response",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pm_unban",
    "params": [
      "resolver",
      "target",
      "unban_oracle",
      "unban_creator",
      "extensions"
    ]
  }
]
