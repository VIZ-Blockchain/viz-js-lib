# Broadcast Transactions

<cite>
**Referenced Files in This Document**
- [src/broadcast/index.js](file://src/broadcast/index.js)
- [src/broadcast/operations.js](file://src/broadcast/operations.js)
- [src/broadcast/helpers.js](file://src/broadcast/helpers.js)
- [src/auth/index.js](file://src/auth/index.js)
- [src/auth/serializer/src/operations.js](file://src/auth/serializer/src/operations.js)
- [src/auth/serializer/src/types.js](file://src/auth/serializer/src/types.js)
- [src/api/methods.js](file://src/api/methods.js)
- [src/api/transports/ws.js](file://src/api/transports/ws.js)
- [src/api/transports/base.js](file://src/api/transports/base.js)
- [src/formatter.js](file://src/formatter.js)
- [src/config.js](file://src/config.js)
- [config.json](file://config.json)
- [examples/broadcast.html](file://examples/broadcast.html)
- [test/broadcast.test.js](file://test/broadcast.test.js)
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
This document explains the transaction broadcasting functionality in the VIZ JavaScript library. It covers the broadcast system architecture, operation construction, transaction signing, and network submission. It documents supported operation types (including transfers, votes, comments, and custom JSON), transaction building blocks, fee calculation, expiration handling, and broadcast verification. Practical examples, error handling strategies, debugging techniques, batch operations, transaction simulation, and integration with the authentication system are included.

## Project Structure
The broadcast subsystem is composed of:
- Broadcast orchestrator that prepares, signs, and submits transactions
- Operation registry enumerating supported operations and their parameters
- Authentication module handling cryptographic signing
- API transport layer for network communication
- Formatter utilities for common tasks like permlink generation
- Configuration for chain ID, address prefix, and broadcast mode

```mermaid
graph TB
subgraph "Broadcast Layer"
BIDX["src/broadcast/index.js"]
BOPS["src/broadcast/operations.js"]
BHELP["src/broadcast/helpers.js"]
end
subgraph "Auth & Serialization"
AIDX["src/auth/index.js"]
OPSER["src/auth/serializer/src/operations.js"]
TYP["src/auth/serializer/src/types.js"]
end
subgraph "API & Transport"
AMETH["src/api/methods.js"]
WS["src/api/transports/ws.js"]
BASE["src/api/transports/base.js"]
end
subgraph "Utilities"
FMT["src/formatter.js"]
CFG["src/config.js"]
CJSON["config.json"]
end
BIDX --> AIDX
BIDX --> AMETH
BIDX --> FMT
BIDX --> CFG
AIDX --> OPSER
AIDX --> TYP
AMETH --> WS
WS --> BASE
CFG --> CJSON
BOPS --> BIDX
BHELP --> BIDX
```

**Diagram sources**
- [src/broadcast/index.js](file://src/broadcast/index.js#L1-L137)
- [src/broadcast/operations.js](file://src/broadcast/operations.js#L1-L475)
- [src/broadcast/helpers.js](file://src/broadcast/helpers.js#L1-L82)
- [src/auth/index.js](file://src/auth/index.js#L1-L133)
- [src/auth/serializer/src/operations.js](file://src/auth/serializer/src/operations.js#L73-L125)
- [src/auth/serializer/src/types.js](file://src/auth/serializer/src/types.js#L30-L69)
- [src/api/methods.js](file://src/api/methods.js#L356-L374)
- [src/api/transports/ws.js](file://src/api/transports/ws.js#L1-L136)
- [src/api/transports/base.js](file://src/api/transports/base.js#L1-L34)
- [src/formatter.js](file://src/formatter.js#L69-L76)
- [src/config.js](file://src/config.js#L1-L10)
- [config.json](file://config.json#L1-L7)

**Section sources**
- [src/broadcast/index.js](file://src/broadcast/index.js#L1-L137)
- [src/broadcast/operations.js](file://src/broadcast/operations.js#L1-L475)
- [src/broadcast/helpers.js](file://src/broadcast/helpers.js#L1-L82)
- [src/auth/index.js](file://src/auth/index.js#L1-L133)
- [src/auth/serializer/src/operations.js](file://src/auth/serializer/src/operations.js#L73-L125)
- [src/auth/serializer/src/types.js](file://src/auth/serializer/src/types.js#L30-L69)
- [src/api/methods.js](file://src/api/methods.js#L356-L374)
- [src/api/transports/ws.js](file://src/api/transports/ws.js#L1-L136)
- [src/api/transports/base.js](file://src/api/transports/base.js#L1-L34)
- [src/formatter.js](file://src/formatter.js#L69-L76)
- [src/config.js](file://src/config.js#L1-L10)
- [config.json](file://config.json#L1-L7)

## Core Components
- Broadcaster: Orchestrates transaction preparation, signing, and submission. It fetches dynamic global properties, sets reference block and expiration, signs with private keys, and broadcasts via network broadcast API.
- Operations registry: Declares supported operations, parameter lists, and required roles for each operation.
- Authentication: Provides signing functions, key derivation, and WIF utilities.
- API methods: Exposes network broadcast APIs and other endpoints used by the broadcaster.
- Transport: WebSocket transport for API communication with connection lifecycle and error handling.
- Formatter: Utility functions for common tasks such as generating permlinks for comments.
- Config: Centralized configuration including chain ID, address prefix, and broadcast mode.

**Section sources**
- [src/broadcast/index.js](file://src/broadcast/index.js#L24-L84)
- [src/broadcast/operations.js](file://src/broadcast/operations.js#L1-L475)
- [src/auth/index.js](file://src/auth/index.js#L107-L130)
- [src/api/methods.js](file://src/api/methods.js#L356-L374)
- [src/api/transports/ws.js](file://src/api/transports/ws.js#L27-L94)
- [src/formatter.js](file://src/formatter.js#L69-L76)
- [src/config.js](file://src/config.js#L1-L10)
- [config.json](file://config.json#L1-L7)

## Architecture Overview
End-to-end flow for broadcasting a transaction:
1. Prepare transaction: Fetch dynamic global properties, compute reference block and expiration.
2. Sign transaction: Compute chain ID concatenated with serialized transaction buffer; sign with provided private keys.
3. Submit transaction: Choose broadcast method based on configuration; submit to network broadcast API.

```mermaid
sequenceDiagram
participant App as "Application"
participant Br as "Broadcaster"
participant API as "Network Broadcast API"
participant Auth as "Auth.signTransaction"
App->>Br : "send(tx, privKeys, callback)"
Br->>API : "getDynamicGlobalPropertiesAsync()"
API-->>Br : "dynamic properties"
Br->>Br : "_prepareTransaction(tx)<br/>set ref_block_num/prefix<br/>set expiration"
Br->>Auth : "signTransaction(transaction, privKeys)"
Auth-->>Br : "signed_transaction"
Br->>API : "broadcastTransactionWithCallbackAsync / broadcastTransactionAsync"
API-->>Br : "result"
Br-->>App : "signed transaction"
```

**Diagram sources**
- [src/broadcast/index.js](file://src/broadcast/index.js#L24-L47)
- [src/broadcast/index.js](file://src/broadcast/index.js#L49-L84)
- [src/auth/index.js](file://src/auth/index.js#L107-L130)
- [src/api/methods.js](file://src/api/methods.js#L356-L374)

## Detailed Component Analysis

### Transaction Preparation and Submission
- Dynamic properties: Retrieves chain time and last irreversible block reference to compute expiration and reference fields.
- Reference block selection: Uses last irreversible block if available; otherwise derives from head block number and block header.
- Expiration: Adds a fixed offset to chain time to ensure reasonable validity window.
- Broadcasting modes: Supports synchronous and callback-based broadcast depending on configuration.

```mermaid
flowchart TD
Start(["Prepare Transaction"]) --> GetProps["getDynamicGlobalPropertiesAsync()"]
GetProps --> HasLIB{"Has LIB info?"}
HasLIB --> |Yes| UseLIB["Set ref_block_num/prefix from LIB<br/>Compute expiration"]
HasLIB --> |No| HeadBlk["Compute ref_block_num from head block<br/>Fetch block header"]
HeadBlk --> SetRef["Set ref_block_num/prefix from block header<br/>Compute expiration"]
UseLIB --> BuildTx["Merge defaults into tx"]
SetRef --> BuildTx
BuildTx --> Sign["Auth.signTransaction()"]
Sign --> Mode{"Broadcast with callback?"}
Mode --> |Yes| BCastCB["broadcastTransactionWithCallbackAsync()"]
Mode --> |No| BCast["broadcastTransactionAsync()"]
BCastCB --> Done(["Return signed transaction"])
BCast --> Done
```

**Diagram sources**
- [src/broadcast/index.js](file://src/broadcast/index.js#L49-L84)
- [src/auth/index.js](file://src/auth/index.js#L107-L130)
- [src/api/methods.js](file://src/api/methods.js#L356-L374)

**Section sources**
- [src/broadcast/index.js](file://src/broadcast/index.js#L49-L84)
- [src/config.js](file://src/config.js#L1-L10)
- [config.json](file://config.json#L5-L6)

### Operation Construction and Generation
- Operation registry defines supported operations, parameter names, and required roles.
- Broadcaster dynamically generates convenience methods for each operation, mapping parameters to operation objects.
- Specialized helpers handle metadata serialization and permlink generation for comments.

```mermaid
classDiagram
class OperationsRegistry {
+operation
+params
+roles
}
class Broadcaster {
+send(tx, privKeys, callback)
+_prepareTransaction(tx)
+voteWith()
+contentWith()
+transferWith()
+customWith()
}
class Formatter {
+contentPermlink(parentAuthor, parentPermlink)
}
OperationsRegistry --> Broadcaster : "drives generation"
Broadcaster --> Formatter : "uses for permlink"
```

**Diagram sources**
- [src/broadcast/operations.js](file://src/broadcast/operations.js#L1-L475)
- [src/broadcast/index.js](file://src/broadcast/index.js#L89-L129)
- [src/formatter.js](file://src/formatter.js#L69-L76)

**Section sources**
- [src/broadcast/operations.js](file://src/broadcast/operations.js#L1-L475)
- [src/broadcast/index.js](file://src/broadcast/index.js#L89-L129)
- [src/formatter.js](file://src/formatter.js#L69-L76)

### Signing and Serialization
- Transaction serialization: Uses generated serializers for transaction and signed_transaction structures.
- Chain ID concatenation: Signs chain_id + digest of serialized transaction buffer.
- Signature aggregation: Collects signatures per provided private key and returns a signed transaction object.

```mermaid
sequenceDiagram
participant Br as "Broadcaster"
participant Auth as "Auth.signTransaction"
participant Ser as "Serializer"
participant Conf as "Config"
Br->>Ser : "transaction.toBuffer(trx)"
Br->>Conf : "get('chain_id')"
Conf-->>Br : "chain_id"
Br->>Auth : "Sign(chain_id + buffer, key)"
Auth-->>Br : "signature"
Br->>Ser : "signed_transaction.toObject(trx + signatures)"
Ser-->>Br : "signed_transaction"
```

**Diagram sources**
- [src/auth/index.js](file://src/auth/index.js#L107-L130)
- [src/auth/serializer/src/operations.js](file://src/auth/serializer/src/operations.js#L73-L125)
- [src/config.js](file://src/config.js#L5-L6)
- [config.json](file://config.json#L4-L4)

**Section sources**
- [src/auth/index.js](file://src/auth/index.js#L107-L130)
- [src/auth/serializer/src/operations.js](file://src/auth/serializer/src/operations.js#L73-L125)
- [src/auth/serializer/src/types.js](file://src/auth/serializer/src/types.js#L30-L69)

### Supported Operations and Examples
Common operations and their typical usage:
- Vote: Cast or update a vote on content.
- Content: Create or edit a post/comment.
- Transfer: Move tokens between accounts.
- Custom: Execute custom JSON operations with required authorities.

Examples are provided in the example page and tests demonstrating usage patterns and callback handling.

**Section sources**
- [src/broadcast/operations.js](file://src/broadcast/operations.js#L2-L36)
- [examples/broadcast.html](file://examples/broadcast.html#L15-L25)
- [examples/broadcast.html](file://examples/broadcast.html#L27-L60)
- [examples/broadcast.html](file://examples/broadcast.html#L74-L83)
- [test/broadcast.test.js](file://test/broadcast.test.js#L16-L31)
- [test/broadcast.test.js](file://test/broadcast.test.js#L80-L97)
- [test/broadcast.test.js](file://test/broadcast.test.js#L127-L141)

### Authority Management Helpers
- Add/remove account authorizations for delegated posting or active permissions.
- Updates account authority structures and triggers an account update transaction.

**Section sources**
- [src/broadcast/helpers.js](file://src/broadcast/helpers.js#L6-L80)

### Network Transport and API Methods
- WebSocket transport manages connection lifecycle, request queuing, and response/error handling.
- API methods expose network broadcast endpoints used by the broadcaster.

**Section sources**
- [src/api/transports/ws.js](file://src/api/transports/ws.js#L27-L94)
- [src/api/methods.js](file://src/api/methods.js#L356-L374)

## Dependency Analysis
High-level dependencies among broadcast components:

```mermaid
graph LR
Br["src/broadcast/index.js"] --> OpsReg["src/broadcast/operations.js"]
Br --> Auth["src/auth/index.js"]
Br --> API["src/api/methods.js"]
Br --> Fmt["src/formatter.js"]
Br --> Cfg["src/config.js"]
Auth --> SerOps["src/auth/serializer/src/operations.js"]
Auth --> SerTypes["src/auth/serializer/src/types.js"]
API --> WS["src/api/transports/ws.js"]
WS --> Base["src/api/transports/base.js"]
Cfg --> CJSON["config.json"]
```

**Diagram sources**
- [src/broadcast/index.js](file://src/broadcast/index.js#L1-L11)
- [src/broadcast/operations.js](file://src/broadcast/operations.js#L1-L10)
- [src/auth/index.js](file://src/auth/index.js#L1-L11)
- [src/auth/serializer/src/operations.js](file://src/auth/serializer/src/operations.js#L20-L52)
- [src/auth/serializer/src/types.js](file://src/auth/serializer/src/types.js#L10-L14)
- [src/api/methods.js](file://src/api/methods.js#L1-L10)
- [src/api/transports/ws.js](file://src/api/transports/ws.js#L1-L14)
- [src/api/transports/base.js](file://src/api/transports/base.js#L1-L9)
- [src/config.js](file://src/config.js#L1-L10)
- [config.json](file://config.json#L1-L7)

**Section sources**
- [src/broadcast/index.js](file://src/broadcast/index.js#L1-L11)
- [src/auth/index.js](file://src/auth/index.js#L1-L11)
- [src/auth/serializer/src/operations.js](file://src/auth/serializer/src/operations.js#L20-L52)
- [src/auth/serializer/src/types.js](file://src/auth/serializer/src/types.js#L10-L14)
- [src/api/methods.js](file://src/api/methods.js#L1-L10)
- [src/api/transports/ws.js](file://src/api/transports/ws.js#L1-L14)
- [src/api/transports/base.js](file://src/api/transports/base.js#L1-L9)
- [src/config.js](file://src/config.js#L1-L10)
- [config.json](file://config.json#L1-L7)

## Performance Considerations
- Transaction validity window: Expiration is set to a short future offset; ensure clock synchronization to avoid premature expiration.
- Reference block freshness: Using last irreversible block improves finality guarantees; fallback to head block requires careful handling of reorg risks.
- Batch operations: Group multiple operations into a single transaction to reduce fees and latency.
- Simulation: Use potential/signature verification APIs to estimate required keys and validate transactions before submission.

[No sources needed since this section provides general guidance]

## Troubleshooting Guide
- Transaction rejected due to expiration: Verify dynamic properties retrieval and local time alignment.
- Invalid reference block: Confirm head block and LIB availability; handle fallback logic.
- Missing signatures: Ensure correct private keys are provided and chain ID matches the network.
- WebSocket connectivity: Inspect transport error handling and reconnection behavior.
- Authority issues: Use helper methods to add/remove delegated authorizations and verify account authority structures.

**Section sources**
- [src/broadcast/index.js](file://src/broadcast/index.js#L49-L84)
- [src/api/transports/ws.js](file://src/api/transports/ws.js#L96-L134)
- [src/broadcast/helpers.js](file://src/broadcast/helpers.js#L6-L80)
- [test/broadcast.test.js](file://test/broadcast.test.js#L33-L52)

## Conclusion
The VIZ JavaScript broadcast system provides a robust, modular pipeline for constructing, signing, and submitting transactions. It supports a wide range of operations, integrates tightly with the authentication and serialization layers, and offers flexible transport and configuration options. Following the patterns and guidelines outlined here enables reliable transaction broadcasting across applications.

[No sources needed since this section summarizes without analyzing specific files]

## Appendices

### Practical Examples Index
- Voting: [examples/broadcast.html](file://examples/broadcast.html#L15-L25)
- Comment creation: [examples/broadcast.html](file://examples/broadcast.html#L27-L60)
- Post creation: [examples/broadcast.html](file://examples/broadcast.html#L44-L60)
- Custom JSON: [examples/broadcast.html](file://examples/broadcast.html#L74-L83)

### Testing References
- Generated methods existence: [test/broadcast.test.js](file://test/broadcast.test.js#L16-L31)
- Transaction preparation: [test/broadcast.test.js](file://test/broadcast.test.js#L33-L52)
- Downvote and vote flows: [test/broadcast.test.js](file://test/broadcast.test.js#L54-L120)
- Custom JSON flow: [test/broadcast.test.js](file://test/broadcast.test.js#L122-L152)