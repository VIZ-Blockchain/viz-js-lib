var assert = require('assert');
var ops = require('../src/auth/serializer/src/operations');
var Convert = require('../src/auth/serializer/src/convert');

describe("viz.auth: pm_create_market outcomes order preservation", () => {

    it("keeps ['Yes','No'] order instead of sorting to ['No','Yes']", () => {
        var op = ops.pm_create_market;
        var sample = {
            creator: "dream-world",
            oracle: "dream-world",
            market_type: 0,
            outcomes: ["Yes", "No"],
            url: "qa-order-test",
            oracle_fee_percent: 100,
            oracle_fixed_fee: "0.000 VIZ",
            creator_fee_percent: 100,
            liquidity_fee_percent: 200,
            liquidity: "100.000 VIZ",
            lmsr_b: 0,
            betting_expiration: "2026-08-08T00:00:00",
            result_expiration: "2026-08-09T00:00:00",
            time_penalty_type: 1,
            time_penalty_value: 10,
            penalty_curve_type: 0,
            allow_early_resolution: true,
            allow_cancellation: true,
            allow_batch: true,
            allow_instant_bet: true,
            endogeneity_tier: 1,
            dispute_mode: 0,
            dispute_resolver: "",
            dispute_penalty_percent: 0,
            metadata: "{}",
            extensions: []
        };
        var hex = Convert(op).toHex(sample);
        var back = Convert(op).fromHex(hex);
        assert.equal(back.outcomes[0].toString(), "Yes");
        assert.equal(back.outcomes[1].toString(), "No");
    });

    it("non-outcomes arrays still sort (regression guard)", () => {
        var t = require('../src/auth/serializer/src/types');
        var arr = t.array(t.string);
        var obj = arr.toObject(["b", "a"], {});
        assert.deepEqual(obj, ["a", "b"]);
    });

});
