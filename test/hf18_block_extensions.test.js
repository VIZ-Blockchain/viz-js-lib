const assert = require('assert');
const ops = require('../src/auth/serializer/src/operations');
const Convert = require('../src/auth/serializer/src/convert');
const id = '11'.repeat(20), sig = '22'.repeat(65), qcBlock = '33'.repeat(20);
const u32 = n => { const b = Buffer.alloc(4); b.writeUInt32LE(n); return b.toString('hex'); };
const text = s => Buffer.from(s).length.toString(16).padStart(2, '0') + Buffer.from(s).toString('hex');
const vote = { high_qc_round: 6, high_qc_block_id: qcBlock, signature: sig };
const voteHex = u32(6) + qcBlock + sig;
// graphene::protocol::block_timeout_certificate_v2 { uint32 round; flat_map<account_name_type,
// block_timeout_vote_v2> votes }, vote = { uint32 high_qc_round; block_id_type; signature }.
const cases = [
  [6, { round: 8, votes: [['alice', vote]] }, u32(8) + '01' + text('alice') + voteHex],
  [6, { round: 8, votes: [['bob', vote], ['alice', vote]] },
    u32(8) + '02' + text('alice') + voteHex + text('bob') + voteHex],
  // "I hold no QC at all": zero round with a zero block id is the pre-HF16 meaning, and the
  // field is still written -- omitting it would shift every following byte.
  [6, { round: 9, votes: [['alice', { high_qc_round: 0, high_qc_block_id: '00'.repeat(20), signature: sig }]] },
    u32(9) + '01' + text('alice') + u32(0) + '00'.repeat(20) + sig]
];
describe('HF18 block header wire extension: the timeout vote names its block', () => {
  cases.forEach(([tag, value, hex], i) => it('pins C++ field order and tag ' + tag + ' (case ' + i + ')', () => {
    const conv = Convert(ops.block_header_extensions);
    const expected = '0' + tag + hex;
    assert.equal(conv.toHex([tag, value]), expected);
    assert.equal(conv.toHex(conv.fromHex(expected)), expected);
  }));
  ['block_header', 'signed_block_header', 'signed_block'].forEach(name => it(name + ' carries the v2 TC', () => {
    const sample = { previous: id, timestamp: '2026-11-16T00:00:00', validator: 'alice',
      transaction_merkle_root: id, extensions: [[6, cases[0][1]]], validator_signature: sig, transactions: [] };
    const conv = Convert(ops[name]), hex = conv.toHex(sample);
    assert.equal(conv.toHex(conv.fromHex(hex)), hex);
  }));
  it('a tag past the last variant is refused, not silently accepted', () => {
    const conv = Convert(ops.block_header_extensions);
    assert.throws(() => conv.toHex([7, { round: 8, votes: [] }]));
    assert.throws(() => conv.fromHex('07' + u32(8) + '00'));
  });
});
