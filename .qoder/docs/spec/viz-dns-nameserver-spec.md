# VIZ DNS Nameserver Specification

A simple tool for configuring A records and TXT (SSL) records in account metadata on the VIZ blockchain.

## Overview

VIZ DNS is a decentralized domain name system that stores NS records directly in the VIZ blockchain. This enables:
- **Decentralized DNS**: No reliance on traditional DNS providers
- **Self-signed SSL verification**: Certificate public key hashes stored on-chain for validation
- **Censorship resistance**: Domain records cannot be seized or modified by third parties
- **Account-based domains**: VIZ account names serve as domain names

## Data Format Specification

### JSON Metadata Structure

NS data is stored in the `json_metadata` field of a VIZ account using the following JSON format:

```json
{
  "ns": [
    ["A", "188.120.231.153"],
    ["TXT", "ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2"]
  ],
  "ttl": 28800
}
```

### Field Definitions

| Field | Type | Description |
|-------|------|-------------|
| `ns` | Array | Array of DNS record tuples |
| `ns[n][0]` | String | Record type: `"A"` or `"TXT"` |
| `ns[n][1]` | String | Record value (IPv4 address or TXT content) |
| `ttl` | Integer | Time-to-live in seconds (default: 28800 = 8 hours) |

### Supported Record Types

#### A Record
- **Purpose**: Maps domain to IPv4 address
- **Format**: `["A", "<IPv4_ADDRESS>"]`
- **Example**: `["A", "188.120.231.153"]`
- **Multiple A records**: Supported for Round Robin DNS

#### TXT Record (SSL)
- **Purpose**: Stores SHA256 hash of SSL certificate public key
- **Format**: `["TXT", "ssl=<SHA256_HASH>"]`
- **Example**: `["TXT", "ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2"]`
- **Max length**: 256 characters (per NS standard)

### Round Robin DNS Support

Multiple A records can be specified for load balancing:

```json
{
  "ns": [
    ["A", "188.120.231.153"],
    ["A", "192.168.1.100"],
    ["A", "10.0.0.50"],
    ["TXT", "ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2"]
  ],
  "ttl": 28800
}
```

---

## Blockchain Operations

### Operation: account_metadata

The `account_metadata` operation is used to set or update NS records in an account's metadata.

#### Operation Structure

```json
["account_metadata", {
  "account": "<ACCOUNT_NAME>",
  "json_metadata": "<ESCAPED_JSON_STRING>"
}]
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `account` | String | Yes | VIZ account name (also serves as domain name) |
| `json_metadata` | String | Yes | JSON-encoded metadata containing NS records |

#### Required Authority

- **Regular key** is sufficient to update account metadata

#### JavaScript Example (viz-js-lib)

```javascript
const viz = require('viz-js-lib');

// Set NS records using helpers
viz.api.getAccounts(['myaccount'], function(err, accounts) {
  if (!err && accounts.length > 0) {
    const account = accounts[0];

    // Create NS metadata
    const nsData = viz.dns.createNsMetadata({
      aRecords: ['188.120.231.153'],
      sslHash: '4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2',
      ttl: 28800
    });

    // Merge with existing metadata (preserves other fields like profile)
    const updatedMetadata = viz.dns.mergeNsMetadata(account.json_metadata, nsData);

    // Broadcast transaction
    viz.broadcast.accountMetadata(
      regularKey,
      'myaccount',
      JSON.stringify(updatedMetadata),
      function(err, result) {
        if (!err) {
          console.log('NS records updated successfully');
        }
      }
    );
  }
});
```

#### JavaScript Example (Manual - viz-world-js style)

```javascript
// Set NS records
gate.api.getAccount('myaccount', '', function(err, response) {
  if (!err) {
    let metadata = {};
    try {
      metadata = JSON.parse(response.json_metadata);
    } catch (e) {
      metadata = {};
    }

    // Remove existing NS data
    if (typeof metadata.ns !== 'undefined') delete metadata.ns;
    if (typeof metadata.ttl !== 'undefined') delete metadata.ttl;

    // Set new NS records
    metadata.ns = [];
    metadata.ns.push(['A', '188.120.231.153']);
    metadata.ns.push(['TXT', 'ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2']);
    metadata.ttl = 28800;

    // Broadcast transaction
    gate.broadcast.accountMetadata(
      users[current_user].regular_key,
      current_user,
      JSON.stringify(metadata),
      function(err, result) {
        if (!err) {
          console.log('NS records updated successfully');
        }
      }
    );
  }
});
```

#### PHP Example

```php
$tx = new Transaction($chain_id);

// Build operation
list($json, $raw) = $tx->build_account_metadata(
    'myaccount',
    addslashes(json_encode([
        'ns' => [
            ['A', '188.120.231.153'],
            ['TXT', 'ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2']
        ],
        'ttl' => 28800
    ]))
);

// Sign and broadcast
$signed = $tx->sign($regular_private_key, $ref_block_num, $ref_block_prefix, $expiration, $json, $raw);
$api->execute_method('broadcast_transaction', [$signed]);
```

### Operation: Remove NS Records

To remove NS records, update metadata without the `ns` and `ttl` fields:

```javascript
// Using viz-js-lib helpers
const cleanedMetadata = viz.dns.removeNsMetadata(account.json_metadata);
viz.broadcast.accountMetadata(
  regularKey,
  'myaccount',
  JSON.stringify(cleanedMetadata),
  callback
);
```

```javascript
// Manual approach
delete metadata.ns;
delete metadata.ttl;
gate.broadcast.accountMetadata(
  users[current_user].regular_key,
  current_user,
  JSON.stringify(metadata),
  callback
);
```

---

## API Reference

### Get Account NS Data

Use the `get_account` or `get_accounts` API methods to retrieve account metadata containing NS records.

#### Method: get_accounts

```json
{
  "jsonrpc": "2.0",
  "method": "call",
  "params": ["database_api", "get_accounts", [["account_name"]]],
  "id": 1
}
```

#### Response Example

```json
{
  "id": 1,
  "result": [{
    "name": "on1x",
    "json_metadata": "{\"ns\":[[\"A\",\"188.120.231.153\"],[\"TXT\",\"ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2\"]],\"ttl\":28800}",
    ...
  }]
}
```

#### Method: get_account (custom_protocol_api)

```json
{
  "jsonrpc": "2.0",
  "method": "call",
  "params": ["custom_protocol_api", "get_account", ["account_name", ""]],
  "id": 1
}
```

### Parse NS Data (JavaScript) - Using viz-js-lib Helpers

```javascript
const viz = require('viz-js-lib');

viz.api.getAccounts(['on1x'], function(err, accounts) {
  if (!err && accounts.length > 0) {
    const account = accounts[0];

    // Get complete NS summary in one call
    const summary = viz.dns.getNsSummary(account.json_metadata);

    console.log('IPv4 Addresses:', summary.aRecords);  // ['188.120.231.153']
    console.log('SSL Hash:', summary.sslHash);          // '4a4613daef37...'
    console.log('TTL:', summary.ttl);                   // 28800

    // Or extract individual components
    const ipAddresses = viz.dns.extractARecords(account.json_metadata);
    const sslHash = viz.dns.extractSslHash(account.json_metadata);
    const ttl = viz.dns.extractTtl(account.json_metadata);
  }
});
```

### Parse NS Data (JavaScript) - Manual Parsing

```javascript
gate.api.getAccount('on1x', '', function(err, response) {
  if (!err) {
    let metadata = {};
    try {
      metadata = JSON.parse(response.json_metadata);
    } catch (e) {
      metadata = {};
    }

    if (typeof metadata.ns !== 'undefined') {
      for (let i in metadata.ns) {
        if (metadata.ns[i][0] === 'A') {
          console.log('IPv4:', metadata.ns[i][1]);
        }
        if (metadata.ns[i][0] === 'TXT') {
          let txt_arr = metadata.ns[i][1].split('=');
          if (txt_arr[0] === 'ssl') {
            console.log('SSL Hash:', txt_arr[1]);
          }
        }
      }
    }

    if (typeof metadata.ttl !== 'undefined') {
      console.log('TTL:', metadata.ttl);
    }
  }
});
```

### Parse NS Data (PHP)

```php
$api = new JsonRPC($endpoint);
$accounts = $api->execute_method('get_accounts', [['on1x']]);

if ($accounts && count($accounts) > 0) {
    $metadata = json_decode($accounts[0]['json_metadata'], true);

    if (isset($metadata['ns'])) {
        foreach ($metadata['ns'] as $record) {
            if ($record[0] === 'A') {
                echo "IPv4: " . $record[1] . PHP_EOL;
            }
            if ($record[0] === 'TXT') {
                $txt = explode('=', $record[1]);
                if ($txt[0] === 'ssl') {
                    echo "SSL Hash: " . $txt[1] . PHP_EOL;
                }
            }
        }
    }

    if (isset($metadata['ttl'])) {
        echo "TTL: " . $metadata['ttl'] . PHP_EOL;
    }
}
```

---

## viz-js-lib DNS Helpers Module

The `viz-js-lib` library provides a dedicated `dns` module with helper functions for working with VIZ DNS NS records.

### Installation

```bash
npm install viz-js-lib
```

### Import

```javascript
const viz = require('viz-js-lib');
// Access via viz.dns.*
```

### Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `viz.dns.DEFAULT_TTL` | `28800` | Default TTL in seconds (8 hours) |
| `viz.dns.MAX_TXT_LENGTH` | `256` | Maximum TXT record length |
| `viz.dns.SHA256_HEX_LENGTH` | `64` | SHA256 hash length in hex characters |

### Validation Functions

#### `isValidIPv4(ipv4)`
Validates an IPv4 address string.

```javascript
viz.dns.isValidIPv4('188.120.231.153');  // true
viz.dns.isValidIPv4('256.0.0.1');        // false
viz.dns.isValidIPv4('invalid');          // false
```

#### `isValidSHA256Hash(hash)`
Validates a SHA256 hash string (64 hex characters).

```javascript
viz.dns.isValidSHA256Hash('4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2');  // true
viz.dns.isValidSHA256Hash('invalid');  // false
```

#### `isValidTTL(ttl)`
Validates a TTL value (must be positive integer).

```javascript
viz.dns.isValidTTL(28800);  // true
viz.dns.isValidTTL(-1);     // false
viz.dns.isValidTTL(1.5);    // false
```

#### `isValidSslTxtRecord(txt)`
Validates an SSL TXT record format (`ssl=<hash>`).

```javascript
viz.dns.isValidSslTxtRecord('ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2');  // true
viz.dns.isValidSslTxtRecord('ssl=invalid');  // false
```

#### `validateNsMetadata(nsData)`
Performs complete validation of NS metadata structure.

```javascript
const result = viz.dns.validateNsMetadata({
  ns: [['A', '188.120.231.153'], ['TXT', 'ssl=...']],
  ttl: 28800
});
console.log(result.isValid);  // true
console.log(result.errors);   // []
```

### Record Creation Functions

#### `createARecord(ipv4)`
Creates an A record tuple.

```javascript
viz.dns.createARecord('188.120.231.153');
// Returns: ['A', '188.120.231.153']
```

#### `createSslTxtRecord(hash)`
Creates an SSL TXT record tuple from a SHA256 hash.

```javascript
viz.dns.createSslTxtRecord('4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2');
// Returns: ['TXT', 'ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2']
```

#### `createTxtRecord(value)`
Creates a generic TXT record tuple.

```javascript
viz.dns.createTxtRecord('custom=value');
// Returns: ['TXT', 'custom=value']
```

#### `createNsMetadata(options)`
Creates a complete NS metadata object.

```javascript
const nsData = viz.dns.createNsMetadata({
  aRecords: ['188.120.231.153', '192.168.1.100'],
  sslHash: '4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2',
  ttl: 28800  // optional, defaults to 28800
});
// Returns:
// {
//   ns: [
//     ['A', '188.120.231.153'],
//     ['A', '192.168.1.100'],
//     ['TXT', 'ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2']
//   ],
//   ttl: 28800
// }
```

### Parsing Functions

#### `parseNsMetadata(jsonMetadata)`
Parses NS metadata from account `json_metadata` (string or object).

```javascript
const nsData = viz.dns.parseNsMetadata(account.json_metadata);
// Returns: { ns: [...], ttl: 28800 } or null if not found
```

#### `extractARecords(jsonMetadata)`
Extracts all IPv4 addresses from A records.

```javascript
const ips = viz.dns.extractARecords(account.json_metadata);
// Returns: ['188.120.231.153', '192.168.1.100']
```

#### `extractSslHash(jsonMetadata)`
Extracts the SSL certificate hash from TXT records.

```javascript
const hash = viz.dns.extractSslHash(account.json_metadata);
// Returns: '4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2' or null
```

#### `extractTxtRecords(jsonMetadata)`
Extracts all TXT record values.

```javascript
const txtRecords = viz.dns.extractTxtRecords(account.json_metadata);
// Returns: ['ssl=4a4613...', 'other=value']
```

#### `extractTtl(jsonMetadata)`
Extracts the TTL value (returns default if not set).

```javascript
const ttl = viz.dns.extractTtl(account.json_metadata);
// Returns: 28800
```

#### `getNsSummary(jsonMetadata)`
Returns a complete summary of all NS data.

```javascript
const summary = viz.dns.getNsSummary(account.json_metadata);
// Returns:
// {
//   aRecords: ['188.120.231.153'],
//   sslHash: '4a4613daef37...',
//   txtRecords: ['ssl=4a4613daef37...'],
//   ttl: 28800
// }
```

#### `hasNsRecords(jsonMetadata)`
Checks if NS records exist in the metadata.

```javascript
if (viz.dns.hasNsRecords(account.json_metadata)) {
  console.log('Account has NS records configured');
}
```

### Metadata Manipulation Functions

#### `mergeNsMetadata(existingMetadata, nsData)`
Merges NS data into existing account metadata (preserves other fields).

```javascript
const existingMetadata = { profile: { name: 'My Site' } };
const nsData = viz.dns.createNsMetadata({ aRecords: ['188.120.231.153'] });
const merged = viz.dns.mergeNsMetadata(existingMetadata, nsData);
// Returns:
// {
//   profile: { name: 'My Site' },
//   ns: [['A', '188.120.231.153']],
//   ttl: 28800
// }
```

#### `removeNsMetadata(existingMetadata)`
Removes NS data from metadata (preserves other fields).

```javascript
const cleaned = viz.dns.removeNsMetadata(account.json_metadata);
// Returns metadata without ns and ttl fields
```

#### `addARecord(jsonMetadata, ipv4)`
Adds an A record to existing metadata.

```javascript
const updated = viz.dns.addARecord(account.json_metadata, '192.168.1.100');
```

#### `removeARecord(jsonMetadata, ipv4)`
Removes a specific A record from metadata.

```javascript
const updated = viz.dns.removeARecord(account.json_metadata, '192.168.1.100');
```

#### `setSslHash(jsonMetadata, hash)`
Sets or updates the SSL hash (replaces existing if present).

```javascript
const updated = viz.dns.setSslHash(account.json_metadata, 'new_hash_here...');
```

#### `removeSslHash(jsonMetadata)`
Removes the SSL hash TXT record.

```javascript
const updated = viz.dns.removeSslHash(account.json_metadata);
```

#### `setTtl(jsonMetadata, ttl)`
Sets the TTL value.

```javascript
const updated = viz.dns.setTtl(account.json_metadata, 3600);  // 1 hour
```

### Complete Usage Examples

#### Setting NS Records with viz-js-lib

```javascript
const viz = require('viz-js-lib');

// Get current account metadata
viz.api.getAccounts(['myaccount'], function(err, accounts) {
  if (err) return console.error(err);

  const account = accounts[0];

  // Create NS data
  const nsData = viz.dns.createNsMetadata({
    aRecords: ['188.120.231.153'],
    sslHash: '4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2',
    ttl: 28800
  });

  // Merge with existing metadata
  const updatedMetadata = viz.dns.mergeNsMetadata(account.json_metadata, nsData);

  // Broadcast update
  viz.broadcast.accountMetadata(
    regularKey,
    'myaccount',
    JSON.stringify(updatedMetadata),
    function(err, result) {
      if (!err) {
        console.log('NS records updated successfully');
      }
    }
  );
});
```

#### Adding Round Robin A Records

```javascript
let metadata = viz.dns.addARecord(account.json_metadata, '188.120.231.153');
metadata = viz.dns.addARecord(metadata, '192.168.1.100');
metadata = viz.dns.addARecord(metadata, '10.0.0.50');
metadata = viz.dns.setSslHash(metadata, 'your_ssl_hash_here');

// Broadcast the update...
```

#### Removing NS Configuration

```javascript
const cleanedMetadata = viz.dns.removeNsMetadata(account.json_metadata);

viz.broadcast.accountMetadata(
  regularKey,
  'myaccount',
  JSON.stringify(cleanedMetadata),
  callback
);
```

#### Validating NS Configuration Before Broadcast

```javascript
const nsData = viz.dns.createNsMetadata({
  aRecords: ['188.120.231.153'],
  sslHash: 'your_hash_here'
});

const validation = viz.dns.validateNsMetadata(nsData);
if (!validation.isValid) {
  console.error('Invalid NS configuration:', validation.errors);
  return;
}

// Proceed with broadcast...
```

---

## SSL Certificate Verification

### Concept

VIZ DNS uses a self-signed certificate verification system where:
1. The **SHA256 hash of the public key** is stored in the TXT record
2. Clients connect to the server and extract the certificate's public key
3. The hash is compared to verify authenticity

This approach works with:
- Self-signed certificates
- Let's Encrypt certificates
- Any CA-signed certificates

### Generating SSL Hash

#### From Private Key (Server Side)

```bash
# Get public key hash from private key
openssl rsa -in /etc/letsencrypt/live/example.com/privkey.pem -pubout | sha256sum

# Output: 4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2
```

#### From Certificate (Server Side)

```bash
# Get public key hash from certificate chain
openssl x509 -in /etc/letsencrypt/live/example.com/fullchain.pem -pubkey -nocert | sha256sum
```

#### From Remote Server

```bash
# Get certificate info from remote server
echo | openssl s_client -servername example.com -connect 188.120.231.153:443 | \
  openssl x509 -noout -pubkey -dates

# Get just the public key hash
echo | openssl s_client -servername example.com -connect 188.120.231.153:443 2>/dev/null | \
  openssl x509 -pubkey -nocert | sha256sum
```

### PHP Implementation for SSL Verification

```php
/**
 * Extract SSL public key hash from a domain
 *
 * @param string $domain Domain name or IP address
 * @param string|null $ipv4 Optional IP address override
 * @return array ['error' => bool, 'result' => [ipv4, hash]]
 */
function get_ssl_hash($domain, $ipv4 = null) {
    // Resolve IP if not provided
    if ($ipv4 === null) {
        $ipv4 = gethostbyname($domain);
        if ($ipv4 === $domain) {
            return ['error' => 'dns_resolution_failed'];
        }
    }

    // Create SSL context
    $streamContext = stream_context_create([
        'ssl' => [
            'peer_name' => $domain,
            'verify_peer' => false,
            'verify_peer_name' => false,
            'capture_peer_cert' => true,
        ],
    ]);

    // Connect to server
    $client = stream_socket_client(
        'ssl://' . $ipv4 . ':443',
        $errorNumber,
        $errorDescription,
        3,
        STREAM_CLIENT_CONNECT,
        $streamContext
    );

    if ($errorNumber !== 0) {
        return ['error' => 'connection_failed: ' . $errorDescription];
    }

    $response = stream_context_get_params($client);

    // Extract public key and compute hash
    $public_key = openssl_pkey_get_public(
        $response['options']['ssl']['peer_certificate']
    );
    $public_key_data = openssl_pkey_get_details($public_key);

    // Hash the full PEM-encoded public key (including headers)
    $hash = hash('sha256', $public_key_data['key'], false);

    fclose($client);

    return ['error' => false, 'result' => [$ipv4, $hash]];
}
```

### Complete SSL Verification Process

```php
/**
 * Verify SSL certificate against VIZ blockchain records
 *
 * @param string $account VIZ account name (domain)
 * @param string $ipv4 Server IP address
 * @return bool True if certificate is valid
 */
function verify_viz_ssl($account, $ipv4) {
    global $api;

    // 1. Get account metadata from blockchain
    $accounts = $api->execute_method('get_accounts', [[$account]]);
    if (!$accounts || count($accounts) === 0) {
        return false;
    }

    $metadata = json_decode($accounts[0]['json_metadata'], true);
    if (!isset($metadata['ns'])) {
        return false;
    }

    // 2. Extract expected SSL hash from TXT record
    $expected_hash = null;
    foreach ($metadata['ns'] as $record) {
        if ($record[0] === 'TXT') {
            $txt = explode('=', $record[1]);
            if ($txt[0] === 'ssl') {
                $expected_hash = $txt[1];
                break;
            }
        }
    }

    if ($expected_hash === null) {
        return false;
    }

    // 3. Get actual SSL hash from server
    $ssl_result = get_ssl_hash($account, $ipv4);
    if ($ssl_result['error'] !== false) {
        return false;
    }

    $actual_hash = $ssl_result['result'][1];

    // 4. Compare hashes
    return hash_equals($expected_hash, $actual_hash);
}
```

---

## Building a VIZ DNS System

### Architecture Recommendations

#### 1. DNS Resolver Component

Build a custom DNS resolver that:
- Intercepts DNS queries for `.viz` domains (or custom TLD)
- Queries VIZ blockchain for account metadata
- Returns A records from the `ns` array
- Implements TTL caching based on the `ttl` field

```
Client Request → VIZ DNS Resolver → VIZ Blockchain
                        ↓
              Local DNS Cache (TTL-based)
                        ↓
                   DNS Response
```

#### 2. SSL/TLS Proxy

Implement a reverse proxy that:
- Terminates TLS connections
- Validates certificate public key hash against blockchain records
- Forwards requests to the actual server

#### 3. Web Server Configuration (nginx)

Configure nginx to serve multiple domains from the same server:

```nginx
server {
    listen 443 ssl;
    server_name example.com www.example.com example;  # Include VIZ domain name

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # ... rest of config
}

server {
    listen 80;
    server_name example.com www.example.com example;

    # Redirect to HTTPS
    return 301 https://$host$request_uri;
}
```

### Implementation Steps

#### Step 1: Register VIZ Account

The account name serves as the domain name:
- `on1x` → resolves to `on1x` domain
- `mysite` → resolves to `mysite` domain

#### Step 2: Configure Web Server

1. Generate or obtain SSL certificate
2. Configure nginx to accept connections for the VIZ domain name
3. Restart nginx: `service nginx restart`

#### Step 3: Calculate SSL Hash

```bash
# Calculate hash from your certificate
openssl x509 -in /etc/letsencrypt/live/yourdomain.com/fullchain.pem -pubkey -nocert | sha256sum
```

#### Step 4: Set NS Records on Blockchain

Use the VIZ.World Control Panel (`/tools/ns/`) or programmatically:

```javascript
// Via Control Panel UI or API
metadata.ns = [
    ['A', 'YOUR_SERVER_IP'],
    ['TXT', 'ssl=YOUR_CALCULATED_HASH']
];
metadata.ttl = 28800;
```

#### Step 5: Implement Client Verification

Clients should:
1. Query VIZ blockchain for account metadata
2. Extract IP from A record
3. Connect to server via HTTPS
4. Extract server's public key
5. Hash and compare with TXT record
6. If match, connection is trusted

### Security Considerations

1. **Hash Algorithm**: SHA256 is recommended for public key hashing
2. **TTL Management**: Use appropriate TTL values (28800 seconds = 8 hours is default)
3. **Certificate Rotation**: Update TXT record when certificates are renewed
4. **Multiple A Records**: Ensure all servers share the same certificate (for Round Robin)

### Verification Commands

```bash
# Verify certificate from server
echo | openssl s_client -servername on1x -connect 188.120.231.153:443 | \
  openssl x509 -noout -pubkey -dates

# Get certificate dates
openssl x509 -in /etc/letsencrypt/live/on1x.com/fullchain.pem -noout -startdate -enddate
# notBefore=Aug 26 11:17:39 2023 GMT
# notAfter=Nov 24 11:17:38 2023 GMT
```

---

## Existing Implementation Reference

### viz-js-lib DNS Module
- **JavaScript**: [src/dns.js](file:///d:/Work/viz-js-lib/src/dns.js) - DNS helpers module
- **Tests**: [test/dns.test.js](file:///d:/Work/viz-js-lib/test/dns.test.js) - Test suite
- **Export**: [src/index.js](file:///d:/Work/viz-js-lib/src/index.js) - Module export as `viz.dns`

### VIZ.World Control Panel

#### UI Component Location
- **PHP**: [module/tools.php](file:///d:/Work/viz.world/backup-16-11-2024/control.viz.world/module/tools.php#L25-L34) - `/tools/ns/` route
- **JavaScript**: [js/app.js](file:///d:/Work/viz.world/backup-16-11-2024/control.viz.world/js/app.js#L2072-L2249) - `ns_control()` function

#### AJAX Handler
- **PHP**: [module/ajax.php](file:///d:/Work/viz.world/backup-16-11-2024/control.viz.world/module/ajax.php#L4-L79) - `/ajax/ns/` endpoint

#### Transaction Builder
- **PHP**: [class/VIZ/Transaction.php](file:///d:/Work/viz.world/backup-16-11-2024/control.viz.world/class/VIZ/Transaction.php#L665-L675) - `build_account_metadata()` method

---

## Summary

| Component | Description |
|-----------|-------------|
| **Data Storage** | Account `json_metadata` field |
| **Record Types** | A (IPv4), TXT (SSL hash) |
| **Operation** | `account_metadata` |
| **Authority** | Regular key |
| **Hash Algorithm** | SHA256 of PEM-encoded public key |
| **Default TTL** | 28800 seconds (8 hours) |
| **JavaScript Library** | `viz-js-lib` - `viz.dns.*` module |

This system provides a decentralized, blockchain-based alternative to traditional DNS with built-in SSL certificate verification capabilities.
