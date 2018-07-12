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
  report_over_production: 9,
  delete_comment: 10,
  custom_json: 11,
  set_withdraw_vesting_route: 12,
  challenge_authority: 13,
  prove_authority: 14,
  request_account_recovery: 15,
  recover_account: 16,
  change_recovery_account: 17,
  escrow_transfer: 18,
  escrow_dispute: 19,
  escrow_release: 20,
  pow2: 21,
  escrow_approve: 22,
  transfer_to_savings: 23,
  transfer_from_savings: 24,
  cancel_transfer_from_savings: 25,
  delegate_vesting_shares: 26,
  account_create: 27,
  account_metadata: 28,
  proposal_create: 29,
  proposal_update: 30,
  proposal_delete: 31,
  chain_properties_update: 32,
  author_reward: 33,
  curation_reward: 34,
  comment_reward: 35,
  fill_vesting_withdraw: 36,
  shutdown_witness: 37,
  fill_transfer_from_savings: 38,
  hardfork: 39,
  comment_payout_update: 40,
  comment_benefactor_reward: 41,
  return_vesting_delegation: 42
};

//types.hpp
ChainTypes.object_type = {
  "null": 0,
  base: 1
};