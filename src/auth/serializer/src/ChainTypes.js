var ChainTypes;

module.exports = ChainTypes = {};

ChainTypes.reserved_spaces = {
  relative_protocol_ids: 0,
  protocol_ids: 1,
  implementation_ids: 2
};

ChainTypes.operations = {
  vote: 0,
  comment: 1,
  transfer: 2,
  transfer_to_vesting: 3,
  withdraw_vesting: 4,
  limit_order_create: 5,
  limit_order_cancel: 6,
  account_create: 7,
  account_update: 8,
  witness_update: 9,
  account_witness_vote: 10,
  account_witness_proxy: 11,
  pow: 12,
  custom: 13,
  report_over_production: 14,
  delete_comment: 15,
  custom_json: 16,
  comment_options: 17,
  set_withdraw_vesting_route: 18,
  challenge_authority: 19,
  prove_authority: 20,
  request_account_recovery: 21,
  recover_account: 22,
  change_recovery_account: 23,
  escrow_transfer: 24,
  escrow_dispute: 25,
  escrow_release: 26,
  pow2: 27,
  escrow_approve: 28,
  transfer_to_savings: 29,
  transfer_from_savings: 30,
  cancel_transfer_from_savings: 31,
  custom_binary: 32,
  decline_voting_rights: 33,
  reset_account: 34,
  set_reset_account: 35,
  delegate_vesting_shares: 36,
  account_create_with_delegation: 37,
  account_metadata: 38,
  proposal_create: 39,
  proposal_update: 40,
  proposal_delete: 41,
  author_reward: 42,
  curation_reward: 43,
  comment_reward: 44,
  fill_vesting_withdraw: 45,
  shutdown_witness: 46,
  fill_transfer_from_savings: 47,
  hardfork: 48,
  comment_payout_update: 49,
  comment_benefactor_reward: 50,
  return_vesting_delegation: 51
};

//types.hpp
ChainTypes.object_type = {
  "null": 0,
  base: 1
};
