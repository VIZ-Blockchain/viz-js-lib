import get from "lodash/get";
import { key_utils } from "./auth/ecc";
import hash from "./auth/ecc/src/hash";

module.exports = VIZ_API => {
  // Convert an amount to raw milli-VIZ (share_type). Accepts a raw integer
  // (number/string of milli-VIZ) or a 3-decimal VIZ asset string ("10.000 VIZ").
  function toMilliVIZ(amount) {
    if (typeof amount === "string" && amount.indexOf(" ") !== -1) {
      return BigInt(Math.round(parseFloat(amount.trim().split(" ")[0]) * 1000));
    }
    return BigInt(amount);
  }
  function numberWithCommas(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function vestingVIZ(account, gprops) {
    const shares = parseFloat(account.vesting_shares.split(" ")[0]);
    const total_shares = parseFloat(gprops.total_vesting_shares.split(" ")[0]);
    const total_vest_viz = parseFloat(
      gprops.total_vesting_fund.split(" ")[0]
    );
    const vesting_viz = total_vest_viz * (shares / total_shares);
    return vesting_viz;
  }

  function estimateAccountValue(
    account,
    { gprops, vesting_viz } = {}
  ) {
    const promises = [];
    const username = account.name;
    const assetPrecision = 1000;

    if (!vesting_viz) {
      if (!gprops) {
        promises.push(
          VIZ_API.getStateAsync(`/@{username}`).then(data => {
            gprops = data.props;
            vesting_viz = vestingVIZ(account, gprops);
          })
        );
      } else {
        vesting_viz = vestingVIZ(account, gprops);
      }
    }

    return Promise.all(promises).then(() => {
      const balance = parseFloat(account.balance.split(" ")[0]);

      const total_viz =
        vesting_viz +
        balance;

      return (total_viz).toFixed(3);
    });
  }

  function createSuggestedPassword() {
    const PASSWORD_LENGTH = 32;
    const privateKey = key_utils.get_random_key();
    return privateKey.toWif().substring(3, 3 + PASSWORD_LENGTH);
  }

  return {
    sharesToVIZ: function(
      vestingShares,
      totalVestingShares,
      totalVestingFund
    ) {
      return (
        parseFloat(totalVestingFund) *
        (parseFloat(vestingShares) / parseFloat(totalVestingShares))
      );
    },

    contentPermlink: function(parentAuthor, parentPermlink) {
      const timeStr = new Date()
        .toISOString()
        .replace(/[^a-zA-Z0-9]+/g, "")
        .toLowerCase();
      parentPermlink = parentPermlink.replace(/(-\d{8}t\d{9}z)/g, "");
      return "re-" + parentAuthor + "-" + parentPermlink + "-" + timeStr;
    },

    amount: function(amount, asset) {
      return amount.toFixed(3) + " " + asset;
    },

    /**
     * Build the byte-exact commitment hash for `pm_commit_bet` (HF14
     * prediction markets, spec §3.6.1). The node recomputes this in the
     * `pm_reveal_bet` evaluator and forfeits the escrow on any mismatch, so
     * the same side/outcome_index/amount/min_tokens/salt MUST be re-supplied
     * to `pm_reveal_bet`.
     *
     * Preimage = raw little-endian binary concatenation (no separators):
     *   market_id (int64 LE, 8) | account (ASCII, 32-byte zero-padded) |
     *   side (int8, 1) | outcome_index (int16 LE, 2) |
     *   amount (int64 LE, 8, milli-VIZ) | min_tokens (int64 LE, 8) | salt (utf8)
     *
     * @arg {number|string} marketId numeric market instance
     * @arg {string} account bettor account name
     * @arg {number} side binary 0/1, multi -1
     * @arg {number} outcomeIndex multi 0..N-1, binary -1
     * @arg {number|string} amount revealed stake — milli-VIZ integer or "10.000 VIZ"
     * @arg {number|string} minTokens slippage floor (milli-VIZ / weight units)
     * @arg {string} salt entropy string bound into the hash
     * @return {string} 64-char hex SHA-256 commitment
     */
    predictionMarketCommitment: function(
      marketId, account, side, outcomeIndex, amount, minTokens, salt
    ) {
      const fixed = Buffer.alloc(59);
      fixed.writeBigInt64LE(BigInt(marketId), 0);
      Buffer.from(String(account), "ascii").copy(fixed, 8, 0, 32);
      fixed.writeInt8(side, 40);
      fixed.writeInt16LE(outcomeIndex, 41);
      fixed.writeBigInt64LE(toMilliVIZ(amount), 43);
      fixed.writeBigInt64LE(BigInt(minTokens), 51);
      const preimage = Buffer.concat([fixed, Buffer.from(salt, "utf8")]);
      return hash.sha256(preimage, "hex");
    },

    toMilliVIZ,
    numberWithCommas,
    vestingVIZ,
    estimateAccountValue,
    createSuggestedPassword
  };
};
