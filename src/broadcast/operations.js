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
    "operation": "account_witness_vote",
    "params": [
      "account",
      "witness",
      "approve"
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
  }
]
