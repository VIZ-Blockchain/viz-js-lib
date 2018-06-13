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
  set_withdraw_vesting_route: 15,
  challenge_authority: 16,
  prove_authority: 17,
  request_account_recovery: 18,
  recover_account: 19,
  change_recovery_account: 20,
  escrow_transfer: 21,
  escrow_dispute: 22,
  escrow_release: 23,
  pow2: 24,
  escrow_approve: 25,
  transfer_to_savings: 26,
  transfer_from_savings: 27,
  cancel_transfer_from_savings: 28,
  custom_binary: 29,
  decline_voting_rights: 30,
  reset_account: 31,
  set_reset_account: 32,
  delegate_vesting_shares: 33,
  account_create_with_delegation: 34,
  account_metadata: 35,
  proposal_create: 36,
  proposal_update: 37,
  proposal_delete: 38,
  author_reward: 39,
  curation_reward: 40,
  comment_reward: 41,
  fill_vesting_withdraw: 42,
  shutdown_witness: 43,
  fill_transfer_from_savings: 44,
  hardfork: 45,
  comment_payout_update: 46,
  comment_benefactor_reward: 47,
  return_vesting_delegation: 48
};

//types.hpp
ChainTypes.object_type = {
  "null": 0,
  base: 1
};
