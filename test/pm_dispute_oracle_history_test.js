var assert = require('assert');
var ops = require('../src/auth/serializer/src/operations');
var Convert = require('../src/auth/serializer/src/convert');

// Lock-step regression: the C++ pm_evaluator oracle-metrics round (PR VIZ-Blockchain/viz-cpp-node#124)
// added pm_dispute_opened (variant index 102) and an `oracle` first field on pm_dispute_finalize /
// pm_dispute_auto_close so disputes land in the oracle's own account history. These asserts pin the
// JS serializer to the C++ FC_REFLECT field order so history decoders don't silently misparse.
describe("viz.auth: PM dispute oracle-history serializers", () => {

    it("pm_dispute_opened is registered at index 102", () => {
        var opsTypes = require('../src/auth/serializer/src/ChainTypes');
        assert.equal(opsTypes.operations.pm_dispute_opened, 102);
    });

    it("round-trips pm_dispute_opened", () => {
        var op = ops.pm_dispute_opened;
        var sample = {
            oracle: "vizoracle",
            disputer: "disputant",
            market_id: "42",
            proposed_outcome: 1
        };
        var hex = Convert(op).toHex(sample);
        var back = Convert(op).fromHex(hex);
        assert.equal(back.oracle.toString(), sample.oracle);
        assert.equal(back.disputer.toString(), sample.disputer);
        assert.equal(back.market_id.toString(), sample.market_id);
        assert.equal(back.proposed_outcome, sample.proposed_outcome);
    });

    it("pm_dispute_finalize carries oracle as the first field", () => {
        var op = ops.pm_dispute_finalize;
        // Serializer field order must match C++ FC_REFLECT: (oracle)(market_id)(winning_outcome)(oracle_penalty)
        assert.equal(op.keys[0], "oracle");
        var sample = {
            oracle: "vizoracle",
            market_id: "42",
            winning_outcome: 0,
            oracle_penalty: "1.000 VIZ"
        };
        var hex = Convert(op).toHex(sample);
        var back = Convert(op).fromHex(hex);
        assert.equal(back.oracle.toString(), sample.oracle);
        assert.equal(back.market_id.toString(), sample.market_id);
        assert.equal(back.winning_outcome, sample.winning_outcome);
        assert.equal(back.oracle_penalty, sample.oracle_penalty);
    });

    it("pm_dispute_auto_close carries oracle as the first field", () => {
        var op = ops.pm_dispute_auto_close;
        // C++ FC_REFLECT: (oracle)(market_id)(oracle_penalty)
        assert.equal(op.keys[0], "oracle");
        var sample = {
            oracle: "vizoracle",
            market_id: "42",
            oracle_penalty: "0.500 VIZ"
        };
        var hex = Convert(op).toHex(sample);
        var back = Convert(op).fromHex(hex);
        assert.equal(back.oracle.toString(), sample.oracle);
        assert.equal(back.market_id.toString(), sample.market_id);
        assert.equal(back.oracle_penalty, sample.oracle_penalty);
    });

});
