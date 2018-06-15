"use strict";

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
  account_update: 5,
  witness_update: 6,
  account_witness_vote: 7,
  account_witness_proxy: 8,
  pow: 9,
  custom: 10,
  report_over_production: 11,
  delete_comment: 12,
  custom_json: 13,
  set_withdraw_vesting_route: 14,
  challenge_authority: 15,
  prove_authority: 16,
  request_account_recovery: 17,
  recover_account: 18,
  change_recovery_account: 19,
  escrow_transfer: 20,
  escrow_dispute: 21,
  escrow_release: 22,
  pow2: 23,
  escrow_approve: 24,
  transfer_to_savings: 25,
  transfer_from_savings: 26,
  cancel_transfer_from_savings: 27,
  custom_binary: 28,
  decline_voting_rights: 29,
  reset_account: 30,
  set_reset_account: 31,
  delegate_vesting_shares: 32,
  account_create: 33,
  account_metadata: 34,
  proposal_create: 35,
  proposal_update: 36,
  proposal_delete: 37,
  author_reward: 38,
  curation_reward: 39,
  comment_reward: 40,
  fill_vesting_withdraw: 41,
  shutdown_witness: 42,
  fill_transfer_from_savings: 43,
  hardfork: 44,
  comment_payout_update: 45,
  comment_benefactor_reward: 46,
  return_vesting_delegation: 47
};

//types.hpp
ChainTypes.object_type = {
  "null": 0,
  base: 1
};