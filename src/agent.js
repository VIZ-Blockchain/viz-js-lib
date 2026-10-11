/**
 * VIZ agent access (HF15, op-id 105 `set_agent_permission`) — read-side helpers.
 *
 * A VIZ key is no longer only an authority key. A principal may register up to
 * CHAIN_AGENT_MAX_PER_ACCOUNT live agents: a label plus a public key that may sign an explicit,
 * frozen list of that principal's operations, optionally scoped to off-chain addons, optionally
 * expiring (epoch `1970-01-01T00:00:00` = perpetual).
 *
 * The old check — "getAccount and look at active_authority.key_auths" — silently rejects agent
 * keys, because an agent is not an account and never appears in any authority. The recipe now is
 * authority OR agents, and `check()` does both in one call.
 *
 * Mirrors `VIZ\Agent` of viz-php-lib; the node (`agent_evaluator.cpp::usable_agent_row`) is the
 * source of truth:
 *  - an agent answers direct active/regular requirements only, and only for operations on its list;
 *    the master authority is never satisfied by an agent, nor is a nested/other authority;
 *  - a row is unusable when expired or when its list holds a never-delegable name;
 *  - one key belongs to one agent of a principal; a key change of master/active, a recovery or a
 *    sale wipes every agent of the principal.
 *
 * @module viz/agent
 */

import Promise from 'bluebird';
import PublicKey from './auth/ecc/src/key_public';

/** Mirrors the node's never_delegable_operation_names(): a row holding one of these grants nothing. */
const NEVER_DELEGABLE = [
  'set_agent_permission',
  'proposal_update',
  'account_update',
  'recover_account',
  'change_recovery_account',
  'set_account_price',
  'set_subaccount_price',
  'target_account_sale',
];

/** Authority roles a key can belong to, most privileged first. Agents answer for none of them. */
const ROLES = ['master', 'active', 'regular'];

module.exports = VIZ_API => {
  /** Agent rows of a principal as the node returns them (expired rows included; it sweeps them lazily). */
  function get(account) {
    return VIZ_API.getAgentPermissionsAsync(account);
  }

  /** First live agent row signed by `key`, or false. A failed request reads as "no agents". */
  function find(account, key) {
    return Promise.resolve(get(account))
      .then((rows) => {
        if (!Array.isArray(rows)) {
          return false;
        }
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          if (row && row.agent_key && !isExpired(row) && keyEquals(row.agent_key, key)) {
            return row;
          }
        }
        return false;
      })
      .catch(() => false);
  }

  /** Resolves true when `key` is a live agent of `account` — and, when `operation` is given, may sign it. */
  function has(account, key, operation) {
    return find(account, key).then((row) => {
      if (false === row) {
        return false;
      }
      if (null === operation || undefined === operation || '' === operation) {
        return true;
      }
      return grants(row, operation);
    });
  }

  /**
   * Unified check: may `key` act for `account`? Answers for the authority roles first, then for the
   * agents. Resolves to an object:
   *  allowed   — bool
   *  source    — 'authority' | 'agent' | 'none'
   *  role      — authority role the key matched, when source is 'authority', else false
   *  agent     — the matched agent row, when source is 'agent', else false
   *  operation — the operation the caller asked about (null = any)
   *
   * With `operation` omitted an authority key is answered by membership alone, while an agent is
   * only answered as "this is a live agent key": its grants are per-operation, so pass the wire
   * name (`transfer`, `pm_place_bet`, ...) to check a specific operation. A key that is only in a
   * nested authority (account_auths) is NOT resolved here — use `verify_authority` with a signed
   * transaction for the full recursive check. Note that a node without HF15 answers every agent
   * question with "none": the check then degrades to authorities only.
   */
  function check(account, key, operation) {
    const result = {
      allowed: false,
      source: 'none',
      role: false,
      agent: false,
      operation: null === operation ? null : operation,
    };

    return Promise.resolve(VIZ_API.getAccountAsync(account, ''))
      .catch(() => false)
      .then((accountObject) => {
        if (
          accountObject &&
          'string' === typeof accountObject.name &&
          accountObject.name === account
        ) {
          for (let i = 0; i < ROLES.length; i++) {
            const role = ROLES[i];
            if (inAuthority(accountObject[`${role}_authority`], key)) {
              result.allowed = true;
              result.source = 'authority';
              result.role = role;
              return result;
            }
          }
        }
        return find(account, key).then((row) => {
          if (
            false !== row &&
            (null === operation || undefined === operation || '' === operation || grants(row, operation))
          ) {
            result.allowed = true;
            result.source = 'agent';
            result.agent = row;
          }
          return result;
        });
      });
  }

  /** True when the agent row is alive at head block time. The node's own flag wins; the timestamp is the fallback. */
  function isExpired(row) {
    if (undefined !== row.expired) {
      return !!row.expired;
    }
    if (!row.expiration) {
      return false;
    }
    // The chain reports UTC without a trailing 'Z', so parse it as UTC explicitly.
    const time = Date.parse(`${row.expiration}Z`);
    if (isNaN(time) || time <= 0) {
      return false; // epoch = perpetual; an unparsable value is not a reason to deny the key
    }
    return time <= Date.now();
  }

  /** True when the row's list covers `operation` and the row is not poisoned by a never-delegable name. */
  function grants(row, operation) {
    if (!Array.isArray(row.operations) || -1 === row.operations.indexOf(operation)) {
      return false;
    }
    return !poisoned(row);
  }

  /**
   * True when the row's list holds a never-delegable name. The node refuses such a row WHOLE
   * (`usable_agent_row` bails on the first forbidden name), it does not merely drop that name — so
   * the row grants nothing at all, including its off-chain addons.
   */
  function poisoned(row) {
    if (!Array.isArray(row.operations)) {
      return false;
    }
    for (let i = 0; i < row.operations.length; i++) {
      if (-1 !== NEVER_DELEGABLE.indexOf(row.operations[i])) {
        return true;
      }
    }
    return false;
  }

  /**
   * True when the row is scoped to `scope`. Addons are opaque off-chain scopes: the node stores
   * them and never interprets them, so a service matches its OWN scope here, by exact string
   * (case-sensitive — the chain does not normalise them for us).
   */
  function addonMatches(row, scope) {
    if (!Array.isArray(row.addons)) {
      return false;
    }
    return -1 !== row.addons.indexOf(scope);
  }

  /** True when `key` is a member of the authority with enough weight to meet its threshold. */
  function inAuthority(authority, key) {
    if (!authority || !Array.isArray(authority.key_auths)) {
      return false;
    }
    const threshold = parseInt(authority.weight_threshold, 10) || 0;
    let weight = 0;
    for (let i = 0; i < authority.key_auths.length; i++) {
      const member = authority.key_auths[i];
      if (member && member.length > 1 && keyEquals(member[0], key)) {
        weight += parseInt(member[1], 10) || 0;
      }
    }
    return weight >= threshold && weight > 0;
  }

  /** Compare two encoded keys, tolerating whitespace, a missing 'VIZ' prefix and base58 spelling differences. */
  function keyEquals(a, b) {
    if ('string' !== typeof a || 'string' !== typeof b) {
      return false;
    }
    if (a === b) {
      return true;
    }
    return normalizeKey(a) === normalizeKey(b);
  }

  /** Canonical `VIZ...` form of an encoded public key; the trimmed input when it cannot be parsed. */
  function normalizeKey(key) {
    let value = String(key === null || undefined === key ? '' : key).trim();
    if ('' === value) {
      return '';
    }
    if (0 !== value.indexOf('VIZ')) {
      value = `VIZ${value}`;
    }
    const parsed = PublicKey.fromString(value);
    return parsed ? parsed.toString() : String(key).trim();
  }

  return {
    NEVER_DELEGABLE,
    ROLES,
    get,
    find,
    has,
    check,
    isExpired,
    grants,
    poisoned,
    addonMatches,
    inAuthority,
    keyEquals,
    normalizeKey,
  };
};
