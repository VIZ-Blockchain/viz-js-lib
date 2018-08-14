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
  request_account_recovery: 12,
  recover_account: 13,
  change_recovery_account: 14,
  escrow_transfer: 15,
  escrow_dispute: 16,
  escrow_release: 17,
  pow2: 18,
  escrow_approve: 19,
  delegate_vesting_shares: 20,
  account_create: 21,
  account_metadata: 22,
  proposal_create: 23,
  proposal_update: 24,
  proposal_delete: 25,
  chain_properties_update: 26,
  author_reward: 27,
  curation_reward: 28,
  comment_reward: 29,
  fill_vesting_withdraw: 30,
  shutdown_witness: 31,
  hardfork: 32,
  comment_payout_update: 33,
  comment_benefactor_reward: 34,
  return_vesting_delegation: 35
};

//types.hpp
ChainTypes.object_type = {
  "null": 0,
  base: 1
};