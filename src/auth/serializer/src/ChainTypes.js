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
  decline_voting_rights: 26,
  reset_account: 27,
  set_reset_account: 28,
  delegate_vesting_shares: 29,
  account_create: 30,
  account_metadata: 31,
  proposal_create: 32,
  proposal_update: 33,
  proposal_delete: 34,
  chain_properties_update: 35,
  author_reward: 36,
  curation_reward: 37,
  comment_reward: 38,
  fill_vesting_withdraw: 39,
  shutdown_witness: 40,
  fill_transfer_from_savings: 41,
  hardfork: 42,
  comment_payout_update: 43,
  comment_benefactor_reward: 44,
  return_vesting_delegation: 45
};

//types.hpp
ChainTypes.object_type = {
  "null": 0,
  base: 1
};