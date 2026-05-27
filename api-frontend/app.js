/* global viz */
// ─── Methods tree (from src/api/methods.js) ─────────────────────────────────
const METHODS = [
  {api:"validator_api",method:"get_miner_queue"},
  {api:"validator_api",method:"get_validator_schedule"},
  {api:"validator_api",method:"get_validators",params:["validatorIds"]},
  {api:"validator_api",method:"get_validator_by_account",params:["accountName"]},
  {api:"validator_api",method:"get_validators_by_vote",params:["from","limit"]},
  {api:"validator_api",method:"get_validators_by_counted_vote",params:["from","limit"]},
  {api:"validator_api",method:"get_validator_count"},
  {api:"validator_api",method:"lookup_validator_accounts",params:["lowerBoundName","limit"]},
  {api:"validator_api",method:"get_active_validators"},
  {api:"account_history",method:"get_account_history",params:["account","from","limit"]},
  {api:"operation_history",method:"get_ops_in_block",params:["blockNum","onlyVirtual"]},
  {api:"operation_history",method:"get_transaction",params:["trxId"]},
  {api:"database_api",method:"get_block_header",params:["blockNum"]},
  {api:"database_api",method:"get_block",params:["blockNum"]},
  {api:"database_api",method:"get_irreversible_block_header",params:["blockNum"]},
  {api:"database_api",method:"get_irreversible_block",params:["blockNum"]},
  {api:"database_api",method:"get_config"},
  {api:"database_api",method:"get_dynamic_global_properties"},
  {api:"database_api",method:"get_chain_properties"},
  {api:"database_api",method:"get_hardfork_version"},
  {api:"database_api",method:"get_next_scheduled_hardfork"},
  {api:"database_api",method:"get_account_count"},
  {api:"database_api",method:"get_owner_history",params:["account"]},
  {api:"database_api",method:"get_master_history",params:["account"]},
  {api:"database_api",method:"set_block_applied_callback",params:["callback"]},
  {api:"database_api",method:"get_recovery_request",params:["account"]},
  {api:"database_api",method:"get_escrow",params:["from","escrowId"]},
  {api:"database_api",method:"get_withdraw_routes",params:["account","withdrawRouteType"]},
  {api:"database_api",method:"get_transaction_hex",params:["trx"]},
  {api:"database_api",method:"get_required_signatures",params:["trx","availableKeys"]},
  {api:"database_api",method:"get_potential_signatures",params:["trx"]},
  {api:"database_api",method:"verify_authority",params:["trx"]},
  {api:"database_api",method:"verify_account_authority",params:["name","signers"]},
  {api:"database_api",method:"get_accounts",params:["accountNames"]},
  {api:"database_api",method:"lookup_account_names",params:["accountNames"]},
  {api:"database_api",method:"lookup_accounts",params:["lowerBoundName","limit"]},
  {api:"database_api",method:"get_proposed_transaction",params:["account"]},
  {api:"database_api",method:"get_database_info"},
  {api:"database_api",method:"get_vesting_delegations",params:["account","from","limit","type"]},
  {api:"database_api",method:"get_expiring_vesting_delegations",params:["account","from","limit"]},
  {api:"database_api",method:"get_proposed_transactions",params:["account","from","limit"]},
  {api:"database_api",method:"get_accounts_on_sale",params:["from","limit"]},
  {api:"database_api",method:"get_accounts_on_auction",params:["from","limit"]},
  {api:"database_api",method:"get_subaccounts_on_sale",params:["from","limit"]},
  {api:"account_by_key",method:"get_key_references",params:["account_name_type"]},
  {api:"network_broadcast_api",method:"broadcast_transaction",params:["trx"]},
  {api:"network_broadcast_api",method:"broadcast_transaction_with_callback",params:["confirmationCallback","trx"]},
  {api:"network_broadcast_api",method:"broadcast_transaction_synchronous",params:["trx"]},
  {api:"network_broadcast_api",method:"broadcast_block",params:["block"]},
  {api:"committee_api",method:"get_committee_request",params:["request_id","votes_count"]},
  {api:"committee_api",method:"get_committee_request_votes",params:["request_id"]},
  {api:"committee_api",method:"get_committee_requests_list",params:["status"]},
  {api:"invite_api",method:"get_invites_list",params:["status"]},
  {api:"invite_api",method:"get_invite_by_id",params:["id"]},
  {api:"invite_api",method:"get_invite_by_key",params:["invite_key"]},
  {api:"paid_subscription_api",method:"get_paid_subscriptions",params:["from","limit"]},
  {api:"paid_subscription_api",method:"get_paid_subscription_options",params:["account"]},
  {api:"paid_subscription_api",method:"get_paid_subscription_status",params:["subscriber","account"]},
  {api:"paid_subscription_api",method:"get_active_paid_subscriptions",params:["subscriber"]},
  {api:"paid_subscription_api",method:"get_inactive_paid_subscriptions",params:["subscriber"]},
  {api:"custom_protocol_api",method:"get_account",params:["account","custom_protocol_id"]},
  {api:"auth_util",method:"check_authority_signature",params:["account_name","level","signatures"]},
  {api:"block_info",method:"get_block_info",params:["start_block_num","count"]},
  {api:"block_info",method:"get_blocks_with_info",params:["start_block_num","count"]},
  {api:"raw_block",method:"get_raw_block",params:["block_num"]}
];

// ─── Derived structures ─────────────────────────────────────────────────────
// plugins: { pluginName: [method, method, ...], ... }  in insertion order
const plugins = {};
METHODS.forEach(m => {
  if (!plugins[m.api]) plugins[m.api] = [];
  plugins[m.api].push(m);
});

// ─── Node management ─────────────────────────────────────────────────────────
const DEFAULT_NODES = [
  'https://api.viz.world',
  'https://mirror.viz.world',
  'https://node.viz.cx',
  'https://viz.lexai.top'
];
const LS_CUSTOM   = 'viz_custom_nodes';
const LS_SELECTED = 'viz_selected_node';

function getCustomNodes()  { try { return JSON.parse(localStorage.getItem(LS_CUSTOM)) || []; } catch(e) { return []; } }
function saveCustomNodes(arr) { localStorage.setItem(LS_CUSTOM, JSON.stringify(arr)); }
function getAllNodes()     { return [...DEFAULT_NODES, ...getCustomNodes()]; }
function getSelectedNode() { return localStorage.getItem(LS_SELECTED) || DEFAULT_NODES[0]; }
function setSelectedNode(url) { localStorage.setItem(LS_SELECTED, url); }

function addCustomNode(url) {
  url = url.trim().replace(/\/+$/, '');
  if (!url) return;
  const customs = getCustomNodes();
  if (DEFAULT_NODES.includes(url) || customs.includes(url)) return;
  customs.push(url);
  saveCustomNodes(customs);
}

function removeCustomNode(url) {
  url = url.trim().replace(/\/+$/, '');
  saveCustomNodes(getCustomNodes().filter(n => n !== url));
  if (getSelectedNode() === url) setSelectedNode(DEFAULT_NODES[0]);
}

// ─── DOM refs ────────────────────────────────────────────────────────────────
const $nodeSelect    = document.getElementById('node-select');
const $customInput   = document.getElementById('custom-node-input');
const $addBtn        = document.getElementById('add-node-btn');
const $removeBtn     = document.getElementById('remove-node-btn');
const $checkBtn      = document.getElementById('check-nodes-btn');
const $statusPanel   = document.getElementById('node-status-panel');
const $sidebar       = document.getElementById('sidebar');
const $contentMain   = document.getElementById('content-main');
const $responseArea  = document.getElementById('response-area');

// ─── Header: node selector ───────────────────────────────────────────────────
function renderNodeSelector() {
  const all      = getAllNodes();
  const selected = getSelectedNode();
  $nodeSelect.innerHTML = '';
  all.forEach(url => {
    const opt  = document.createElement('option');
    opt.value = url;
    opt.textContent = url;
    if (url === selected) opt.selected = true;
    $nodeSelect.appendChild(opt);
  });
  // enable/disable remove button
  $removeBtn.disabled = DEFAULT_NODES.includes(selected);
}

$nodeSelect.addEventListener('change', () => {
  setSelectedNode($nodeSelect.value);
  renderNodeSelector();
  // Update hash with new node (triggers hashchange → applyHash)
  const { plugin, method, args } = parseHash();
  if (plugin) {
    navigateTo(plugin, method, args);
  } else {
    // No method selected — just re-render, no hash to update
    applyHash();
  }
});

$addBtn.addEventListener('click', () => {
  const url = $customInput.value.trim();
  if (!url) return;
  addCustomNode(url);
  setSelectedNode(url.replace(/\/+$/, ''));
  $customInput.value = '';
  renderNodeSelector();
});

$removeBtn.addEventListener('click', () => {
  const sel = $nodeSelect.value;
  if (DEFAULT_NODES.includes(sel)) return;
  removeCustomNode(sel);
  renderNodeSelector();
  applyHash();
});

// ─── Node health check ───────────────────────────────────────────────────────
const checkAbort = false;

function pingNode(url) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType('text/plain');
    xhr.open('POST', url);
    xhr.setRequestHeader('accept', 'application/json, text/plain, */*');
    xhr.setRequestHeader('content-type', 'application/json');
    const start = Date.now();
    xhr.timeout = 8000;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        const latency = Date.now() - start;
        if (xhr.status === 200) {
          try {
            const json = JSON.parse(xhr.responseText);
            if (json.error) {
              resolve({ url, latency: null, block: null, error: json.error.message || 'RPC error' });
            } else {
              const r = json.result || {};
              resolve({ url, latency, block: r.last_irreversible_block_num || null, error: null });
            }
          } catch(e) {
            resolve({ url, latency: null, block: null, error: 'Bad JSON' });
          }
        } else {
          resolve({ url, latency: null, block: null, error: 'HTTP ' + (xhr.status || 'timeout') });
        }
      }
    };
    xhr.ontimeout = function() {
      resolve({ url, latency: null, block: null, error: 'Timeout' });
    };
    xhr.onerror = function() {
      resolve({ url, latency: null, block: null, error: 'Network error' });
    };
    xhr.send('{"id":1,"method":"call","jsonrpc":"2.0","params":["database_api","get_dynamic_global_properties",[]]}');
  });
}

function renderNodeCards(results) {
  // Find best (lowest latency among ok nodes)
  let bestUrl = null, bestLatency = Infinity;
  results.forEach(r => {
    if (r.latency !== null && r.latency < bestLatency) {
      bestLatency = r.latency;
      bestUrl = r.url;
    }
  });

  $statusPanel.innerHTML = '';
  results.forEach(r => {
    const card = document.createElement('div');
    card.className = 'node-card';
    if (r.error) card.className += ' node-err';
    else if (r.latency !== null) card.className += ' node-ok';
    if (r.url === bestUrl) card.className += ' node-best';

    let infoHtml = '';
    if (r.error) {
      infoHtml = '<span class="node-error">' + esc(r.error) + '</span>';
    } else {
      infoHtml = '<span class="node-latency">' + r.latency + ' ms</span>';
      if (r.block !== null) infoHtml += '<span class="node-block">LIB #' + r.block + '</span>';
    }

    card.innerHTML = '<div class="node-card-url">' + esc(r.url) + '</div>'
                   + '<div class="node-card-info">' + infoHtml + '</div>';
    card.addEventListener('click', () => {
      if (!r.error) {
        setSelectedNode(r.url);
        renderNodeSelector();
        checkAllNodes(); // re-render panel with updated selection
      }
    });
    $statusPanel.appendChild(card);
  });
}

async function checkAllNodes() {
  const all = getAllNodes();
  $statusPanel.classList.remove('hidden');
  $checkBtn.disabled = true;
  $checkBtn.textContent = 'Checking...';

  // Show checking state for all nodes
  $statusPanel.innerHTML = '';
  all.forEach(url => {
    const card = document.createElement('div');
    card.className = 'node-card node-checking';
    card.setAttribute('data-node-url', url);
    card.innerHTML = '<div class="node-card-url">' + esc(url) + '</div>'
                   + '<div class="node-card-info"><span class="node-checking-text">Checking...</span></div>';
    $statusPanel.appendChild(card);
  });

  // Ping all nodes concurrently
  const results = await Promise.all(all.map(url => pingNode(url)));

  // Render final results
  renderNodeCards(results);

  $checkBtn.disabled = false;
  $checkBtn.textContent = 'Check nodes';
}

$checkBtn.addEventListener('click', checkAllNodes);

// ─── Hash routing ────────────────────────────────────────────────────────────
// Format: #/plugin_name/method_name?arg1=val1&arg2=val2&api=https://...
function parseHash() {
  const raw = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
  if (!raw) return { plugin: null, method: null, args: {}, apiUrl: null };
  const [pathPart, queryPart] = raw.split('?');
  const parts   = pathPart.split('/').filter(Boolean);
  const plugin  = parts[0] || null;
  const method  = parts[1] || null;
  const args    = {};
  let   apiUrl  = null;
  if (queryPart) {
    queryPart.split('&').forEach(pair => {
      const [k, ...rest] = pair.split('=');
      const v = decodeURIComponent(rest.join('='));
      if (k === 'api') { apiUrl = v; }
      else { args[k] = v; }
    });
  }
  return { plugin, method, args, apiUrl };
}

function buildHash(plugin, method, args) {
  if (!plugin) return '#/';
  let h = '#/' + plugin;
  if (method) h += '/' + method;
  const pairs = [];
  if (args) {
    Object.entries(args).forEach(([k, v]) => {
      if (v !== '' && v !== undefined) pairs.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
    });
  }
  const node = getSelectedNode();
  pairs.push('api=' + encodeURIComponent(node));
  return h + '?' + pairs.join('&');
}

function navigateTo(plugin, method, args) {
  location.hash = buildHash(plugin, method, args);
}

window.addEventListener('hashchange', applyHash);

// ─── Popular shortcuts ─────────────────────────────────────────────────────────
const POPULAR = [
  {api:"database_api",    method:"get_dynamic_global_properties"},
  {api:"database_api",    method:"get_chain_properties"},
  {api:"validator_api",   method:"get_active_validators"},
  {api:"validator_api",   method:"get_validators_by_counted_vote", preset:{limit:"21"}},
  {api:"validator_api",   method:"get_validator_by_account"},
  {api:"database_api",    method:"get_accounts"},
  {api:"account_history", method:"get_account_history", preset:{from:"-1",limit:"100"}}
];

// ─── Spec lookup (from jsonrpc-api-spec.json) ──────────────────────────────────
// Keyed by pluginName → methodName → {d: description, p: {paramName: {c: caption, d: description, t: type}}}
const SPEC = {
  validator_api: {
    get_active_validators: {d:"Returns the list of currently active validator account names participating in block production."},
    get_validator_schedule: {d:"Returns the current validator schedule object, including the shuffled list of validators and their timeshares."},
    get_validators: {d:"Returns a list of validator objects by their database IDs.",p:{validatorIds:{c:"Validator IDs",d:"Array of validator object database IDs to look up.",t:"array"}}},
    get_validator_by_account: {d:"Returns the validator object registered under a specific account name, or null if not a validator.",p:{accountName:{c:"Account Name",d:"The account name to look up as a validator."}}},
    get_validators_by_vote: {d:"Returns validators sorted by total votes (descending). Starts from a given account name. Max 100 results.",p:{from:{c:"From Account",d:"Account name to start from. Empty string starts from the top."},limit:{c:"Limit",d:"Maximum number of results (max 100)."}}},
    get_validators_by_counted_vote: {d:"Returns validators sorted by counted votes (descending). Max 100 results.",p:{from:{c:"From Account",d:"Account name to start from. Empty string starts from the top."},limit:{c:"Limit",d:"Maximum number of results (max 100)."}}},
    get_validator_count: {d:"Returns the total number of registered validators on the blockchain."},
    lookup_validator_accounts: {d:"Looks up validator account names starting from a lower bound. Returns up to 1000 results.",p:{lowerBoundName:{c:"Lower Bound Name",d:"Lower bound of the first account name. Empty string starts from the beginning."},limit:{c:"Limit",d:"Maximum number of results (max 1000)."}}},
    get_miner_queue: {d:"Returns the current miner queue."}
  },
  account_history: {
    get_account_history: {d:"Returns a map of operations for a given account in the sequence range [from-limit, from]. Use from=-1 for the most recent operations.",p:{account:{c:"Account Name",d:"The account name whose operation history to retrieve."},from:{c:"From Sequence",d:"Absolute sequence number. Use -1 for the most recent operation."},limit:{c:"Limit",d:"Maximum number of operations to return (1-1000)."}}}
  },
  operation_history: {
    get_ops_in_block: {d:"Returns the sequence of operations included or generated within a particular block.",p:{blockNum:{c:"Block Number",d:"Height of the block whose operations should be returned."},onlyVirtual:{c:"Only Virtual",d:"Whether to only include virtual operations.",t:"boolean"}}},
    get_transaction: {d:"Returns a transaction by its ID, including block number and transaction index.",p:{trxId:{c:"Transaction ID",d:"The hash of the transaction to retrieve."}}}
  },
  database_api: {
    get_block_header: {d:"Retrieves a block header by block number.",p:{blockNum:{c:"Block Number",d:"Height of the block whose header should be returned."}}},
    get_block: {d:"Retrieves a full, signed block by block number.",p:{blockNum:{c:"Block Number",d:"Height of the block to be returned."}}},
    get_irreversible_block_header: {d:"Retrieves a block header only if the block is irreversible.",p:{blockNum:{c:"Block Number",d:"Height of the block whose header should be returned."}}},
    get_irreversible_block: {d:"Retrieves a full, signed block only if it is irreversible.",p:{blockNum:{c:"Block Number",d:"Height of the block to be returned."}}},
    get_config: {d:"Retrieves compile-time constants and configuration values of the blockchain."},
    get_dynamic_global_properties: {d:"Retrieves the current dynamic global properties: head block number, total supply, and other real-time chain metrics."},
    get_chain_properties: {d:"Retrieves the chain properties as set by the median validator schedule."},
    get_hardfork_version: {d:"Returns the current hardfork version of the blockchain."},
    get_next_scheduled_hardfork: {d:"Returns the next scheduled hardfork version and the time it is planned to go live."},
    get_account_count: {d:"Returns the total number of accounts registered on the blockchain."},
    get_owner_history: {d:"Returns the owner authority change history for a given account.",p:{account:{c:"Account Name",d:"The account name whose owner history to retrieve."}}},
    get_master_history: {d:"Returns the master authority change history for a given account.",p:{account:{c:"Account Name",d:"The account name whose master authority history to retrieve."}}},
    set_block_applied_callback: {d:"Sets a callback triggered on each newly generated block (WebSocket only).",p:{callback:{c:"Callback",d:"Callback function to invoke when a new block is applied."}}},
    get_recovery_request: {d:"Returns the current account recovery request for an account, if one exists.",p:{account:{c:"Account Name",d:"The account name whose recovery request to check."}}},
    get_escrow: {d:"Returns the escrow object for a given sender and escrow ID.",p:{from:{c:"From Account",d:"The account name of the escrow sender."},escrowId:{c:"Escrow ID",d:"The numeric escrow ID to look up."}}},
    get_withdraw_routes: {d:"Returns vesting withdrawal routes for a given account.",p:{account:{c:"Account Name",d:"The account name whose withdrawal routes to retrieve."},withdrawRouteType:{c:"Route Type",d:"Filter direction: 'incoming', 'outgoing', or 'all'."}}},
    get_transaction_hex: {d:"Returns a hexadecimal dump of the serialized binary form of a transaction.",p:{trx:{c:"Transaction",d:"The signed transaction object to serialize.",t:"object"}}},
    get_required_signatures: {d:"Returns the minimal subset of public keys that should add signatures to authorize the transaction.",p:{trx:{c:"Transaction",d:"The signed transaction to analyze.",t:"object"},availableKeys:{c:"Available Keys",d:"Array of public keys that the caller can sign with.",t:"array"}}},
    get_potential_signatures: {d:"Returns the set of all public keys that could possibly sign for a given transaction.",p:{trx:{c:"Transaction",d:"The signed transaction to analyze.",t:"object"}}},
    verify_authority: {d:"Verifies that a transaction has all of the required signatures.",p:{trx:{c:"Transaction",d:"The signed transaction to verify.",t:"object"}}},
    verify_account_authority: {d:"Verifies that a set of public keys has sufficient authority for an account.",p:{name:{c:"Account Name",d:"The account name to check authority for."},signers:{c:"Signer Keys",d:"Array of public keys to verify against the account's authority.",t:"array"}}},
    get_accounts: {d:"Returns full account objects for a list of account names, including balances, vesting, authority, and validator votes.",p:{accountNames:{c:"Account Names",d:"Array of account names to look up.",t:"array"}}},
    lookup_account_names: {d:"Looks up accounts by their names. Returns null for accounts that do not exist.",p:{accountNames:{c:"Account Names",d:"Array of account names to look up.",t:"array"}}},
    lookup_accounts: {d:"Looks up account names starting from a lower bound in alphabetical order.",p:{lowerBoundName:{c:"Lower Bound Name",d:"Lower bound of the first account name."},limit:{c:"Limit",d:"Maximum number of results (max 1000)."}}},
    get_proposed_transaction: {d:"Returns proposed transactions (proposals) associated with a given account.",p:{account:{c:"Account Name",d:"The account name whose proposals to retrieve."}}},
    get_database_info: {d:"Returns database shared memory usage information including total size, free size, and per-index record counts."},
    get_vesting_delegations: {d:"Returns vesting delegation objects for a given account with pagination.",p:{account:{c:"Account Name",d:"The delegator or delegatee account name."},from:{c:"From",d:"Account name to start from for pagination."},limit:{c:"Limit",d:"Maximum number of results (default 100, max 1000)."},type:{c:"Delegation Type",d:"Filter: 'delegated' (sent) or 'received'."}}},
    get_expiring_vesting_delegations: {d:"Returns expiring vesting delegation objects for a given account.",p:{account:{c:"Account Name",d:"The delegator account name."},from:{c:"From Date",d:"Start date/time for expiration lookup (ISO timestamp)."},limit:{c:"Limit",d:"Maximum number of results (default 100, max 1000)."}}},
    get_proposed_transactions: {d:"Returns proposed transactions (proposals) associated with a given account.",p:{account:{c:"Account Name",d:"The account name whose proposals to retrieve."},from:{c:"From Offset",d:"Offset for pagination (number of results to skip)."},limit:{c:"Limit",d:"Maximum number of proposals to return (max 100)."}}},
    get_accounts_on_sale: {d:"Returns accounts currently on sale (direct sale, not auction).",p:{from:{c:"From Offset",d:"Number of results to skip for pagination."},limit:{c:"Limit",d:"Maximum number of results (max 1000)."}}},
    get_accounts_on_auction: {d:"Returns accounts currently on auction (no target buyer set).",p:{from:{c:"From Offset",d:"Number of results to skip for pagination."},limit:{c:"Limit",d:"Maximum number of results (max 1000)."}}},
    get_subaccounts_on_sale: {d:"Returns subaccounts currently on sale.",p:{from:{c:"From Offset",d:"Number of results to skip for pagination."},limit:{c:"Limit",d:"Maximum number of results (max 1000)."}}}
  },
  account_by_key: {
    get_key_references: {d:"Returns all account names that reference the given public keys in their authority.",p:{account_name_type:{c:"Public Keys",d:"Array of public keys to look up.",t:"array"}}}
  },
  network_broadcast_api: {
    broadcast_transaction: {d:"Broadcasts a signed transaction to the network. Accepted into the pending pool and propagated to P2P peers.",p:{trx:{c:"Transaction",d:"The signed transaction to broadcast.",t:"object"}}},
    broadcast_transaction_with_callback: {d:"Broadcasts a signed transaction with a confirmation callback.",p:{confirmationCallback:{c:"Callback",d:"Confirmation callback function."},trx:{c:"Transaction",d:"The signed transaction to broadcast.",t:"object"}}},
    broadcast_transaction_synchronous: {d:"Broadcasts a signed transaction and waits for confirmation. Returns transaction ID, block number, and index.",p:{trx:{c:"Transaction",d:"The signed transaction to broadcast.",t:"object"}}},
    broadcast_block: {d:"Broadcasts a signed block to the network. Typically used by validators.",p:{block:{c:"Block",d:"The signed block to broadcast.",t:"object"}}}
  },
  committee_api: {
    get_committee_request: {d:"Returns a committee request by its ID, optionally including votes.",p:{request_id:{c:"Request ID",d:"The numeric ID of the committee request."},votes_count:{c:"Votes Count",d:"Number of votes to include. 0=no votes, -1=all votes."}}},
    get_committee_request_votes: {d:"Returns all votes for a specific committee request.",p:{request_id:{c:"Request ID",d:"The numeric ID of the committee request whose votes to retrieve."}}},
    get_committee_requests_list: {d:"Returns a list of committee request IDs filtered by status.",p:{status:{c:"Status",d:"The status code to filter by (0=pending, 1=approved, etc.)."}}}
  },
  invite_api: {
    get_invites_list: {d:"Returns a list of invite IDs filtered by status.",p:{status:{c:"Status",d:"The status code to filter invites by."}}},
    get_invite_by_id: {d:"Returns an invite object by its database ID.",p:{id:{c:"Invite ID",d:"The database ID of the invite to retrieve."}}},
    get_invite_by_key: {d:"Returns an invite object by its public key.",p:{invite_key:{c:"Invite Key",d:"The public key associated with the invite."}}}
  },
  paid_subscription_api: {
    get_paid_subscriptions: {d:"Returns a paginated list of all paid subscription objects.",p:{from:{c:"From Offset",d:"Number of results to skip for pagination."},limit:{c:"Limit",d:"Maximum number of results (max 1000)."}}},
    get_paid_subscription_options: {d:"Returns the paid subscription settings for a given account (creator).",p:{account:{c:"Account Name",d:"The account name of the subscription creator."}}},
    get_paid_subscription_status: {d:"Returns the subscription status of a specific subscriber for a given creator.",p:{subscriber:{c:"Subscriber",d:"The account name of the subscriber."},account:{c:"Creator Account",d:"The account name of the subscription creator."}}},
    get_active_paid_subscriptions: {d:"Returns creator accounts that a given subscriber has active subscriptions to.",p:{subscriber:{c:"Subscriber",d:"The account name of the subscriber."}}},
    get_inactive_paid_subscriptions: {d:"Returns creator accounts that a given subscriber has inactive subscriptions to.",p:{subscriber:{c:"Subscriber",d:"The account name of the subscriber."}}}
  },
  custom_protocol_api: {
    get_account: {d:"Returns an account object enriched with custom protocol sequence data.",p:{account:{c:"Account Name",d:"The account name to look up."},custom_protocol_id:{c:"Custom Protocol ID",d:"The custom protocol ID string. Empty string to skip custom protocol lookup."}}}
  },
  auth_util: {
    check_authority_signature: {d:"Verifies that signatures are valid for the given account's authority at a specified level.",p:{account_name:{c:"Account Name",d:"The account name whose authority to check."},level:{c:"Authority Level",d:"Authority level: 'master', 'active', or 'regular'. Empty defaults to 'active'."},signatures:{c:"Signatures",d:"Array of signatures to verify.",t:"array"}}}
  },
  block_info: {
    get_block_info: {d:"Returns block metadata for a range of blocks starting from start_block_num.",p:{start_block_num:{c:"Start Block Number",d:"The first block number to return info for."},count:{c:"Count",d:"Number of blocks to return info for (max 10000)."}}},
    get_blocks_with_info: {d:"Returns full signed blocks with attached metadata for a range. Limits total response to 8 MB.",p:{start_block_num:{c:"Start Block Number",d:"The first block number to return."},count:{c:"Count",d:"Maximum number of blocks (max 10000). Response capped at 8 MB."}}}
  },
  raw_block: {
    get_raw_block: {d:"Returns a raw block by block number, including the base64-encoded serialized binary.",p:{block_num:{c:"Block Number",d:"Height of the block to retrieve in raw form."}}}
  }
};
function getMethodSpec(plugin, method) {
  return SPEC[plugin] && SPEC[plugin][method] || null;
}
function getParamSpec(plugin, method, paramName) {
  const ms = getMethodSpec(plugin, method);
  return ms && ms.p && ms.p[paramName] || null;
}

// ─── Rendering ───────────────────────────────────────────────────────────────
function esc(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Params that expect JSON arrays — combine hardcoded list with spec type data
const ARRAY_PARAM_NAMES = ['accountNames','validatorIds','availableKeys','signers','signatures','account_name_type'];
function isArrayParam(name, plugin, method) {
  if (ARRAY_PARAM_NAMES.indexOf(name) !== -1) return true;
  const ps = (plugin && method) ? getParamSpec(plugin, method, name) : null;
  return ps && ps.t === 'array';
}

function renderSidebar(activePlugin, activeMethod) {
  let html = '<div class="sidebar-section-title">Popular</div>';
  POPULAR.forEach(p => {
    const mActive = (p.api === activePlugin && p.method === activeMethod) ? ' active' : '';
    const presetQuery = p.preset ? '?' + Object.entries(p.preset).map(([k,v]) => encodeURIComponent(k)+'='+encodeURIComponent(v)).join('&') : '';
    html += '<a class="sidebar-item sidebar-method' + mActive + '" '
          + 'href="#/' + esc(p.api) + '/' + esc(p.method) + presetQuery + '">' + esc(p.method) + '</a>';
  });
  html += '<div class="sidebar-section-title">Plugins</div>';
  Object.keys(plugins).forEach(pName => {
    const isPluginActive = pName === activePlugin;
    html += '<a class="sidebar-item sidebar-plugin' + (isPluginActive && !activeMethod ? ' active' : '') + '" '
          + 'href="#/' + esc(pName) + '">' + esc(pName) + '</a>';
    if (isPluginActive) {
      plugins[pName].forEach(m => {
        const mActive = m.method === activeMethod ? ' active' : '';
        html += '<a class="sidebar-item sidebar-method' + mActive + '" '
              + 'href="#/' + esc(pName) + '/' + esc(m.method) + '">' + esc(m.method) + '</a>';
      });
    }
  });
  $sidebar.innerHTML = html;
}

function renderWelcome() {
  $contentMain.innerHTML =
    '<div class="welcome-title">VIZ API Explorer</div>'
  + '<div class="welcome-sub">Select a plugin from the sidebar to browse available methods.<br>'
  + 'Click a method to view its parameters and execute it against the selected node.</div>';
  $responseArea.innerHTML = '';
}

function renderPluginPage(pluginName) {
  const list = plugins[pluginName];
  if (!list) { renderNotFound(); return; }
  let html = '<div class="page-title">' + esc(pluginName) + '</div>'
           + '<div class="welcome-sub">' + list.length + ' method' + (list.length !== 1 ? 's' : '') + ' available</div>'
           + '<div style="margin-top:18px">';
  list.forEach(m => {
    const params = m.params ? m.params.join(', ') : 'no params';
    const ms = getMethodSpec(pluginName, m.method);
    const desc = ms ? ms.d : '';
    html += '<a class="sidebar-item sidebar-method" style="padding-left:8px;display:block;color:var(--fg2)" '
          + 'href="#/' + esc(pluginName) + '/' + esc(m.method) + '">'
          + '<strong style="color:var(--fg);font-family:var(--mono)">' + esc(m.method) + '</strong>'
          + '<span style="margin-left:10px;font-size:.8rem">(' + esc(params) + ')</span>'
          + (desc ? '<div class="method-list-desc">' + esc(desc) + '</div>' : '')
          + '</a>';
  });
  html += '</div>';
  $contentMain.innerHTML = html;
  $responseArea.innerHTML = '';
}

function renderMethodPage(pluginName, methodDef, prefillArgs) {
  const params = methodDef.params || [];
  const ms = getMethodSpec(pluginName, methodDef.method);
  let html = '<span class="plugin-badge">' + esc(pluginName) + '</span>'
           + '<div class="page-title">' + esc(methodDef.method) + '</div>'
           + (ms && ms.d ? '<div class="method-desc">' + esc(ms.d) + '</div>' : '')
           + '<div class="method-form"><form id="method-form" autocomplete="off">';
  if (params.length === 0) {
    html += '<div class="welcome-sub">This method takes no parameters.</div>';
  } else {
    params.forEach(p => {
      const ps = getParamSpec(pluginName, methodDef.method, p);
      const label = ps ? ps.c : p;
      const hint  = ps ? ps.d : '';
      if (isArrayParam(p, pluginName, methodDef.method)) {
        // Parse prefilled value as array or split comma-separated
        let vals = [];
        if (prefillArgs[p]) {
          try {
            const parsed = JSON.parse(prefillArgs[p]);
            if (Array.isArray(parsed)) vals = parsed.map(String);
            else vals = [String(parsed)];
          } catch(e) {
            vals = prefillArgs[p].split(',').map(function(s) { return s.trim(); });
          }
        }
        if (vals.length === 0) vals = [''];
        html += '<div class="field-group">'
              + '<label class="field-label">' + esc(label) + '<span class="array-badge">[ ]</span></label>'
              + (hint ? '<div class="field-hint">' + esc(hint) + '</div>' : '')
              + '<div class="multi-input-wrap" data-param="' + esc(p) + '" data-caption="' + esc(label) + '">';
        vals.forEach(function(v, i) {
          html += renderMultiRow(p, label, i, v, vals.length);
        });
        html += '</div></div>';
      } else {
        const val = prefillArgs[p] || '';
        html += '<div class="field-group">'
              + '<label class="field-label" for="arg-' + esc(p) + '">' + esc(label) + '</label>'
              + (hint ? '<div class="field-hint">' + esc(hint) + '</div>' : '')
              + '<input class="field-input" id="arg-' + esc(p) + '" name="' + esc(p) + '" '
              + 'placeholder="' + esc(label) + '" value="' + esc(val) + '" />'
              + '</div>';
      }
    });
  }
  html += '<button type="submit" id="execute-btn">Execute</button>'
        + '</form></div>';
  $contentMain.innerHTML = html;
  $responseArea.innerHTML = '';

  // Bind multi-input events
  document.querySelectorAll('.multi-input-wrap').forEach(function(wrap) {
    bindMultiInputEvents(wrap);
  });

  document.getElementById('method-form').addEventListener('submit', function(e) {
    e.preventDefault();
    executeMethod(pluginName, methodDef);
  });
}

function renderMultiRow(paramName, caption, index, value, total) {
  const removeBtn = total > 1
    ? '<button type="button" class="mi-remove" title="Remove">&times;</button>'
    : '<button type="button" class="mi-remove" style="visibility:hidden">&times;</button>';
  return '<div class="multi-input-row">'
    + '<input class="field-input mi-input" data-param="' + esc(paramName) + '" '
    + 'placeholder="' + esc(caption) + ' [' + index + ']" value="' + esc(value) + '" />'
    + removeBtn
    + '</div>';
}

function bindMultiInputEvents(wrap) {
  wrap.addEventListener('input', function(e) {
    if (!e.target.classList.contains('mi-input')) return;
    const rows = wrap.querySelectorAll('.multi-input-row');
    const lastRow = rows[rows.length - 1];
    const lastInput = lastRow.querySelector('.mi-input');
    // Auto-add row when typing in last input
    if (e.target === lastInput && lastInput.value !== '') {
      addMultiRow(wrap);
    }
  });
  wrap.addEventListener('click', function(e) {
    if (!e.target.classList.contains('mi-remove')) return;
    const row = e.target.closest('.multi-input-row');
    const rows = wrap.querySelectorAll('.multi-input-row');
    if (rows.length > 1) {
      row.remove();
      // Update visibility of remove buttons
      updateRemoveButtons(wrap);
      updatePlaceholders(wrap);
    }
  });
}

function addMultiRow(wrap) {
  const paramName = wrap.getAttribute('data-param');
  const caption = wrap.getAttribute('data-caption') || paramName;
  const rows = wrap.querySelectorAll('.multi-input-row');
  const idx = rows.length;
  const div = document.createElement('div');
  div.innerHTML = renderMultiRow(paramName, caption, idx, '', idx + 1);
  wrap.appendChild(div.firstElementChild);
  updateRemoveButtons(wrap);
  // Focus new input
  const newInput = wrap.querySelector('.multi-input-row:last-child .mi-input');
  if (newInput) newInput.focus();
}

function updateRemoveButtons(wrap) {
  const rows = wrap.querySelectorAll('.multi-input-row');
  rows.forEach(function(row, i) {
    const btn = row.querySelector('.mi-remove');
    btn.style.visibility = rows.length > 1 ? 'visible' : 'hidden';
  });
}

function updatePlaceholders(wrap) {
  const paramName = wrap.getAttribute('data-param');
  const caption = wrap.getAttribute('data-caption') || paramName;
  const rows = wrap.querySelectorAll('.multi-input-row');
  rows.forEach(function(row, i) {
    const input = row.querySelector('.mi-input');
    input.placeholder = caption + ' [' + i + ']';
  });
}

function renderNotFound() {
  $contentMain.innerHTML = '<div class="welcome-title">Not found</div>'
    + '<div class="welcome-sub">The requested plugin or method does not exist.</div>';
  $responseArea.innerHTML = '';
}

// ─── JSON syntax highlighting ────────────────────────────────────────────────
function syntaxHighlight(obj) {
  const json = JSON.stringify(obj, null, 2);
  // Tokenize and colorize
  return json.replace(
    /("(?:\\.|[^"\\])*")\s*(:)?|(\b\d+\.?\d*(?:[eE][+-]?\d+)?\b)|(\btrue\b|\bfalse\b)|(\bnull\b)|([{}\[\],])/g,
    function (match, str, colon, num, bool, nul, brace) {
      if (str) {
        if (colon) return '<span class="json-key">' + esc(str) + '</span>:';
        return '<span class="json-string">' + esc(str) + '</span>';
      }
      if (num)   return '<span class="json-number">' + esc(num) + '</span>';
      if (bool)  return '<span class="json-bool">'   + esc(bool) + '</span>';
      if (nul)   return '<span class="json-null">'   + esc(nul) + '</span>';
      if (brace) return '<span class="json-brace">'  + esc(brace) + '</span>';
      return esc(match);
    }
  );
}

function renderRequest(requestData) {
  return '<div class="response-label request-label">Request</div>'
       + '<div class="response-box request-box">' + esc(JSON.stringify(requestData)) + '</div>';
}

function renderResponse(data, elapsed, requestData) {
  $responseArea.innerHTML = (requestData ? renderRequest(requestData) : '')
    + '<div class="response-label">Response' + (elapsed != null ? '  (' + elapsed + ' ms)' : '') + '</div>'
    + '<div class="response-box">' + syntaxHighlight(data) + '</div>';
}

function renderError(err, requestData) {
  const msg = err && err.message ? err.message : String(err);
  const detail = err && err.payload ? '\n\n' + JSON.stringify(err.payload, null, 2) : '';
  $responseArea.innerHTML = (requestData ? renderRequest(requestData) : '')
    + '<div class="response-label" style="color:var(--red)">Error</div>'
    + '<div class="response-box response-error">' + esc(msg) + (detail ? '\n' + esc(detail) : '') + '</div>';
}

function renderLoading(requestData) {
  $responseArea.innerHTML = (requestData ? renderRequest(requestData) : '')
    + '<div class="response-label">Response</div>'
    + '<div class="response-box response-loading">Loading...</div>';
}

// ─── Execution ───────────────────────────────────────────────────────────────
function parseArgValue(raw) {
  // Try to parse as JSON (handles arrays, objects, numbers, booleans)
  try {
    const parsed = JSON.parse(raw);
    return parsed;
  } catch(e) {
    return raw; // fall back to plain string
  }
}

function executeMethod(pluginName, methodDef) {
  const params = methodDef.params || [];
  const argVals = params.map(function(p) {
    if (isArrayParam(p)) {
      // Collect all non-empty multi-input values into an array
      const wrap = document.querySelector('.multi-input-wrap[data-param="' + p + '"]');
      if (!wrap) return [];
      const inputs = wrap.querySelectorAll('.mi-input');
      const arr = [];
      inputs.forEach(function(inp) {
        if (inp.value.trim() !== '') arr.push(inp.value.trim());
      });
      return arr;
    }
    const el = document.getElementById('arg-' + p);
    return el ? parseArgValue(el.value) : null;
  });

  // Update hash with current arg values
  const argMap = {};
  params.forEach(function(p, i) {
    if (isArrayParam(p)) {
      if (Array.isArray(argVals[i]) && argVals[i].length > 0) {
        argMap[p] = JSON.stringify(argVals[i]);
      }
    } else {
      const el = document.getElementById('arg-' + p);
      if (el && el.value !== '') argMap[p] = el.value;
    }
  });
  // Update hash silently (replaceState to avoid double trigger)
  const newHash = buildHash(pluginName, methodDef.method, argMap);
  history.replaceState(null, '', newHash);

  // Configure viz library
  const node = getSelectedNode();
  if (typeof viz !== 'undefined') {
    viz.config.set('websocket', node);
    // Stop any existing transport so it reconnects to new node
    if (viz.api && viz.api.transport) {
      try { viz.api.stop(); } catch(e) {}
    }
  }

  // Build JSON-RPC request object (mirrors what the HTTP transport sends)
  const requestData = {
    jsonrpc: '2.0',
    method: 'call',
    params: [pluginName, methodDef.method, argVals],
    id: 1
  };
  renderLoading(requestData);

  const startTime = Date.now();
  viz.api.send(pluginName, { method: methodDef.method, params: argVals }, function(err, result) {
    const elapsed = Date.now() - startTime;
    if (err) {
      renderError(err, requestData);
    } else {
      renderResponse(result, elapsed, requestData);
    }
  });
}

// ─── Apply hash to UI ────────────────────────────────────────────────────────
function applyHash() {
  const { plugin, method, args, apiUrl } = parseHash();

  // If hash has an api param, switch to that node
  if (apiUrl) {
    const all = getAllNodes();
    if (all.includes(apiUrl)) {
      setSelectedNode(apiUrl);
    } else {
      // Custom node from hash — add it if not already present
      addCustomNode(apiUrl);
      setSelectedNode(apiUrl.replace(/\/+$/, ''));
    }
    renderNodeSelector();
  }

  if (!plugin) {
    renderSidebar(null, null);
    renderWelcome();
    return;
  }

  if (!plugins[plugin]) {
    renderSidebar(plugin, null);
    renderNotFound();
    return;
  }

  if (!method) {
    renderSidebar(plugin, null);
    renderPluginPage(plugin);
    return;
  }

  const methodDef = plugins[plugin].find(m => m.method === method);
  if (!methodDef) {
    renderSidebar(plugin, null);
    renderNotFound();
    return;
  }

  renderSidebar(plugin, method);
  renderMethodPage(plugin, methodDef, args);
}

// ─── Init ────────────────────────────────────────────────────────────────────
// Theme
const LS_THEME = 'viz_theme';
function getStoredTheme() { return localStorage.getItem(LS_THEME) || 'light'; }
function applyTheme(theme) {
  if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem(LS_THEME, theme);
  document.querySelectorAll('#theme-toggle a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('data-theme') === theme);
  });
}
applyTheme(getStoredTheme());
document.querySelectorAll('#theme-toggle a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    applyTheme(a.getAttribute('data-theme'));
  });
});

renderNodeSelector();
applyHash();
