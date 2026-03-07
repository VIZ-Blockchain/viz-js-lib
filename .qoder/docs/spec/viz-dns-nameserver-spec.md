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

#### JavaScript Example (viz-world-js)

```javascript
// Set NS records
gate.api.getAccount('myaccount', '', function(err, response) {
  if (!err) {
    let metadata = {};
    try {
      metadata = JSON.parse(response.json_metadata);
    } catch {
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
// Remove NS records
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

### Parse NS Data (JavaScript)

```javascript
gate.api.getAccount('on1x', '', function(err, response) {
  if (!err) {
    let metadata = {};
    try {
      metadata = JSON.parse(response.json_metadata);
    } catch {
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

### UI Component Location
- **PHP**: [module/tools.php](file:///d:/Work/viz.world/backup-16-11-2024/control.viz.world/module/tools.php#L25-L34) - `/tools/ns/` route
- **JavaScript**: [js/app.js](file:///d:/Work/viz.world/backup-16-11-2024/control.viz.world/js/app.js#L2072-L2249) - `ns_control()` function

### AJAX Handler
- **PHP**: [module/ajax.php](file:///d:/Work/viz.world/backup-16-11-2024/control.viz.world/module/ajax.php#L4-L79) - `/ajax/ns/` endpoint

### Transaction Builder
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

This system provides a decentralized, blockchain-based alternative to traditional DNS with built-in SSL certificate verification capabilities.
