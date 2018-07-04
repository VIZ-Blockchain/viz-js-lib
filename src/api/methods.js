module.exports = [
  {
    "api": "witness_api",
    "method": "get_miner_queue"
  },
  {
    "api": "witness_api",
    "method": "get_witness_schedule"
  },
  {
    "api": "witness_api",
    "method": "get_witnesses",
    "params": ["witnessIds"]
  },
  {
    "api": "witness_api",
    "method": "get_witness_by_account",
    "params": ["accountName"]
  },
  {
    "api": "witness_api",
    "method": "get_witnesses_by_vote",
    "params": ["from", "limit"]
  },
  {
    "api": "witness_api",
    "method": "get_witness_count"
  },
  {
    "api": "witness_api",
    "method": "lookup_witness_accounts",
    "params": ["lowerBoundName", "limit"]
  },
  {
    "api": "witness_api",
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
    "api": "tags",
    "method": "get_trending_tags",
    "params": ["afterTag", "limit"]
  },
  {
    "api": "tags",
    "method": "get_tags_used_by_author",
    "params": ["author"]
  },
  {
    "api": "tags",
    "method": "get_discussions_by_payout",
    "params": ["query"]
  },
  {
    "api": "tags",
    "method": "get_discussions_by_trending",
    "params": ["query"]
  },
  {
    "api": "tags",
    "method": "get_discussions_by_created",
    "params": ["query"]
  },
  {
    "api": "tags",
    "method": "get_discussions_by_active",
    "params": ["query"]
  },
  {
    "api": "tags",
    "method": "get_discussions_by_cashout",
    "params": ["query"]
  },
  {
    "api": "tags",
    "method": "get_discussions_by_votes",
    "params": ["query"]
  },
  {
    "api": "tags",
    "method": "get_discussions_by_children",
    "params": ["query"]
  },
  {
    "api": "tags",
    "method": "get_discussions_by_hot",
    "params": ["query"]
  },
  {
    "api": "tags",
    "method": "get_discussions_by_feed",
    "params": ["query"]
  },
  {
    "api": "tags",
    "method": "get_discussions_by_blog",
    "params": ["query"]
  },
  {
    "api": "tags",
    "method": "get_discussions_by_comments",
    "params": ["query"]
  },
  {
    "api": "tags",
    "method": "get_discussions_by_author_before_date",
    "params": ["author", "startPermlink", "beforeDate", "limit"]
  },
  {
    "api": "tags",
    "method": "get_languages"
  },
  {
    "api": "social_network",
    "method": "get_replies_by_last_update",
    "params": ["startAuthor", "startPermlink", "limit", "voteLimit"]
  },
  {
    "api": "social_network",
    "method": "get_content",
    "params": ["author", "permlink", "voteLimit"]
  },
  {
    "api": "social_network",
    "method": "get_content_replies",
    "params": ["parent", "parentPermlink", "voteLimit"]
  },
  {
    "api": "social_network",
    "method": "get_all_content_replies",
    "params": ["parent", "parentPermlink", "voteLimit"]
  },
  {
    "api": "social_network",
    "method": "get_active_votes",
    "params": ["author", "permlink", "voteLimit"]
  },
  {
    "api": "social_network",
    "method": "get_account_votes",
    "params": ["voter", "from", "voteLimit"]
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
    "method": "get_account_count"
  },
  {
    "api": "database_api",
    "method": "get_owner_history",
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
    "method": "get_savings_withdraw_from",
    "params": ["account"]
  },
  {
    "api": "database_api",
    "method": "get_savings_withdraw_to",
    "params": ["account"]
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
    "method": "get_proposed_transaction",
    "params": ["account"]
  },
  {
    "api": "database_api",
    "method": "get_database_info"
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
    "api": "follow",
    "method": "get_followers",
    "params": ["following", "startFollower", "followType", "limit"]
  },
  {
    "api": "follow",
    "method": "get_following",
    "params": ["follower", "startFollowing", "followType", "limit"]
  },
  {
    "api": "follow",
    "method": "get_follow_count",
    "params": ["account"]
  },
  {
    "api": "follow",
    "method": "get_feed_entries",
    "params": ["account", "entryId", "limit"]
  },
  {
    "api": "follow",
    "method": "get_feed",
    "params": ["account", "entryId", "limit"]
  },
  {
    "api": "follow",
    "method": "get_blog_entries",
    "params": ["account", "entryId", "limit"]
  },
  {
    "api": "follow",
    "method": "get_blog",
    "params": ["account", "entryId", "limit"]
  },
  {
    "api": "follow",
    "method": "get_reblogged_by",
    "params": ["author", "permlink"]
  },
  {
    "api": "follow",
    "method": "get_blog_authors",
    "params": ["blogAccount"]
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
  }
]