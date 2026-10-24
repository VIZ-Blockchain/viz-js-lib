const assert = require('assert');
const ops = require('../src/auth/serializer/src/operations');
const Convert = require('../src/auth/serializer/src/convert');
const id = '11'.repeat(20), sig = '22'.repeat(65);
const u32 = n => { const b = Buffer.alloc(4); b.writeUInt32LE(n); return b.toString('hex'); };
const text = s => Buffer.from(s).length.toString(16).padStart(2, '0') + Buffer.from(s).toString('hex');
const evidence = {block_num: 7, block_id: id, signature: sig};
const evidenceHex = u32(7) + id + sig;
const cases = [
 [1, '4.2.0', u32(0x04020000)],
 [2, {hf_version:'4.2.0',hf_time:'2026-10-31T00:00:00'}, u32(0x04020000)+u32(Date.parse('2026-10-31T00:00:00Z')/1000)],
 [3, {block_num:7,block_id:id,round:8,signatures:[['alice',sig]]}, u32(7)+id+u32(8)+'01'+text('alice')+sig],
 [4, {round:8,votes:[['alice',{high_qc_round:6,signature:sig}]]}, u32(8)+'01'+text('alice')+u32(6)+sig],
 [5, {validator:'alice',round:8,first:evidence,second:evidence}, text('alice')+u32(8)+evidenceHex+evidenceHex]
];
describe('HF16 block header wire extensions', () => {
 cases.forEach(([tag,value,hex]) => it('pins C++ field order and tag '+tag, () => {
   const conv=Convert(ops.block_header_extensions);
   const expected='0'+tag+hex;
   assert.equal(conv.toHex([tag,value]), expected);
   assert.equal(conv.toHex(conv.fromHex(expected)), expected);
 }));
 ['block_header','signed_block_header','signed_block'].forEach(name => it(name+' carries QC/TC/proof', () => {
   const sample={previous:id,timestamp:'2026-10-31T00:00:00',validator:'alice',transaction_merkle_root:id,
     extensions:cases.slice(2).map(([tag,value])=>[tag,value]),validator_signature:sig,transactions:[]};
   const conv=Convert(ops[name]), hex=conv.toHex(sample);
   assert.equal(conv.toHex(conv.fromHex(hex)),hex);
 }));
});
