# Utilities & Helpers

<cite>
**Referenced Files in This Document**
- [src/index.js](file://src/index.js)
- [src/browser.js](file://src/browser.js)
- [src/config.js](file://src/config.js)
- [config.json](file://config.json)
- [src/utils.js](file://src/utils.js)
- [src/broadcast/helpers.js](file://src/broadcast/helpers.js)
- [src/formatter.js](file://src/formatter.js)
- [src/auth/serializer/src/number_utils.js](file://src/auth/serializer/src/number_utils.js)
- [src/auth/ecc/src/key_utils.js](file://src/auth/ecc/src/key_utils.js)
- [src/auth/ecc/src/address.js](file://src/auth/ecc/src/address.js)
- [test/number_utils.js](file://test/number_utils.js)
- [test/Crypto.js](file://test/Crypto.js)
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
This document describes the utility functions and helper modules in the VIZ JavaScript library with a focus on:
- Formatting utilities for currency display, numeric conversions, and string processing
- Configuration management and environment detection
- Browser compatibility helpers
- Practical usage patterns, performance tips, and cross-platform considerations
- Guidelines for extending utilities consistently across Node.js and browser environments

## Project Structure
The utilities and helpers are organized under the src directory and integrated via module exports and environment-aware entry points. The primary modules covered here are:
- Configuration and environment exposure
- Numeric formatting and currency helpers
- String processing and content helpers
- Broadcast helpers for authority management
- Number utilities for implied decimals
- Cryptographic key utilities and address helpers

```mermaid
graph TB
subgraph "Entry Points"
IDX["src/index.js"]
BRW["src/browser.js"]
end
subgraph "Utilities"
CFG["src/config.js"]
UTL["src/utils.js"]
FMT["src/formatter.js"]
NMB["src/auth/serializer/src/number_utils.js"]
KEY["src/auth/ecc/src/key_utils.js"]
ADH["src/auth/ecc/src/address.js"]
BHL["src/broadcast/helpers.js"]
end
IDX --> CFG
IDX --> UTL
IDX --> FMT
IDX --> NMB
IDX --> KEY
IDX --> ADH
IDX --> BHL
BRW --> IDX
BRW --> CFG
BRW --> UTL
BRW --> FMT
BRW --> KEY
BRW --> ADH
BRW --> BHL
```

**Diagram sources**
- [src/index.js](file://src/index.js#L1-L20)
- [src/browser.js](file://src/browser.js#L1-L30)
- [src/config.js](file://src/config.js#L1-L10)
- [src/utils.js](file://src/utils.js#L1-L348)
- [src/formatter.js](file://src/formatter.js#L1-L87)
- [src/auth/serializer/src/number_utils.js](file://src/auth/serializer/src/number_utils.js#L1-L54)
- [src/auth/ecc/src/key_utils.js](file://src/auth/ecc/src/key_utils.js#L1-L89)
- [src/auth/ecc/src/address.js](file://src/auth/ecc/src/address.js#L1-L57)
- [src/broadcast/helpers.js](file://src/broadcast/helpers.js#L1-L82)

**Section sources**
- [src/index.js](file://src/index.js#L1-L20)
- [src/browser.js](file://src/browser.js#L1-L30)

## Core Components
- Configuration management: centralized getters/setters backed by a JSON configuration file
- Environment detection and globals: exposes a unified viz object in both browser and Node.js contexts
- Formatting utilities: currency-like formatting, numeric estimations, suggested passwords, and content permlinks
- Numeric utilities: conversion between implied decimals and formatted strings
- String processing: camelCase conversion and validation helpers
- Broadcast helpers: account authority management helpers
- Cryptographic helpers: entropy collection, random key generation, and address encoding/decoding

**Section sources**
- [src/config.js](file://src/config.js#L1-L10)
- [config.json](file://config.json#L1-L7)
- [src/browser.js](file://src/browser.js#L1-L30)
- [src/formatter.js](file://src/formatter.js#L1-L87)
- [src/auth/serializer/src/number_utils.js](file://src/auth/serializer/src/number_utils.js#L1-L54)
- [src/utils.js](file://src/utils.js#L1-L348)
- [src/broadcast/helpers.js](file://src/broadcast/helpers.js#L1-L82)
- [src/auth/ecc/src/key_utils.js](file://src/auth/ecc/src/key_utils.js#L1-L89)
- [src/auth/ecc/src/address.js](file://src/auth/ecc/src/address.js#L1-L57)

## Architecture Overview
The library exposes a cohesive API surface through two entry points:
- Node.js: src/index.js exports the entire suite
- Browser: src/browser.js wraps the Node exports and attaches to window/global

Formatting utilities are provided by a factory that receives the API client, enabling dynamic property retrieval and estimation functions. Numeric and cryptographic utilities are standalone modules designed for reuse across modules.

```mermaid
graph TB
API["API Client"]
FMT["formatter.js (factory)"]
CFG["config.js"]
UTL["utils.js"]
NMB["number_utils.js"]
KEY["key_utils.js"]
ADH["address.js"]
BHL["broadcast/helpers.js"]
API --> FMT
CFG --> FMT
CFG --> ADH
KEY --> FMT
NMB --> FMT
UTL --> FMT
BHL --> API
```

**Diagram sources**
- [src/formatter.js](file://src/formatter.js#L1-L87)
- [src/config.js](file://src/config.js#L1-L10)
- [src/auth/serializer/src/number_utils.js](file://src/auth/serializer/src/number_utils.js#L1-L54)
- [src/auth/ecc/src/key_utils.js](file://src/auth/ecc/src/key_utils.js#L1-L89)
- [src/auth/ecc/src/address.js](file://src/auth/ecc/src/address.js#L1-L57)
- [src/broadcast/helpers.js](file://src/broadcast/helpers.js#L1-L82)

## Detailed Component Analysis

### Configuration Management
- Purpose: centralize runtime configuration with simple get/set accessors
- Behavior: loads defaults from config.json and exposes functions to retrieve or update values
- Usage pattern: import config and call get(key) or set(key, value)

```mermaid
flowchart TD
Start(["Load config"]) --> Read["Read defaultConfig from config.json"]
Read --> Expose["Expose get(key) and set(key,value)"]
Expose --> Use["Modules call config.get/set"]
Use --> End(["Done"])
```

**Diagram sources**
- [src/config.js](file://src/config.js#L1-L10)
- [config.json](file://config.json#L1-L7)

**Section sources**
- [src/config.js](file://src/config.js#L1-L10)
- [config.json](file://config.json#L1-L7)

### Environment Detection and Global Exposure
- Purpose: ensure the library is usable in both browser and Node.js
- Behavior: creates a viz object containing all modules and attaches it to window/global when available
- Cross-platform: guards typeof window and typeof global to avoid errors in non-browser/non-node environments

```mermaid
sequenceDiagram
participant Loader as "Module Loader"
participant Browser as "src/browser.js"
participant Node as "src/index.js"
participant Globals as "Global Objects"
Loader->>Browser : require('./browser')
Browser->>Node : require('./index.js')
Browser->>Globals : attach viz to window/global
Loader-->>Browser : exports viz
```

**Diagram sources**
- [src/browser.js](file://src/browser.js#L1-L30)
- [src/index.js](file://src/index.js#L1-L20)

**Section sources**
- [src/browser.js](file://src/browser.js#L1-L30)
- [src/index.js](file://src/index.js#L1-L20)

### Formatting Utilities (Currency, Numbers, Strings)
- Currency-like formatting: adds thousands separators to numeric strings
- Numeric estimations: computes account value using vesting shares and global props
- Password suggestion: generates a random WIF-derived password
- Content permlink generation: builds deterministic permlinks with timestamps
- Amount formatting: appends asset suffix to amounts
- String processing: camelCase conversion and account name validation

```mermaid
flowchart TD
Start(["estimateAccountValue(account, options)"]) --> CheckGprops{"Has gprops?"}
CheckGprops --> |No| Fetch["Fetch state via VIZ_API.getStateAsync"]
CheckGprops --> |Yes| Compute["Compute vestingVIZ from gprops"]
Fetch --> Compute
Compute --> Sum["Sum balance + vesting_viz"]
Sum --> Format["Format to fixed(3)"]
Format --> End(["Return formatted value"])
```

**Diagram sources**
- [src/formatter.js](file://src/formatter.js#L19-L49)

**Section sources**
- [src/formatter.js](file://src/formatter.js#L1-L87)
- [src/utils.js](file://src/utils.js#L10-L47)

### Numeric Utilities (Implied Decimals)
- Purpose: convert between human-readable numbers and implied-decimal strings for asset precision
- Functions: toImpliedDecimal(number, precision), fromImpliedDecimal(number, precision)
- Validation: strict assertions for overflow, invalid formats, and precision limits

```mermaid
flowchart TD
A["toImpliedDecimal(number, precision)"] --> B["Normalize input to string"]
B --> C{"Contains '.'?"}
C --> |Yes| Split["Split into whole and decimal parts"]
C --> |No| WholeOnly["Set decimal part empty"]
Split --> Pad["Pad decimal to precision length"]
WholeOnly --> Pad
Pad --> Trim["Trim leading zeros from whole"]
Trim --> Out["Return combined string"]
```

**Diagram sources**
- [src/auth/serializer/src/number_utils.js](file://src/auth/serializer/src/number_utils.js#L10-L35)

**Section sources**
- [src/auth/serializer/src/number_utils.js](file://src/auth/serializer/src/number_utils.js#L1-L54)
- [test/number_utils.js](file://test/number_utils.js#L1-L29)

### String Processing and Validation
- camelCase conversion: transforms snake_case identifiers to camelCase
- Account name validation: enforces naming rules for segmented account names

```mermaid
flowchart TD
S(["validateAccountName(value)"]) --> Empty{"Empty?"}
Empty --> |Yes| Err1["Return 'not be empty'"]
Empty --> |No| Len["Check length 2..25"]
Len --> Segments["Split by '.' and iterate segments"]
Segments --> Rules["Validate start/end, allowed chars, dashes, min length"]
Rules --> OK{"All valid?"}
OK --> |Yes| Null["Return null"]
OK --> |No| Err["Return violation message"]
```

**Diagram sources**
- [src/utils.js](file://src/utils.js#L10-L47)

**Section sources**
- [src/utils.js](file://src/utils.js#L1-L8)

### Broadcast Helpers (Authority Management)
- Purpose: add/remove authorized accounts to a user’s authority structures
- Behavior: fetch account, update account_auths, and issue account_update transaction via broadcaster

```mermaid
sequenceDiagram
participant Caller as "Caller"
participant Helper as "helpers.js"
participant API as "api.getAccountsAsync"
participant Broadcaster as "Broadcaster.accountUpdate"
Caller->>Helper : addAccountAuth(activeWif, username, authorizedUsername, role, cb)
Helper->>API : fetch account by username
API-->>Helper : account object
Helper->>Helper : append authorizedUsername with default weight
Helper->>Broadcaster : accountUpdate with updated authority
Broadcaster-->>Helper : callback result
Helper-->>Caller : invoke cb(null, result)
```

**Diagram sources**
- [src/broadcast/helpers.js](file://src/broadcast/helpers.js#L6-L41)

**Section sources**
- [src/broadcast/helpers.js](file://src/broadcast/helpers.js#L1-L82)

### Cryptographic Helpers (Entropy, Keys, Addresses)
- Entropy and randomness: collects browser entropy, hashes buffers, and produces 32-byte random keys
- Address encoding/decoding: validates prefixes, decodes base58, and verifies checksums

```mermaid
flowchart TD
Start(["get_random_key(entropy)"]) --> Bytes["random32ByteBuffer(entropy)"]
Bytes --> Hash["Hash buffers and concatenate"]
Hash --> Key["PrivateKey.fromBuffer(...)"]
Key --> End(["Return PrivateKey"])
```

**Diagram sources**
- [src/auth/ecc/src/key_utils.js](file://src/auth/ecc/src/key_utils.js#L29-L55)

**Section sources**
- [src/auth/ecc/src/key_utils.js](file://src/auth/ecc/src/key_utils.js#L1-L89)
- [src/auth/ecc/src/address.js](file://src/auth/ecc/src/address.js#L1-L57)

### Voice Utilities (Content Publishing)
- Purpose: helpers for publishing text, encoded text, publications, and related operations
- Features: previous sequence handling, optional reply/share, optional beneficiaries, passphrase-based encryption
- Notes: integrates with API and broadcast modules to submit custom operations

```mermaid
sequenceDiagram
participant Caller as "Caller"
participant Utils as "utils.js"
participant API as "viz.api.getAccount"
participant Broadcast as "viz.broadcast.custom"
Caller->>Utils : voiceText(...)
Utils->>API : getAccount(account, 'V')
API-->>Utils : { custom_sequence_block_num }
Utils->>Broadcast : custom([...], 'V', JSON.stringify(object))
Broadcast-->>Utils : { err, result }
Utils-->>Caller : callback(!err)
```

**Diagram sources**
- [src/utils.js](file://src/utils.js#L84-L127)

**Section sources**
- [src/utils.js](file://src/utils.js#L49-L206)

## Dependency Analysis
Utilities depend on configuration, API clients, and cryptographic primitives. The formatter module depends on the API client to fetch global properties for estimations. The broadcast helpers depend on the API to retrieve account data and on the broadcaster to submit transactions.

```mermaid
graph LR
CFG["config.js"] --> FMT["formatter.js"]
CFG --> ADH["address.js"]
API["API Client"] --> FMT
API --> BHL["broadcast/helpers.js"]
KEY["key_utils.js"] --> FMT
NMB["number_utils.js"] --> FMT
UTL["utils.js"] --> FMT
```

**Diagram sources**
- [src/config.js](file://src/config.js#L1-L10)
- [src/formatter.js](file://src/formatter.js#L1-L87)
- [src/auth/serializer/src/number_utils.js](file://src/auth/serializer/src/number_utils.js#L1-L54)
- [src/auth/ecc/src/key_utils.js](file://src/auth/ecc/src/key_utils.js#L1-L89)
- [src/auth/ecc/src/address.js](file://src/auth/ecc/src/address.js#L1-L57)
- [src/broadcast/helpers.js](file://src/broadcast/helpers.js#L1-L82)
- [src/utils.js](file://src/utils.js#L1-L348)

**Section sources**
- [src/formatter.js](file://src/formatter.js#L1-L87)
- [src/broadcast/helpers.js](file://src/broadcast/helpers.js#L1-L82)
- [src/utils.js](file://src/utils.js#L1-L348)

## Performance Considerations
- Prefer precomputed or cached global properties when estimating account values to reduce API calls
- Avoid repeated JSON parsing/stringification in tight loops; reuse parsed objects where possible
- Use toImpliedDecimal/fromImpliedDecimal for precise asset arithmetic to prevent floating-point drift
- Minimize DOM-dependent entropy gathering in headless environments; fallback to hashing in Node.js
- Batch broadcast operations when adding/removing multiple authorities to reduce network overhead

## Troubleshooting Guide
- Configuration not applied: verify config.json exists and config.get/set are invoked after module load
- Formatting errors: ensure numeric inputs are strings or numbers within safe integer bounds before conversion
- Authority updates failing: confirm account exists, authority structure is valid, and weights are set appropriately
- Entropy issues: ensure sufficient browser entropy is available; fallback hashing occurs automatically
- Address validation failures: check prefix matches configured address_prefix and checksum verification passes

**Section sources**
- [src/config.js](file://src/config.js#L1-L10)
- [src/auth/serializer/src/number_utils.js](file://src/auth/serializer/src/number_utils.js#L1-L54)
- [src/broadcast/helpers.js](file://src/broadcast/helpers.js#L1-L82)
- [src/auth/ecc/src/key_utils.js](file://src/auth/ecc/src/key_utils.js#L66-L86)
- [src/auth/ecc/src/address.js](file://src/auth/ecc/src/address.js#L19-L30)

## Conclusion
The VIZ JavaScript library provides a robust set of utilities spanning configuration, formatting, numeric precision, string processing, broadcasting, and cryptography. These modules are designed for cross-platform use and integrate cleanly with the API and broadcast layers. Following the patterns and guidelines outlined here ensures consistent behavior and maintainability across environments.

## Appendices

### Practical Examples and Integration Patterns
- Using formatter utilities:
  - Estimate account value: call the estimation function with an account object and optional global properties
  - Generate a suggested password: use the password creation utility for secure, WIF-derived credentials
  - Format amounts: append asset suffixes and apply thousand separators for display
- Numeric conversions:
  - Convert amounts to implied decimals before broadcasting operations
  - Convert back to human-readable form for display
- String processing:
  - Normalize identifiers using camelCase conversion
  - Validate account names before registration or delegation
- Broadcasting authority changes:
  - Use helper functions to add or remove authorized accounts safely
- Environment usage:
  - In Node.js, require the main index module
  - In browsers, include the browser entry to expose the viz object globally

**Section sources**
- [src/formatter.js](file://src/formatter.js#L19-L85)
- [src/auth/serializer/src/number_utils.js](file://src/auth/serializer/src/number_utils.js#L10-L53)
- [src/utils.js](file://src/utils.js#L10-L127)
- [src/broadcast/helpers.js](file://src/broadcast/helpers.js#L6-L81)
- [src/index.js](file://src/index.js#L1-L20)
- [src/browser.js](file://src/browser.js#L1-L30)
- [examples/get-post-content.js](file://examples/get-post-content.js#L1-L5)