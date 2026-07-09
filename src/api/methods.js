module.exports = [
  {
    "api": "validator_api",
    "method": "get_validator_schedule"
  },
  {
    "api": "validator_api",
    "method": "get_witness_schedule"
  },
  {
    "api": "validator_api",
    "method": "get_validators",
    "params": ["validatorIds"]
  },
  {
    "api": "validator_api",
    "method": "get_witnesses",
    "params": ["witnessIds"]
  },
  {
    "api": "validator_api",
    "method": "get_validator_by_account",
    "params": ["accountName"]
  },
  {
    "api": "validator_api",
    "method": "get_witness_by_account",
    "params": ["accountName"]
  },
  {
    "api": "validator_api",
    "method": "get_validators_by_vote",
    "params": ["from", "limit"]
  },
  {
    "api": "validator_api",
    "method": "get_witnesses_by_vote",
    "params": ["from", "limit"]
  },
  {
    "api": "validator_api",
    "method": "get_validators_by_counted_vote",
    "params": ["from", "limit"]
  },
  {
    "api": "validator_api",
    "method": "get_witnesses_by_counted_vote",
    "params": ["from", "limit"]
  },
  {
    "api": "validator_api",
    "method": "get_validator_count"
  },
  {
    "api": "validator_api",
    "method": "get_witness_count"
  },
  {
    "api": "validator_api",
    "method": "lookup_validator_accounts",
    "params": ["lowerBoundName", "limit"]
  },
  {
    "api": "validator_api",
    "method": "lookup_witness_accounts",
    "params": ["lowerBoundName", "limit"]
  },
  {
    "api": "validator_api",
    "method": "get_active_validators"
  },
  {
    "api": "validator_api",
    "method": "get_active_witnesses"
  },
  {
    "api": "account_history",
    "method": "get_account_history",
    "params": ["account", "from", "limit"]
  },
  {
    "api": "operation_history",
    "method": "get_ops_in_block",
    "params": ["blockNum", "onlyVirtual"]
  },
  {
    "api": "operation_history",
    "method": "get_transaction",
    "params": ["trxId"]
  },
  {
    "api": "database_api",
    "method": "get_block_header",
    "params": ["blockNum"]
  },
  {
    "api": "database_api",
    "method": "get_block",
    "params": ["blockNum"]
  },
  {
    "api": "database_api",
    "method": "get_irreversible_block_header",
    "params": ["blockNum"]
  },
  {
    "api": "database_api",
    "method": "get_irreversible_block",
    "params": ["blockNum"]
  },
  {
    "api": "database_api",
    "method": "set_block_applied_callback",
    "params": ["callback"]
  },
  {
    "api": "database_api",
    "method": "get_config"
  },
  {
    "api": "database_api",
    "method": "get_dynamic_global_properties"
  },
  {
    "api": "database_api",
    "method": "get_chain_properties"
  },
  {
    "api": "database_api",
    "method": "get_hardfork_version"
  },
  {
    "api": "database_api",
    "method": "get_next_scheduled_hardfork"
  },
  {
    "api": "database_api",
    "method": "get_accounts",
    "params": ["accountNames"]
  },
  {
    "api": "database_api",
    "method": "lookup_account_names",
    "params": ["accountNames"]
  },
  {
    "api": "database_api",
    "method": "lookup_accounts",
    "params": ["lowerBoundName", "limit"]
  },
  {
    "api": "database_api",
    "method": "get_account_count"
  },
  {
    "api": "database_api",
    "method": "get_master_history",
    "params": ["account"]
  },
  {
    "api": "database_api",
    "method": "get_recovery_request",
    "params": ["account"]
  },
  {
    "api": "database_api",
    "method": "get_escrow",
    "params": ["from", "escrowId"]
  },
  {
    "api": "database_api",
    "method": "get_withdraw_routes",
    "params": ["account", "withdrawRouteType"]
  },
  {
    "api": "database_api",
    "method": "get_vesting_delegations",
    "params": ["account", "from", "limit", "type"]
  },
  {
    "api": "database_api",
    "method": "get_expiring_vesting_delegations",
    "params": ["account", "from", "limit"]
  },
  {
    "api": "database_api",
    "method": "get_transaction_hex",
    "params": ["trx"]
  },
  {
    "api": "database_api",
    "method": "get_required_signatures",
    "params": ["trx", "availableKeys"]
  },
  {
    "api": "database_api",
    "method": "get_potential_signatures",
    "params": ["trx"]
  },
  {
    "api": "database_api",
    "method": "verify_authority",
    "params": ["trx"]
  },
  {
    "api": "database_api",
    "method": "verify_account_authority",
    "params": ["name", "signers"]
  },
  {
    "api": "database_api",
    "method": "get_database_info"
  },
  {
    "api": "database_api",
    "method": "get_proposed_transactions",
    "params": ["account", "from", "limit"]
  },
  {
    "api": "database_api",
    "method": "get_accounts_on_sale",
    "params": ["from", "limit"]
  },
  {
    "api": "database_api",
    "method": "get_accounts_on_auction",
    "params": ["from", "limit"]
  },
  {
    "api": "database_api",
    "method": "get_subaccounts_on_sale",
    "params": ["from", "limit"]
  },
  {
    "api": "account_by_key",
    "method": "get_key_references",
    "params": ["account_name_type"]
  },
  {
    "api": "network_broadcast_api",
    "method": "broadcast_transaction",
    "params": ["trx"]
  },
  {
    "api": "network_broadcast_api",
    "method": "broadcast_transaction_with_callback",
    "params": ["confirmationCallback", "trx"]
  },
  {
    "api": "network_broadcast_api",
    "method": "broadcast_transaction_synchronous",
    "params": ["trx"]
  },
  {
    "api": "network_broadcast_api",
    "method": "broadcast_block",
    "params": ["block"]
  },
  {
    "api": "committee_api",
    "method": "get_committee_request",
    "params": ["request_id","votes_count"]
  },
  {
    "api": "committee_api",
    "method": "get_committee_request_votes",
    "params": ["request_id"]
  },
  {
    "api": "committee_api",
    "method": "get_committee_requests_list",
    "params": ["status"]
  },
  {
    "api": "invite_api",
    "method": "get_invites_list",
    "params": ["status"]
  },
  {
    "api": "invite_api",
    "method": "get_invite_by_id",
    "params": ["id"]
  },
  {
    "api": "invite_api",
    "method": "get_invite_by_key",
    "params": ["invite_key"]
  },
  {
    "api": "paid_subscription_api",
    "method": "get_paid_subscriptions",
    "params": ["from","limit"]
  },
  {
    "api": "paid_subscription_api",
    "method": "get_paid_subscription_options",
    "params": ["account"]
  },
  {
    "api": "paid_subscription_api",
    "method": "get_paid_subscription_status",
    "params": ["subscriber","account"]
  },
  {
    "api": "paid_subscription_api",
    "method": "get_active_paid_subscriptions",
    "params": ["subscriber"]
  },
  {
    "api": "paid_subscription_api",
    "method": "get_inactive_paid_subscriptions",
    "params": ["subscriber"]
  },
  {
    "api": "custom_protocol_api",
    "method": "get_account",
    "params": ["account","custom_protocol_id"]
  },
  {
    "api": "auth_util",
    "method": "check_authority_signature",
    "params": ["account_name","level","signatures"]
  },
  {
    "api": "block_info",
    "method": "get_block_info",
    "params": ["start_block_num","count"]
  },
  {
    "api": "block_info",
    "method": "get_blocks_with_info",
    "params": ["start_block_num","count"]
  },
  {
    "api": "raw_block",
    "method": "get_raw_block",
    "params": ["block_num"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_market",
    "params": ["market_id"]
  },
  {
    "api": "prediction_market_api",
    "method": "list_markets",
    "params": ["status", "from", "limit", "show_risky"]
  },
  {
    "api": "prediction_market_api",
    "method": "list_markets_by_oracle",
    "params": ["oracle", "from", "limit"]
  },
  {
    "api": "prediction_market_api",
    "method": "list_markets_awaiting_resolution",
    "params": ["oracle", "from", "limit"]
  },
  {
    "api": "prediction_market_api",
    "method": "list_markets_by_creator",
    "params": ["creator", "from", "limit"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_market_outcomes",
    "params": ["market_id"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_market_weight_sums",
    "params": ["market_id"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_market_bets",
    "params": ["market_id", "from", "limit"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_account_positions",
    "params": ["account", "from", "limit"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_market_liquidity",
    "params": ["market_id", "from", "limit"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_market_full",
    "params": ["market_id", "account"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_account_leverage_positions",
    "params": ["account", "from", "limit"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_market_leverage_positions",
    "params": ["market_id", "from", "limit"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_creator_ban",
    "params": ["account"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_leverage_quote",
    "params": ["market_id", "outcome_index", "collateral"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_leverage_close_preview",
    "params": ["position_id"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_leverage_convert_preview",
    "params": ["position_id"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_oracle",
    "params": ["owner"]
  },
  {
    "api": "prediction_market_api",
    "method": "list_oracles",
    "params": ["from", "limit"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_dispute",
    "params": ["market_id"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_dispute_votes",
    "params": ["market_id"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_lazy_pool"
  },
  {
    "api": "prediction_market_api",
    "method": "get_lazy_deposit",
    "params": ["account"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_lazy_allocations",
    "params": ["from", "limit"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_market_lazy_allocation",
    "params": ["market_id"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_pm_chain_properties"
  },
  {
    "api": "prediction_market_api",
    "method": "get_market_meta",
    "params": ["market_id"]
  },
  {
    "api": "prediction_market_api",
    "method": "list_markets_by_category",
    "params": ["category", "from", "limit", "jurisdiction", "subcategory", "tag", "sort"]
  },
  {
    "api": "prediction_market_api",
    "method": "get_market_categories"
  },
  {
    "api": "prediction_market_api",
    "method": "get_market_kline",
    "params": ["market_id", "from", "limit"]
  }
]
