var assert = require('assert');
var ops = require('../src/auth/serializer/src/operations');
var Convert = require('../src/auth/serializer/src/convert');

// Lock-step regression: the C++ pm branch added two virtual operations after pm_dispute_opened (102):
//   pm_early_exit_claim_paid (103, F1/#300) and pm_lp_payout (104, goal #442 / q#681=D).
// These asserts pin the JS serializer to the C++ FC_REFLECT field order so account_history
// decoders don't silently misparse the trailing ops.
describe("viz.auth: PM payout/claim serializers", () => {

    it("pm_early_exit_claim_paid is registered at index 103", () => {
        var opsTypes = require('../src/auth/serializer/src/ChainTypes');
        assert.equal(opsTypes.operations.pm_early_exit_claim_paid, 103);
    });

    it("pm_lp_payout is registered at index 104", () => {
        var opsTypes = require('../src/auth/serializer/src/ChainTypes');
        assert.equal(opsTypes.operations.pm_lp_payout, 104);
    });

    it("round-trips pm_early_exit_claim_paid", () => {
        var op = ops.pm_early_exit_claim_paid;
        // C++ FC_REFLECT: (account)(market_id)(kind)(outcome_index)(claimed)(paid)
        assert.deepEqual(op.keys, ["account", "market_id", "kind", "outcome_index", "claimed", "paid"]);
        var sample = {
            account: "bettor",
            market_id: "42",
            kind: 1,
            outcome_index: 0,
            claimed: "2.000 VIZ",
            paid: "1.500 VIZ"
        };
        var hex = Convert(op).toHex(sample);
        var back = Convert(op).fromHex(hex);
        assert.equal(back.account.toString(), sample.account);
        assert.equal(back.market_id.toString(), sample.market_id);
        assert.equal(back.kind, sample.kind);
        assert.equal(back.outcome_index, sample.outcome_index);
        assert.equal(back.claimed, sample.claimed);
        assert.equal(back.paid, sample.paid);
    });

    it("round-trips pm_lp_payout", () => {
        var op = ops.pm_lp_payout;
        // C++ FC_REFLECT: (account)(market_id)(principal)(income)(charge)
        assert.deepEqual(op.keys, ["account", "market_id", "principal", "income", "charge"]);
        var sample = {
            account: "vizoracle",
            market_id: "42",
            principal: "100.000 VIZ",
            income: "2.500 VIZ",
            charge: "0.000 VIZ"
        };
        var hex = Convert(op).toHex(sample);
        var back = Convert(op).fromHex(hex);
        assert.equal(back.account.toString(), sample.account);
        assert.equal(back.market_id.toString(), sample.market_id);
        assert.equal(back.principal, sample.principal);
        assert.equal(back.income, sample.income);
        assert.equal(back.charge, sample.charge);
    });

});
