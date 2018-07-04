import get from "lodash/get";
import { key_utils } from "./auth/ecc";

module.exports = VIZ_API => {
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

  function calculateSaving(savings_withdraws) {
    let savings_pending = 0;
    savings_withdraws.forEach(withdraw => {
      const [amount, asset] = withdraw.amount.split(" ");
      savings_pending += parseFloat(amount);
    });
    return savings_pending;
  }

  function estimateAccountValue(
    account,
    { gprops, savings_withdraws, vesting_viz } = {}
  ) {
    const promises = [];
    const username = account.name;
    const assetPrecision = 1000;
    let savings;

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

    if (!savings_withdraws) {
      promises.push(
        VIZ_API
          .getSavingsWithdrawFromAsync(username)
          .then(savings_withdraws => {
            savings = calculateSaving(savings_withdraws);
          })
      );
    } else {
      savings = calculateSaving(savings_withdraws);
    }

    return Promise.all(promises).then(() => {
      const savings_balance = account.savings_balance;
      const balance = parseFloat(account.balance.split(" ")[0]);
      const saving_balance = parseFloat(savings_balance.split(" ")[0]);

      const total_viz =
        vesting_viz +
        balance +
        saving_balance +
        savings;

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

    commentPermlink: function(parentAuthor, parentPermlink) {
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
    numberWithCommas,
    vestingVIZ,
    estimateAccountValue,
    createSuggestedPassword
  };
};
