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
  account_create: 5,
  account_update: 6,
  witness_update: 7,
  account_witness_vote: 8,
  account_witness_proxy: 9,
  pow: 10,
  custom: 11,
  report_over_production: 12,
  delete_comment: 13,
  custom_json: 14,
  comment_options: 15,
  set_withdraw_vesting_route: 16,
  challenge_authority: 17,
  prove_authority: 18,
  request_account_recovery: 19,
  recover_account: 20,
  change_recovery_account: 21,
  escrow_transfer: 22,
  escrow_dispute: 23,
  escrow_release: 24,
  pow2: 25,
  escrow_approve: 26,
  transfer_to_savings: 27,
  transfer_from_savings: 28,
  cancel_transfer_from_savings: 29,
  custom_binary: 30,
  decline_voting_rights: 31,
  reset_account: 32,
  set_reset_account: 33,
  delegate_vesting_shares: 34,
  account_create_with_delegation: 35,
  account_metadata: 36,
  proposal_create: 37,
  proposal_update: 38,
  proposal_delete: 39,
  author_reward: 40,
  curation_reward: 41,
  comment_reward: 42,
  fill_vesting_withdraw: 43,
  shutdown_witness: 44,
  fill_transfer_from_savings: 45,
  hardfork: 46,
  comment_payout_update: 47,
  comment_benefactor_reward: 48,
  return_vesting_delegation: 49
};

//types.hpp
ChainTypes.object_type = {
  "null": 0,
  base: 1
};
