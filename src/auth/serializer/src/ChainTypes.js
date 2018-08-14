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
  challenge_authority: 12,
  prove_authority: 13,
  request_account_recovery: 14,
  recover_account: 15,
  change_recovery_account: 16,
  escrow_transfer: 17,
  escrow_dispute: 18,
  escrow_release: 19,
  pow2: 20,
  escrow_approve: 21,
  delegate_vesting_shares: 22,
  account_create: 23,
  account_metadata: 24,
  proposal_create: 25,
  proposal_update: 26,
  proposal_delete: 27,
  chain_properties_update: 28,
  author_reward: 29,
  curation_reward: 30,
  comment_reward: 31,
  fill_vesting_withdraw: 32,
  shutdown_witness: 33,
  hardfork: 34,
  comment_payout_update: 35,
  comment_benefactor_reward: 36,
  return_vesting_delegation: 37
};

//types.hpp
ChainTypes.object_type = {
  "null": 0,
  base: 1
};