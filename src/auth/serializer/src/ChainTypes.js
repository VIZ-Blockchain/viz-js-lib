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
  transfer_to_savings: 22,
  transfer_from_savings: 23,
  cancel_transfer_from_savings: 24,
  delegate_vesting_shares: 25,
  account_create: 26,
  account_metadata: 27,
  proposal_create: 28,
  proposal_update: 29,
  proposal_delete: 30,
  chain_properties_update: 31,
  author_reward: 32,
  curation_reward: 33,
  comment_reward: 34,
  fill_vesting_withdraw: 35,
  shutdown_witness: 36,
  fill_transfer_from_savings: 37,
  hardfork: 38,
  comment_payout_update: 39,
  comment_benefactor_reward: 40,
  return_vesting_delegation: 41
};

//types.hpp
ChainTypes.object_type = {
  "null": 0,
  base: 1
};