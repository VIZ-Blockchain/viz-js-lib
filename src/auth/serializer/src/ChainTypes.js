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
  content: 1,
  transfer: 2,
  transfer_to_vesting: 3,
  withdraw_vesting: 4,
  account_update: 5,
  witness_update: 6,
  account_witness_vote: 7,
  account_witness_proxy: 8,
  delete_content: 9,
  custom: 10,
  set_withdraw_vesting_route: 11,
  request_account_recovery: 12,
  recover_account: 13,
  change_recovery_account: 14,
  escrow_transfer: 15,
  escrow_dispute: 16,
  escrow_release: 17,
  escrow_approve: 18,
  delegate_vesting_shares: 19,
  account_create: 20,
  account_metadata: 21,
  proposal_create: 22,
  proposal_update: 23,
  proposal_delete: 24,
  chain_properties_update: 25,
  author_reward: 26,
  curation_reward: 27,
  content_reward: 28,
  fill_vesting_withdraw: 29,
  shutdown_witness: 30,
  hardfork: 31,
  content_payout_update: 32,
  content_benefactor_reward: 33,
  return_vesting_delegation: 34,
  committee_worker_create_request: 35,
  committee_worker_cancel_request: 36,
  committee_vote_request: 37,
  committee_cancel_request: 38,
  committee_approve_request: 39,
  committee_payout_request: 40,
  committee_pay_request: 41,
  witness_reward: 42,
  create_invite: 43,
  claim_invite_balance: 44,
  invite_registration: 45,
  versioned_chain_properties_update: 46,
  award: 47,
  receive_award: 48,
  benefactor_award: 49,
  set_paid_subscription: 50,
  paid_subscribe: 51,
  paid_subscription_action: 52,
  cancel_paid_subscription: 53
};

//types.hpp
ChainTypes.object_type = {
  "null": 0,
  base: 1
};