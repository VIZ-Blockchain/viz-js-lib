# Testing & Development

<cite>
**Referenced Files in This Document**
- [package.json](file://package.json)
- [.travis.yml](file://.travis.yml)
- [webpack.config.js](file://webpack.config.js)
- [webpack/makeConfig.js](file://webpack/makeConfig.js)
- [.eslintrc](file://.eslintrc)
- [.editorconfig](file://.editorconfig)
- [src/index.js](file://src/index.js)
- [src/api/index.js](file://src/api/index.js)
- [src/auth/index.js](file://src/auth/index.js)
- [src/broadcast/index.js](file://src/broadcast/index.js)
- [test/test_helper.js](file://test/test_helper.js)
- [test/browser/BrowserTests.js](file://test/browser/BrowserTests.js)
- [test/test.html](file://test/test.html)
- [test/api.test.js](file://test/api.test.js)
- [test/broadcast.test.js](file://test/broadcast.test.js)
- [test/methods.test.js](file://test/methods.test.js)
- [test/memo.test.js](file://test/memo.test.js)
- [test/comment.test.js](file://test/comment.test.js)
- [test/test-post.json](file://test/test-post.json)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Dependency Analysis](#dependency-analysis)
7. [Performance Considerations](#performance-considerations)
8. [Security Testing](#security-testing)
9. [Cross-Browser Compatibility Testing](#cross-browser-compatibility-testing)
10. [Development Workflow](#development-workflow)
11. [Code Quality Standards](#code-quality-standards)
12. [Contribution Guidelines](#contribution-guidelines)
13. [Troubleshooting Guide](#troubleshooting-guide)
14. [Conclusion](#conclusion)

## Introduction
This document provides comprehensive testing and development guidance for the VIZ JavaScript library. It covers the testing framework, unit test structure, browser testing procedures, continuous integration setup, and practical workflows for writing tests against API methods, authentication functions, and broadcast operations. It also includes environment setup, mock data usage, debugging strategies, performance and security testing approaches, and cross-browser compatibility testing.

## Project Structure
The repository is organized around a modular JavaScript library with dedicated test suites and build tooling:
- Source code under src/ exposes the public API surface for API access, authentication, broadcasting, formatters, and utilities.
- Tests under test/ cover Node.js unit tests, browser-specific tests, and HTML-based test harnesses.
- Build and packaging are handled via Webpack and NPM scripts.

```mermaid
graph TB
subgraph "Source"
SRC_API["src/api/index.js"]
SRC_AUTH["src/auth/index.js"]
SRC_BROADCAST["src/broadcast/index.js"]
SRC_INDEX["src/index.js"]
end
subgraph "Tests"
T_API["test/api.test.js"]
T_BROADCAST["test/broadcast.test.js"]
T_METHODS["test/methods.test.js"]
T_MEMO["test/memo.test.js"]
T_COMMENT["test/comment.test.js"]
T_BROWSER["test/browser/BrowserTests.js"]
T_TEST_HTML["test/test.html"]
end
subgraph "Tooling"
PKG["package.json"]
TRAVIS[".travis.yml"]
WEBPACK_CFG["webpack.config.js"]
MAKECFG["webpack/makeConfig.js"]
ESLINT[".eslintrc"]
EDITOR[".editorconfig"]
end
SRC_INDEX --> SRC_API
SRC_INDEX --> SRC_AUTH
SRC_INDEX --> SRC_BROADCAST
T_API --> SRC_API
T_BROADCAST --> SRC_BROADCAST
T_METHODS --> SRC_API
T_MEMO --> SRC_AUTH
T_COMMENT --> SRC_BROADCAST
T_TEST_HTML --> T_API
WEBPACK_CFG --> MAKECFG
PKG --> WEBPACK_CFG
PKG --> ESLINT
PKG --> TRAVIS
```

**Diagram sources**
- [src/index.js](file://src/index.js#L1-L20)
- [src/api/index.js](file://src/api/index.js#L1-L271)
- [src/auth/index.js](file://src/auth/index.js#L1-L133)
- [src/broadcast/index.js](file://src/broadcast/index.js#L1-L137)
- [test/api.test.js](file://test/api.test.js#L1-L202)
- [test/broadcast.test.js](file://test/broadcast.test.js#L1-L154)
- [test/methods.test.js](file://test/methods.test.js#L1-L23)
- [test/memo.test.js](file://test/memo.test.js#L1-L38)
- [test/comment.test.js](file://test/comment.test.js#L1-L62)
- [test/browser/BrowserTests.js](file://test/browser/BrowserTests.js#L1-L56)
- [test/test.html](file://test/test.html#L1-L14)
- [webpack.config.js](file://webpack.config.js#L1-L3)
- [webpack/makeConfig.js](file://webpack/makeConfig.js#L1-L100)
- [package.json](file://package.json#L1-L84)
- [.travis.yml](file://.travis.yml#L1-L18)
- [.eslintrc](file://.eslintrc#L1-L27)
- [.editorconfig](file://.editorconfig#L1-L21)

**Section sources**
- [src/index.js](file://src/index.js#L1-L20)
- [webpack.config.js](file://webpack.config.js#L1-L3)
- [webpack/makeConfig.js](file://webpack/makeConfig.js#L1-L100)
- [package.json](file://package.json#L1-L84)
- [.travis.yml](file://.travis.yml#L1-L18)
- [.eslintrc](file://.eslintrc#L1-L27)
- [.editorconfig](file://.editorconfig#L1-L21)

## Core Components
- API client: Provides WebSocket/HTTP transport abstraction, streaming utilities, and generated API methods. See [src/api/index.js](file://src/api/index.js#L1-L271).
- Authentication: Handles key derivation, WIF conversion, public key validation, and transaction signing. See [src/auth/index.js](file://src/auth/index.js#L1-L133).
- Broadcast: Prepares transactions, signs them, and broadcasts to the network. See [src/broadcast/index.js](file://src/broadcast/index.js#L1-L137).
- Public facade: Exposes the library’s public API surface. See [src/index.js](file://src/index.js#L1-L20).

Key testing coverage areas:
- API methods and reconnection behavior: [test/api.test.js](file://test/api.test.js#L1-L202)
- Broadcast operations and transaction preparation: [test/broadcast.test.js](file://test/broadcast.test.js#L1-L154), [test/comment.test.js](file://test/comment.test.js#L1-L62)
- Generated methods completeness: [test/methods.test.js](file://test/methods.test.js#L1-L23)
- Memo encryption/decryption: [test/memo.test.js](file://test/memo.test.js#L1-L38)
- Browser crypto tests: [test/browser/BrowserTests.js](file://test/browser/BrowserTests.js#L1-L56)

**Section sources**
- [src/api/index.js](file://src/api/index.js#L1-L271)
- [src/auth/index.js](file://src/auth/index.js#L1-L133)
- [src/broadcast/index.js](file://src/broadcast/index.js#L1-L137)
- [src/index.js](file://src/index.js#L1-L20)
- [test/api.test.js](file://test/api.test.js#L1-L202)
- [test/broadcast.test.js](file://test/broadcast.test.js#L1-L154)
- [test/methods.test.js](file://test/methods.test.js#L1-L23)
- [test/memo.test.js](file://test/memo.test.js#L1-L38)
- [test/comment.test.js](file://test/comment.test.js#L1-L62)
- [test/browser/BrowserTests.js](file://test/browser/BrowserTests.js#L1-L56)

## Architecture Overview
The testing architecture integrates Node.js unit tests with a browser test harness. Webpack bundles the library and test suite for browser execution.

```mermaid
graph TB
subgraph "Build"
PKG_SCRIPTS["NPM Scripts<br/>test, build, build-browser, build-node"]
WEBPACK["Webpack Config<br/>entry viz-tests"]
end
subgraph "Runtime"
LIB["viz Library<br/>src/index.js"]
API["API Module<br/>src/api/index.js"]
AUTH["Auth Module<br/>src/auth/index.js"]
BROADCAST["Broadcast Module<br/>src/broadcast/index.js"]
end
subgraph "Tests"
NODE_TESTS["Node Tests<br/>Mocha + Babel"]
BROWSER_TESTS["Browser Harness<br/>test.html + BrowserTests.js"]
end
PKG_SCRIPTS --> WEBPACK
WEBPACK --> LIB
LIB --> API
LIB --> AUTH
LIB --> BROADCAST
NODE_TESTS --> API
NODE_TESTS --> AUTH
NODE_TESTS --> BROADCAST
BROWSER_TESTS --> AUTH
BROWSER_TESTS --> API
```

**Diagram sources**
- [package.json](file://package.json#L6-L13)
- [webpack.config.js](file://webpack.config.js#L1-L3)
- [webpack/makeConfig.js](file://webpack/makeConfig.js#L67-L89)
- [src/index.js](file://src/index.js#L1-L20)
- [src/api/index.js](file://src/api/index.js#L1-L271)
- [src/auth/index.js](file://src/auth/index.js#L1-L133)
- [src/broadcast/index.js](file://src/broadcast/index.js#L1-L137)
- [test/test.html](file://test/test.html#L1-L14)
- [test/browser/BrowserTests.js](file://test/browser/BrowserTests.js#L1-L56)

## Detailed Component Analysis

### API Testing
- Purpose: Validate API connectivity, method generation, streaming, and reconnection behavior.
- Key aspects:
  - Transport selection and lazy connection opening.
  - Streaming block/transaction/operation streams.
  - Reconnection logic on WebSocket close events.
  - Async method coverage and listener cleanup.

```mermaid
sequenceDiagram
participant Test as "Mocha Test"
participant VIZ as "VIZ Instance"
participant Transport as "Transport (HTTP/WS)"
participant API as "Blockchain API"
Test->>VIZ : "new VIZ()"
Test->>VIZ : "start()"
VIZ->>Transport : "start()"
Transport->>API : "connect"
Test->>VIZ : "getFollowersAsync(...)"
VIZ->>Transport : "send(api, data)"
Transport->>API : "request"
API-->>Transport : "response"
Transport-->>VIZ : "onMessage"
VIZ-->>Test : "resolve result"
```

**Diagram sources**
- [test/api.test.js](file://test/api.test.js#L14-L29)
- [test/api.test.js](file://test/api.test.js#L42-L78)
- [test/api.test.js](file://test/api.test.js#L80-L166)
- [test/api.test.js](file://test/api.test.js#L168-L200)
- [src/api/index.js](file://src/api/index.js#L52-L62)
- [src/api/index.js](file://src/api/index.js#L98-L119)

**Section sources**
- [test/api.test.js](file://test/api.test.js#L1-L202)
- [src/api/index.js](file://src/api/index.js#L1-L271)

### Authentication and Memo Encryption Testing
- Purpose: Verify key derivation, WIF handling, public key parsing, and memo encryption/decryption.
- Key aspects:
  - Private/public key pair generation and WIF round-trips.
  - Memo encryption with known inputs and expected outputs.
  - Error handling for unsupported memo encryption scenarios.

```mermaid
flowchart TD
Start(["Start"]) --> Seed["Derive Private Key from Seed"]
Seed --> PubKey["Compute Public Key"]
PubKey --> EncodeMemo["Encode Memo (with keys)"]
EncodeMemo --> DecodeMemo["Decode Memo (with keys)"]
DecodeMemo --> Compare{"Decoded equals original?"}
Compare --> |Yes| Pass["Pass"]
Compare --> |No| Fallback["Fallback to plaintext or flag"]
Fallback --> Pass
```

**Diagram sources**
- [test/memo.test.js](file://test/memo.test.js#L6-L36)
- [src/auth/index.js](file://src/auth/index.js#L56-L101)

**Section sources**
- [test/memo.test.js](file://test/memo.test.js#L1-L38)
- [src/auth/index.js](file://src/auth/index.js#L1-L133)

### Broadcast Operations Testing
- Purpose: Validate transaction preparation, signing, and broadcasting for operations like vote, transfer, and content with beneficiaries.
- Key aspects:
  - Transaction patching with dynamic global properties.
  - Signing with posting WIF and callback/promise variants.
  - Content operations with permlink generation and metadata.

```mermaid
sequenceDiagram
participant Test as "Mocha Test"
participant Broadcast as "Broadcast Module"
participant Formatter as "Formatter"
participant Auth as "Auth.signTransaction"
participant API as "Broadcast API"
Test->>Broadcast : "_prepareTransaction(tx)"
Broadcast->>API : "getDynamicGlobalPropertiesAsync()"
API-->>Broadcast : "properties"
Broadcast-->>Test : "tx with ref_block_num/prefix, expiration"
Test->>Broadcast : "send(tx, {posting : wif})"
Broadcast->>Auth : "signTransaction(tx, keys)"
Auth-->>Broadcast : "signed tx"
Broadcast->>API : "broadcastTransactionWithCallbackAsync(...) or broadcastTransactionAsync"
API-->>Broadcast : "success"
Broadcast-->>Test : "return signed tx"
```

**Diagram sources**
- [test/broadcast.test.js](file://test/broadcast.test.js#L33-L52)
- [test/broadcast.test.js](file://test/broadcast.test.js#L75-L120)
- [test/comment.test.js](file://test/comment.test.js#L19-L60)
- [src/broadcast/index.js](file://src/broadcast/index.js#L49-L84)
- [src/broadcast/index.js](file://src/broadcast/index.js#L24-L47)

**Section sources**
- [test/broadcast.test.js](file://test/broadcast.test.js#L1-L154)
- [test/comment.test.js](file://test/comment.test.js#L1-L62)
- [src/broadcast/index.js](file://src/broadcast/index.js#L1-L137)

### Browser Testing Procedures
- Purpose: Run browser-side crypto and encoding tests in a real browser environment.
- Setup:
  - Webpack bundles a test bundle named viz-tests.
  - The HTML harness loads Mocha and runs the test bundle.
  - Browser tests exercise ECC key generation, WIF parsing, and memo encryption/decryption.

```mermaid
sequenceDiagram
participant Browser as "Browser"
participant Mocha as "Mocha Runner"
participant Bundle as "viz-tests.min.js"
participant Tests as "BrowserTests.js"
Browser->>Mocha : "load test.html"
Mocha->>Bundle : "load viz-tests.min.js"
Bundle->>Tests : "execute exported runTests()"
Tests-->>Mocha : "report results/errors"
```

**Diagram sources**
- [test/test.html](file://test/test.html#L1-L14)
- [webpack/makeConfig.js](file://webpack/makeConfig.js#L67-L70)
- [test/browser/BrowserTests.js](file://test/browser/BrowserTests.js#L8-L56)

**Section sources**
- [test/test.html](file://test/test.html#L1-L14)
- [webpack/makeConfig.js](file://webpack/makeConfig.js#L1-L100)
- [test/browser/BrowserTests.js](file://test/browser/BrowserTests.js#L1-L56)

## Dependency Analysis
- Test runner and transpilation:
  - Mocha is configured via NPM scripts and Babel registration.
  - ESLint enforces style and correctness rules across Node, browser, and Mocha environments.
- Build-time dependencies:
  - Webpack bundles the library and test suite; production builds enable minification and deduplication.
- Runtime dependencies:
  - Bluebird for promises, cross-fetch for HTTP transport, debug for logging, and others for cryptography and serialization.

```mermaid
graph LR
PKG["package.json"]
ESL["ESLint (.eslintrc)"]
WEB["Webpack (makeConfig.js)"]
API["src/api/index.js"]
AUTH["src/auth/index.js"]
BROAD["src/broadcast/index.js"]
PKG --> ESL
PKG --> WEB
WEB --> API
WEB --> AUTH
WEB --> BROAD
```

**Diagram sources**
- [package.json](file://package.json#L56-L75)
- [.eslintrc](file://.eslintrc#L1-L27)
- [webpack/makeConfig.js](file://webpack/makeConfig.js#L1-L100)
- [src/api/index.js](file://src/api/index.js#L1-L271)
- [src/auth/index.js](file://src/auth/index.js#L1-L133)
- [src/broadcast/index.js](file://src/broadcast/index.js#L1-L137)

**Section sources**
- [package.json](file://package.json#L1-L84)
- [.eslintrc](file://.eslintrc#L1-L27)
- [webpack/makeConfig.js](file://webpack/makeConfig.js#L1-L100)

## Performance Considerations
- Streaming APIs:
  - The API module provides streaming utilities for block number, blocks, transactions, and operations. Tests validate that streams emit expected properties and can be released cleanly.
- Transaction preparation:
  - Broadcasting prepares transactions using dynamic global properties and block references. Tests ensure the presence of required fields and signatures.
- Recommendations:
  - Use timeouts and resource cleanup in long-running streams.
  - Batch operations where appropriate to reduce network overhead.
  - Monitor performance metrics emitted by the API client during tests.

**Section sources**
- [src/api/index.js](file://src/api/index.js#L121-L235)
- [test/api.test.js](file://test/api.test.js#L80-L166)
- [src/broadcast/index.js](file://src/broadcast/index.js#L49-L84)
- [test/broadcast.test.js](file://test/broadcast.test.js#L33-L52)

## Security Testing
- Key handling:
  - Validate WIF validity and public key derivation.
  - Ensure memo encryption/decryption works with provided keys and falls back gracefully when unsupported.
- Transaction signing:
  - Confirm that signing produces valid signatures and that broadcast methods return signed transactions with required fields.
- Recommendations:
  - Use deterministic seeds and known-good test vectors for cryptographic routines.
  - Avoid logging secrets; mask sensitive data in test logs.
  - Prefer environment variables for credentials in integration-style tests.

**Section sources**
- [src/auth/index.js](file://src/auth/index.js#L65-L101)
- [test/memo.test.js](file://test/memo.test.js#L6-L36)
- [src/broadcast/index.js](file://src/broadcast/index.js#L107-L130)
- [test/broadcast.test.js](file://test/broadcast.test.js#L75-L120)

## Cross-Browser Compatibility Testing
- Browser harness:
  - The browser test suite executes in a real browser using the bundled viz-tests.min.js and the Mocha HTML harness.
- Practical steps:
  - Build the browser bundle and open the test page in target browsers.
  - Observe console output and error reporting from the browser test runner.
- Notes:
  - The library declares browser-specific shims in package.json to disable Node-only modules in the browser bundle.

**Section sources**
- [test/test.html](file://test/test.html#L1-L14)
- [webpack/makeConfig.js](file://webpack/makeConfig.js#L67-L70)
- [test/browser/BrowserTests.js](file://test/browser/BrowserTests.js#L1-L56)
- [package.json](file://package.json#L15-L18)

## Development Workflow
- Local setup:
  - Install dependencies and build artifacts using NPM scripts.
  - Run unit tests with Mocha and Babel transpilation.
- Writing tests:
  - Place new tests under test/ following existing patterns.
  - Use async/await or callbacks consistently.
  - Leverage helper assertions and stubs where applicable.
- Running subsets:
  - Use NPM script aliases to run focused test suites (e.g., auth-related tests).
- Continuous integration:
  - Travis CI runs tests on multiple Node.js versions and caches dependencies.

**Section sources**
- [package.json](file://package.json#L6-L13)
- [.travis.yml](file://.travis.yml#L1-L18)

## Code Quality Standards
- Linting:
  - ESLint configuration targets ES6 modules, Node, browser, and Mocha environments with warnings for unused variables and unreachable code.
- Formatting:
  - EditorConfig enforces consistent indentation and line endings.
- Style expectations:
  - Prefer const/let, avoid unreachable code, and follow module boundaries.

**Section sources**
- [.eslintrc](file://.eslintrc#L1-L27)
- [.editorconfig](file://.editorconfig#L1-L21)

## Contribution Guidelines
- Testing requirements:
  - Add unit tests for new features and bug fixes.
  - Include browser tests for crypto-related functionality.
- Pull requests:
  - Ensure tests pass locally and in CI.
  - Keep diffs minimal and focused.
- Documentation:
  - Update inline documentation and examples where relevant.

[No sources needed since this section provides general guidance]

## Troubleshooting Guide
- Test environment setup:
  - Ensure Node.js and dependencies are installed.
  - Use NPM scripts to run tests; verify Mocha and Babel are available.
- Mock data usage:
  - Utilize provided fixtures (e.g., test-post.json) to validate API responses.
- Debugging test failures:
  - Enable debug logging in the API client to inspect request/response timing and errors.
  - Inspect browser test console for stack traces and error messages.
  - Stub transports selectively to simulate network conditions in unit tests.

**Section sources**
- [test/test_helper.js](file://test/test_helper.js#L1-L19)
- [test/test-post.json](file://test/test-post.json#L1-L14)
- [src/api/index.js](file://src/api/index.js#L12-L15)
- [test/browser/BrowserTests.js](file://test/browser/BrowserTests.js#L10-L22)

## Conclusion
This guide consolidates testing and development practices for the VIZ JavaScript library. By leveraging the existing Mocha-based Node tests, browser harness, and Webpack build pipeline, contributors can confidently add new features, fix bugs, and maintain high-quality code. Adhering to linting standards, using mock data, and following the outlined workflows ensures reliable and secure integrations with the VIZ blockchain.