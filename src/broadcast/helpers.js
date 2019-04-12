import api from "../api";

const defaultWeight = 1;

exports = module.exports = Broadcaster => {
  Broadcaster.addAccountAuth = (
    activeWif,
    username,
    authorizedUsername,
    role = "regular",
    cb
  ) => {
    api.getAccountsAsync([username]).then(([userAccount]) => {
      const updatedAuthority = userAccount[role];
      const authorizedAccounts = updatedAuthority.account_auths.map(
        auth => auth[0]
      );
      const hasAuthority =
        authorizedAccounts.indexOf(authorizedUsername) !== -1;

      if (hasAuthority) {
        // user does already exist in authorized list
        return cb(null, null);
      }
      updatedAuthority.account_auths.push([authorizedUsername, defaultWeight]);
      const master = role === "master" ? updatedAuthority : undefined;
      const active = role === "active" ? updatedAuthority : undefined;
      const regular = role === "regular" ? updatedAuthority : undefined;
      /** Add authority on user account */
      Broadcaster.accountUpdate(
        activeWif,
        userAccount.name,
        master,
        active,
        regular,
        userAccount.memo_key,
        userAccount.json_metadata,
        cb
      );
    });
  };

  Broadcaster.removeAccountAuth = (
    activeWif,
    username,
    authorizedUsername,
    role = "regular",
    cb
  ) => {
    api.getAccountsAsync([username]).then(([userAccount]) => {
      const updatedAuthority = userAccount[role];
      const totalAuthorizedUser = updatedAuthority.account_auths.length;
      for (let i = 0; i < totalAuthorizedUser; i++) {
        const user = updatedAuthority.account_auths[i];
        if (user[0] === authorizedUsername) {
          updatedAuthority.account_auths.splice(i, 1);
          break;
        }
      }
      // user does not exist in authorized list
      if (totalAuthorizedUser === updatedAuthority.account_auths.length) {
        return cb(null, null);
      }

      const master = role === "master" ? updatedAuthority : undefined;
      const active = role === "active" ? updatedAuthority : undefined;
      const regular = role === "regular" ? updatedAuthority : undefined;

      Broadcaster.accountUpdate(
        activeWif,
        userAccount.name,
        master,
        active,
        regular,
        userAccount.memo_key,
        userAccount.json_metadata,
        cb
      );
    });
  };
};
