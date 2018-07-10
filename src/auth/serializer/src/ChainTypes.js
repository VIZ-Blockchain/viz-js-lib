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
  report_over_production: 10,
  delete_comment: 11,
  custom_json: 12,
  set_withdraw_vesting_route: 13,
  challenge_authority: 14,
  prove_authority: 15,
  request_account_recovery: 16,
  recover_account: 17,
  change_recovery_account: 18,
  escrow_transfer: 19,
  escrow_dispute: 20,
  escrow_release: 21,
  pow2: 22,
  escrow_approve: 23,
  transfer_to_savings: 24,
  transfer_from_savings: 25,
  cancel_transfer_from_savings: 26,
  decline_voting_rights: 27,
  reset_account: 28,
  set_reset_account: 29,
  delegate_vesting_shares: 30,
  account_create: 31,
  account_metadata: 32,
  proposal_create: 33,
  proposal_update: 34,
  proposal_delete: 35,
  chain_properties_update: 36,
  author_reward: 37,
  curation_reward: 38,
  comment_reward: 39,
  fill_vesting_withdraw: 40,
  shutdown_witness: 41,
  fill_transfer_from_savings: 42,
  hardfork: 43,
  comment_payout_update: 44,
  comment_benefactor_reward: 45,
  return_vesting_delegation: 46
};

//types.hpp
ChainTypes.object_type = {
  "null": 0,
  base: 1
};