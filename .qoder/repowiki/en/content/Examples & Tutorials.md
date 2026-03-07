# Examples & Tutorials

<cite>
**Referenced Files in This Document**
- [README.md](file://README.md)
- [package.json](file://package.json)
- [src/index.js](file://src/index.js)
- [src/api/index.js](file://src/api/index.js)
- [src/api/methods.js](file://src/api/methods.js)
- [src/api/transports/index.js](file://src/api/transports/index.js)
- [src/api/transports/http.js](file://src/api/transports/http.js)
- [src/api/transports/ws.js](file://src/api/transports/ws.js)
- [src/broadcast/index.js](file://src/broadcast/index.js)
- [src/broadcast/operations.js](file://src/broadcast/operations.js)
- [src/auth/index.js](file://src/auth/index.js)
- [src/formatter.js](file://src/formatter.js)
- [src/utils.js](file://src/utils.js)
- [src/config.js](file://src/config.js)
- [examples/index.html](file://examples/index.html)
- [examples/stream.html](file://examples/stream.html)
- [examples/broadcast.html](file://examples/broadcast.html)
- [examples/server.js](file://examples/server.js)
- [examples/test-vote.js](file://examples/test-vote.js)
- [examples/get-post-content.js](file://examples/get-post-content.js)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Dependency Analysis](#dependency-analysis)
7. [Performance Considerations](#performance-considerations)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Conclusion](#conclusion)
10. [Appendices](#appendices)

## Introduction
This document provides practical, step-by-step examples and tutorials for the VIZ JavaScript library. It covers browser-based and Node.js usage, common scenarios such as account management, voting operations, content creation, and real-time streaming. You will learn how to set up the library, configure transports, integrate with the VIZ blockchain APIs, sign and broadcast transactions, and handle errors. Production best practices, performance tips, and troubleshooting guidance are included.

## Project Structure
The VIZ JavaScript library exposes a modular API with clear separation of concerns:
- API client: Provides methods to query blockchain state and subscribe to streams.
- Authentication: Handles key derivation, WIF conversion, and transaction signing.
- Broadcasting: Prepares, signs, and broadcasts transactions via configured transport.
- Formatter: Offers helpers for amounts, permlinks, and account valuation.
- Utilities: Includes validation, custom protocol helpers, and convenience functions.
- Transports: HTTP and WebSocket transports for API communication.
- Config: Centralized configuration for endpoints and chain parameters.

```mermaid
graph TB
subgraph "Browser"
EX_HTML["examples/index.html"]
EX_STREAM["examples/stream.html"]
EX_BROADCAST["examples/broadcast.html"]
end
subgraph "Node.js"
EX_SERVER["examples/server.js"]
EX_VOTE["examples/test-vote.js"]
EX_POST["examples/get-post-content.js"]
end
LIB_INDEX["src/index.js"]
API["src/api/index.js"]
AUTH["src/auth/index.js"]
BROADCAST["src/broadcast/index.js"]
FORMATTER["src/formatter.js"]
UTILS["src/utils.js"]
CONFIG["src/config.js"]
TRANS_HTTP["src/api/transports/http.js"]
TRANS_WS["src/api/transports/ws.js"]
EX_HTML --> LIB_INDEX
EX_STREAM --> LIB_INDEX
EX_BROADCAST --> LIB_INDEX
EX_SERVER --> LIB_INDEX
EX_VOTE --> LIB_INDEX
EX_POST --> LIB_INDEX
LIB_INDEX --> API
LIB_INDEX --> AUTH
LIB_INDEX --> BROADCAST
LIB_INDEX --> FORMATTER
LIB_INDEX --> UTILS
LIB_INDEX --> CONFIG
API --> TRANS_HTTP
API --> TRANS_WS
```

**Diagram sources**
- [src/index.js](file://src/index.js#L1-L20)
- [src/api/index.js](file://src/api/index.js#L1-L271)
- [src/api/transports/index.js](file://src/api/transports/index.js#L1-L8)
- [src/api/transports/http.js](file://src/api/transports/http.js)
- [src/api/transports/ws.js](file://src/api/transports/ws.js)
- [src/auth/index.js](file://src/auth/index.js#L1-L133)
- [src/broadcast/index.js](file://src/broadcast/index.js#L1-L137)
- [src/formatter.js](file://src/formatter.js#L1-L87)
- [src/utils.js](file://src/utils.js#L1-L348)
- [src/config.js](file://src/config.js#L1-L10)
- [examples/index.html](file://examples/index.html#L1-L23)
- [examples/stream.html](file://examples/stream.html#L1-L19)
- [examples/broadcast.html](file://examples/broadcast.html#L1-L108)
- [examples/server.js](file://examples/server.js#L1-L34)
- [examples/test-vote.js](file://examples/test-vote.js#L1-L19)
- [examples/get-post-content.js](file://examples/get-post-content.js#L1-L5)

**Section sources**
- [README.md](file://README.md#L1-L81)
- [package.json](file://package.json#L1-L84)
- [src/index.js](file://src/index.js#L1-L20)

## Core Components
- API client: Exposes generated methods from the method catalog and supports streaming operations, blocks, and transactions.
- Authentication: Derives keys from usernames and passwords, validates WIF, converts to public keys, and signs transactions.
- Broadcasting: Prepares transactions with chain metadata, signs with private keys, and broadcasts via configured transport.
- Formatter: Provides helpers for permlink generation, amount formatting, and account value estimation.
- Utilities: Account name validation, custom protocol helpers (voice*), and AES-based encoding utilities.
- Transports: HTTP and WebSocket transports selected dynamically based on configuration.
- Config: Global getter/setter for transport URLs and chain parameters.

**Section sources**
- [src/api/index.js](file://src/api/index.js#L1-L271)
- [src/api/methods.js](file://src/api/methods.js#L1-L435)
- [src/auth/index.js](file://src/auth/index.js#L1-L133)
- [src/broadcast/index.js](file://src/broadcast/index.js#L1-L137)
- [src/formatter.js](file://src/formatter.js#L1-L87)
- [src/utils.js](file://src/utils.js#L1-L348)
- [src/api/transports/index.js](file://src/api/transports/index.js#L1-L8)
- [src/config.js](file://src/config.js#L1-L10)

## Architecture Overview
The library composes a singleton API client that dynamically selects an HTTP or WebSocket transport based on configuration. Methods are generated from a method catalog and exposed on the API client. Broadcasting wraps transaction preparation, signing, and broadcasting through the API.

```mermaid
classDiagram
class VIZ {
+constructor(options)
+start()
+stop()
+send(api, data, callback)
+streamOperations(mode, callback)
+streamTransactions(mode, callback)
+streamBlock(mode, callback)
+streamBlockNumber(mode, callback)
}
class Broadcaster {
+send(tx, privKeys, callback)
+_prepareTransaction(tx)
+voteWith(...)
+contentWith(...)
+customJsonWith(...)
}
class Auth {
+toWif(name, password, role)
+wifToPublic(wif)
+signTransaction(trx, keys, debug)
+generateKeys(name, password, roles)
}
class Formatter {
+contentPermlink(parentAuthor, parentPermlink)
+amount(amount, asset)
+estimateAccountValue(account, opts)
}
class Utils {
+camelCase(str)
+validateAccountName(value)
+voiceText(...)
+voiceEncodedText(...)
+voicePublication(...)
}
VIZ --> "uses" Formatter : "format helpers"
Broadcaster --> Auth : "signing"
Broadcaster --> VIZ : "broadcast API"
Utils --> Formatter : "uses"
```

**Diagram sources**
- [src/api/index.js](file://src/api/index.js#L21-L236)
- [src/broadcast/index.js](file://src/broadcast/index.js#L16-L137)
- [src/auth/index.js](file://src/auth/index.js#L13-L133)
- [src/formatter.js](file://src/formatter.js#L4-L87)
- [src/utils.js](file://src/utils.js#L3-L47)

## Detailed Component Analysis

### Browser Setup and Basic Queries
- Load the built library from the distribution folder.
- Configure the WebSocket endpoint via configuration.
- Call API methods to fetch configuration, accounts, and counts.

```mermaid
sequenceDiagram
participant HTML as "examples/index.html"
participant VIZ as "viz (src/index.js)"
participant API as "API (src/api/index.js)"
participant CFG as "Config (src/config.js)"
HTML->>CFG : set("websocket", url)
HTML->>API : getConfig(callback)
API-->>HTML : {config}
HTML->>API : getAccounts(names, callback)
API-->>HTML : [{account}]
HTML->>API : getAccountCount(callback)
API-->>HTML : {count}
```

**Diagram sources**
- [examples/index.html](file://examples/index.html#L9-L20)
- [src/index.js](file://src/index.js#L1-L20)
- [src/api/index.js](file://src/api/index.js#L52-L62)
- [src/config.js](file://src/config.js#L5-L8)

**Section sources**
- [examples/index.html](file://examples/index.html#L1-L23)
- [README.md](file://README.md#L16-L25)

### Real-Time Streaming in the Browser
- Use the streaming API to receive live operations.
- The API internally manages transport selection and event emission.

```mermaid
sequenceDiagram
participant HTML as "examples/stream.html"
participant API as "API (src/api/index.js)"
participant WS as "WebSocket Transport"
HTML->>API : streamOperations(handler)
API->>WS : connect
WS-->>API : message(op)
API-->>HTML : handler(err, op)
```

**Diagram sources**
- [examples/stream.html](file://examples/stream.html#L10-L15)
- [src/api/index.js](file://src/api/index.js#L216-L235)
- [src/api/transports/ws.js](file://src/api/transports/ws.js)

**Section sources**
- [examples/stream.html](file://examples/stream.html#L1-L19)
- [src/api/index.js](file://src/api/index.js#L121-L191)

### Voting Operations (Node.js)
- Derive a posting key from username and password.
- Broadcast a vote operation with the derived key.

```mermaid
sequenceDiagram
participant JS as "examples/test-vote.js"
participant AUTH as "Auth (src/auth/index.js)"
participant BROAD as "Broadcaster (src/broadcast/index.js)"
participant API as "API (src/api/index.js)"
JS->>AUTH : toWif(username, password, "posting")
AUTH-->>JS : wif
JS->>BROAD : upvote(wif, voter, author, permlink, weight, callback)
BROAD->>BROAD : _prepareTransaction(tx)
BROAD->>AUTH : signTransaction(trx, keys)
AUTH-->>BROAD : signedTrx
BROAD->>API : broadcastTransactionWithCallbackAsync(...)
API-->>BROAD : result
BROAD-->>JS : callback(err, result)
```

**Diagram sources**
- [examples/test-vote.js](file://examples/test-vote.js#L1-L19)
- [src/auth/index.js](file://src/auth/index.js#L81-L101)
- [src/broadcast/index.js](file://src/broadcast/index.js#L24-L47)
- [src/api/index.js](file://src/api/index.js#L34-L42)

**Section sources**
- [examples/test-vote.js](file://examples/test-vote.js#L1-L19)
- [README.md](file://README.md#L55-L64)

### Content Creation and Broadcasting (Browser)
- Demonstrate broadcasting a vote, a comment (content), a post, and follow/unfollow via custom_json.

```mermaid
sequenceDiagram
participant HTML as "examples/broadcast.html"
participant BROAD as "Broadcaster (src/broadcast/index.js)"
participant API as "API (src/api/index.js)"
HTML->>BROAD : vote(wif, voter, author, permlink, weight, callback)
HTML->>BROAD : content(wif, parent_author, parent_permlink, author, permlink, title, body, metadata, callback)
HTML->>BROAD : content(wif, "", main_tag, author, permlink, title, body, metadata, callback)
HTML->>BROAD : customJson(wif, required_auths, required_posting_auths, id, json, callback)
BROAD->>API : broadcastTransactionWithCallbackAsync(...)
API-->>BROAD : result
BROAD-->>HTML : callback(err, result)
```

**Diagram sources**
- [examples/broadcast.html](file://examples/broadcast.html#L15-L103)
- [src/broadcast/index.js](file://src/broadcast/index.js#L97-L129)
- [src/api/index.js](file://src/api/index.js#L40-L46)

**Section sources**
- [examples/broadcast.html](file://examples/broadcast.html#L1-L108)

### Node.js Server Usage
- Use the library in a Node.js script to query account data, state, followers, following, and stream operations.

```mermaid
sequenceDiagram
participant SERVER as "examples/server.js"
participant API as "API (src/api/index.js)"
SERVER->>API : getAccountCount(callback)
API-->>SERVER : count
SERVER->>API : getAccounts([name], callback)
API-->>SERVER : accounts
SERVER->>API : getState(path, callback)
API-->>SERVER : state
SERVER->>API : getFollowing(follower, 0, type, limit, callback)
API-->>SERVER : following
SERVER->>API : getFollowers(following, 0, type, limit, callback)
API-->>SERVER : followers
SERVER->>API : streamOperations(handler)
API-->>SERVER : handler(err, op)
```

**Diagram sources**
- [examples/server.js](file://examples/server.js#L3-L33)
- [src/api/index.js](file://src/api/index.js#L216-L235)

**Section sources**
- [examples/server.js](file://examples/server.js#L1-L34)

### Getting Post Content (Node.js)
- Fetch a single post’s content using an async method.

```mermaid
flowchart TD
Start(["Start"]) --> Require["Require library"]
Require --> Call["Call getContentAsync(author, permlink)"]
Call --> Then["Handle result promise"]
Then --> Log["Log result"]
Log --> End(["End"])
```

**Diagram sources**
- [examples/get-post-content.js](file://examples/get-post-content.js#L1-L5)

**Section sources**
- [examples/get-post-content.js](file://examples/get-post-content.js#L1-L5)

### Authentication and Transaction Signing
- Convert credentials to WIF, derive public keys, and sign transactions with chain-specific signing.

```mermaid
flowchart TD
A["Username + Password + Role"] --> B["Derive Seed"]
B --> C["Hash Seed -> Private Scalar"]
C --> D["Multiply by Generator -> Public Point"]
D --> E["Encode Public Key"]
E --> F["WIF Encoding"]
F --> G["Use WIF for Signing"]
G --> H["Sign Buffer with Chain ID"]
```

**Diagram sources**
- [src/auth/index.js](file://src/auth/index.js#L34-L101)

**Section sources**
- [src/auth/index.js](file://src/auth/index.js#L1-L133)

### Formatting Helpers
- Generate permlinks, format amounts, and estimate account value.

```mermaid
flowchart TD
Start(["Start"]) --> Permlink["contentPermlink(parentAuthor, parentPermlink)"]
Permlink --> Amount["amount(value, asset)"]
Amount --> Estimate["estimateAccountValue(account, {gprops, vestingViz})"]
Estimate --> End(["End"])
```

**Diagram sources**
- [src/formatter.js](file://src/formatter.js#L69-L84)

**Section sources**
- [src/formatter.js](file://src/formatter.js#L1-L87)

### Utilities and Validation
- Validate account names, and use voice* helpers for custom protocols.

```mermaid
flowchart TD
Start(["Start"]) --> Validate["validateAccountName(value)"]
Validate --> VoiceText["voiceText(...)"]
Validate --> VoiceEnc["voiceEncodedText(...)"]
Validate --> VoicePub["voicePublication(...)"]
Validate --> VoiceEncPub["voiceEncodedPublication(...)"]
VoiceText --> End(["End"])
VoiceEnc --> End
VoicePub --> End
VoiceEncPub --> End
```

**Diagram sources**
- [src/utils.js](file://src/utils.js#L10-L47)
- [src/utils.js](file://src/utils.js#L84-L206)
- [src/utils.js](file://src/utils.js#L208-L348)

**Section sources**
- [src/utils.js](file://src/utils.js#L1-L348)

## Dependency Analysis
The library exports a central index that aggregates API, auth, broadcast, formatter, memo, AES, config, and utils. The API client depends on transports and configuration. Broadcasting depends on auth and API for signing and broadcasting.

```mermaid
graph LR
IDX["src/index.js"] --> API["src/api/index.js"]
IDX --> AUTH["src/auth/index.js"]
IDX --> BROAD["src/broadcast/index.js"]
IDX --> FMTR["src/formatter.js"]
IDX --> UTL["src/utils.js"]
IDX --> CFG["src/config.js"]
API --> TRIDX["src/api/transports/index.js"]
API --> CFG
BROAD --> AUTH
BROAD --> API
```

**Diagram sources**
- [src/index.js](file://src/index.js#L1-L20)
- [src/api/index.js](file://src/api/index.js#L1-L271)
- [src/api/transports/index.js](file://src/api/transports/index.js#L1-L8)
- [src/auth/index.js](file://src/auth/index.js#L1-L133)
- [src/broadcast/index.js](file://src/broadcast/index.js#L1-L137)
- [src/formatter.js](file://src/formatter.js#L1-L87)
- [src/utils.js](file://src/utils.js#L1-L348)
- [src/config.js](file://src/config.js#L1-L10)

**Section sources**
- [src/index.js](file://src/index.js#L1-L20)
- [src/api/index.js](file://src/api/index.js#L1-L271)
- [src/api/transports/index.js](file://src/api/transports/index.js#L1-L8)
- [src/auth/index.js](file://src/auth/index.js#L1-L133)
- [src/broadcast/index.js](file://src/broadcast/index.js#L1-L137)
- [src/formatter.js](file://src/formatter.js#L1-L87)
- [src/utils.js](file://src/utils.js#L1-L348)
- [src/config.js](file://src/config.js#L1-L10)

## Performance Considerations
- Prefer WebSocket transport for real-time streaming to reduce latency and overhead compared to polling.
- Batch requests where possible and avoid frequent repeated queries for the same data.
- Use streaming APIs (blocks, transactions, operations) to react to updates efficiently.
- Cache frequently accessed configuration and chain properties locally to minimize round trips.
- Minimize transaction signing overhead by preparing transactions off-band and signing only once.
- Monitor performance metrics emitted by the API client to identify slow endpoints or methods.

[No sources needed since this section provides general guidance]

## Troubleshooting Guide
- Unknown transport URL: Ensure the configured URL matches ws/wss or http/https; otherwise, an error is thrown during transport selection.
- Authentication failures: Verify the derived WIF is valid and corresponds to the account’s posting authority.
- Broadcasting errors: Inspect the error payload attached to the thrown error object for detailed information.
- Network connectivity: Confirm the configured endpoint is reachable and supports the chosen transport.
- Rate limiting: Reduce request frequency and leverage streaming for continuous updates.

**Section sources**
- [src/api/index.js](file://src/api/index.js#L34-L42)
- [src/api/index.js](file://src/api/index.js#L77-L96)
- [README.md](file://README.md#L47-L53)

## Conclusion
This guide demonstrated how to use the VIZ JavaScript library for browser and Node.js environments. You learned how to configure transports, query blockchain data, stream live operations, and broadcast transactions securely. By following the examples and best practices outlined here, you can build robust applications that interact with the VIZ blockchain effectively.

[No sources needed since this section summarizes without analyzing specific files]

## Appendices

### Quick Setup Checklist
- Install the library via npm.
- Choose a transport URL (WebSocket or HTTP) and set it in configuration.
- For Node.js, load the library from the built distribution or lib folder.
- For browsers, include the built script from the distribution folder.

**Section sources**
- [README.md](file://README.md#L11-L14)
- [README.md](file://README.md#L47-L53)
- [package.json](file://package.json#L9-L11)

### API Method Catalog Reference
- The API client generates methods from a centralized catalog. Each entry defines the API namespace, method name, and parameter names. Use the generated methods on the API client to call the blockchain.

**Section sources**
- [src/api/methods.js](file://src/api/methods.js#L1-L435)
- [src/api/index.js](file://src/api/index.js#L238-L262)