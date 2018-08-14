module.exports = [
  {
    "roles": ["posting"],
    "operation": "vote",
    "params": [
      "voter",
      "author",
      "permlink",
      "weight"
    ]
  },
  {
    "roles": ["posting"],
    "operation": "comment",
    "params": [
      "parent_author",
      "parent_permlink",
      "author",
      "permlink",
      "title",
      "body",
      "json_metadata",
      "extensions"
    ]
  },
  {
    "roles": ["active", "owner"],
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
    "roles": ["owner", "active"],
    "operation": "account_update",
    "params": [
      "account",
      "owner",
      "active",
      "posting",
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
    "roles": ["posting"],
    "operation": "account_witness_vote",
    "params": [
      "account",
      "witness",
      "approve"
    ]
  },
  {
    "roles": ["posting"],
    "operation": "account_witness_proxy",
    "params": [
      "account",
      "proxy"
    ]
  },
  {
    "roles": ["posting"],
    "operation": "delete_comment",
    "params": [
      "author",
      "permlink"
    ]
  },
  {
    "roles": ["posting", "active"],
    "operation": "custom_json",
    "params": [
      "required_auths",
      "required_posting_auths",
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
      "new_owner_authority",
      "extensions"
    ]
  },
  {
    "roles": ["owner"],
    "operation": "recover_account",
    "params": [
      "account_to_recover",
      "new_owner_authority",
      "recent_owner_authority",
      "extensions"
    ]
  },
  {
    "roles": ["owner"],
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
      "agent",
      "escrow_id",
      "amount",
      "fee",
      "ratification_deadline",
      "escrow_expiration",
      "json_meta"
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
      "amount"
    ]
  },
  {
    "roles": ["active"],
    "operation": "pow2",
    "params": [
      "input",
      "pow_summary"
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
    "roles": ["posting"],
    "operation": "claim_reward_balance",
    "params": [
      "account",
      "reward",
      "reward_vests"
    ]
  },
  {
    "roles": ["posting"],
    "operation": "comment_reward",
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
    "roles": ["active", "owner"],
    "operation": "delegate_vesting_shares",
    "params": [
      "delegator",
      "delegatee",
      "vesting_shares"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "account_create",
    "params": [
      "fee",
      "delegation",
      "creator",
      "new_account_name",
      "owner",
      "active",
      "posting",
      "memo_key",
      "json_metadata",
      "referrer",
      "extensions"
    ]
  },
  {
    "roles": ["posting"],
    "operation": "account_metadata",
    "params": [
      "account",
      "json_metadata"
    ]
  },
  {
    "roles": ["active", "owner"],
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
    "roles": ["posting", "active", "owner"],
    "operation": "proposal_update",
    "params": [
      "author",
      "title",
      "active_approvals_to_add",
      "active_approvals_to_remove",
      "owner_approvals_to_add",
      "owner_approvals_to_remove",
      "posting_approvals_to_add",
      "posting_approvals_to_remove",
      "key_approvals_to_add",
      "key_approvals_to_remove",
      "extensions"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "proposal_delete",
    "params": [
      "author",
      "title",
      "requester",
      "extensions"
    ]
  },
]
