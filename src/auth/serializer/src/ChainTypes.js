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
  delete_comment: 9,
  custom_json: 10,
  set_withdraw_vesting_route: 11,
  prove_authority: 12,
  request_account_recovery: 13,
  recover_account: 14,
  change_recovery_account: 15,
  escrow_transfer: 16,
  escrow_dispute: 17,
  escrow_release: 18,
  pow2: 19,
  escrow_approve: 20,
  delegate_vesting_shares: 21,
  account_create: 22,
  account_metadata: 23,
  proposal_create: 24,
  proposal_update: 25,
  proposal_delete: 26,
  chain_properties_update: 27,
  author_reward: 28,
  curation_reward: 29,
  comment_reward: 30,
  fill_vesting_withdraw: 31,
  shutdown_witness: 32,
  hardfork: 33,
  comment_payout_update: 34,
  comment_benefactor_reward: 35,
  return_vesting_delegation: 36
};

//types.hpp
ChainTypes.object_type = {
  "null": 0,
  base: 1
};