# Resuse Authentication and Netowrk Settings from Legacy Node SDK in SDK Gen

This guide explains three methods that help you migrate from the legacy Box Node.js SDK to the new SDK-Gen package by reusing your existing configuration.

## Overview

| Method | Purpose | Returns |
|--------|---------|---------|
| `getAuthentication()` | Extract authentication settings | SDK-Gen `Authentication` object |
| `getNetworkSession()` | Extract network settings | SDK-Gen `NetworkSession` object |
| `getSdkGenClient()` | Get a fully configured SDK-Gen client | SDK-Gen `BoxClient` |

## Quick Start

If you just want to get a working SDK-Gen client from your legacy client:

```javascript
const BoxSDK = require('box-node-sdk').default;

// Your existing legacy SDK setup
const sdk = BoxSDK.getPreconfiguredInstance(config);
const legacyClient = sdk.getAppAuthClient('enterprise');

// Get sdk gen client from legacy client
const sdkGenClient = legacyClient.getSdkGenClient();

// Use SDK-Gen client
const user = await sdkGenClient.users.getUserMe();
console.log(`User , ${user.name}!`);
```

---

## getSdkGenClient()

The easiest way to get a fully configured SDK-Gen client. Internally calls `getAuthentication()` and `getNetworkSession()`.

### Signature

```typescript
getSdkGenClient(options?: {
  authOptions?: { tokenStorage?: TokenStorage };
  networkOptions?: {
    networkClient?: NetworkClient;
    retryStrategy?: RetryStrategy;
    dataSanitizer?: DataSanitizer;
    interceptors?: Interceptor[];
    additionalHeaders?: { [key: string]: string };
  };
}): BoxClient
```

### Basic Usage

```javascript
const BoxSDK = require('box-node-sdk').default;

// Initialize legacy SDK
const sdk = BoxSDK.getPreconfiguredInstance(jwtConfig);
const legacyClient = sdk.getAppAuthClient('enterprise');

// Get SDK-Gen client
const sdkGenClient = legacyClient.getSdkGenClient();

// Make API calls
const user = await sdkGenClient.users.getUserMe();
const folder = await sdkGenClient.folders.getFolderById('0');
```

### With Custom Options

```javascript
// Custom token storage
const { InMemoryTokenStorage } = require('box-node-sdk/lib/sdk-gen/box/tokenStorage/inMemoryTokenStorage');

const sdkGenClient = legacyClient.getSdkGenClient({
  authOptions: {
    tokenStorage: new InMemoryTokenStorage(),
  },
  networkOptions: {
    additionalHeaders: {
      'X-Request-ID': 'my-tracking-id',
    },
  },
});
```

### With Custom Retry Strategy

```javascript
const { BoxRetryStrategy } = require('box-node-sdk/lib/sdk-gen/networking/retries');

const sdkGenClient = legacyClient.getSdkGenClient({
  networkOptions: {
    retryStrategy: new BoxRetryStrategy({
      maxAttempts: 10,
      retryBaseInterval: 5,
    }),
  },
});
```

---

## getAuthentication()

Extracts authentication configuration from the legacy client and returns an SDK-Gen `Authentication` object.

### Signature

```typescript
getAuthentication(options?: { 
  tokenStorage?: TokenStorage 
}): Authentication
```

### Supported Session Types

| Legacy Session | SDK-Gen Auth Type |
|---------------|-------------------|
| `BasicAPISession` | `BoxDeveloperTokenAuth` |
| `PersistentAPISession` | `BoxOAuth` |
| `AppAuthSession` | `BoxJwtAuth` |
| `CCGAPISession` | `BoxCcgAuth` |

### Usage

```javascript
// Get authentication object
const auth = legacyClient.getAuthentication();

// Use with SDK-Gen BoxClient
const { BoxClient } = require('box-node-sdk/lib/sdk-gen/client');
const sdkGenClient = new BoxClient({ auth });
```

### With Custom Token Storage

```javascript
const { InMemoryTokenStorage } = require('box-node-sdk/lib/sdk-gen/box/tokenStorage/inMemoryTokenStorage');

const customStorage = new InMemoryTokenStorage();
const auth = legacyClient.getAuthentication({
  tokenStorage: customStorage,
});
```

---

## getNetworkSession()

Extracts network configuration from the legacy client and returns an SDK-Gen `NetworkSession` object.

### Signature

```typescript
getNetworkSession(options?: {
  networkClient?: NetworkClient;
  retryStrategy?: RetryStrategy;
  dataSanitizer?: DataSanitizer;
  interceptors?: Interceptor[];
  additionalHeaders?: { [key: string]: string };
}): NetworkSession
```

### Configuration Mapping

| Legacy Config | SDK-Gen NetworkSession |
|--------------|------------------------|
| `apiRootURL` | `baseUrls.baseUrl` |
| `uploadAPIRootURL` | `baseUrls.uploadUrl` |
| `authorizeRootURL` | `baseUrls.oauth2Url` |
| `proxy.url`, `proxy.username`, `proxy.password` | `proxyConfig` |
| `request.headers` | `additionalHeaders` |
| `numMaxRetries` | `retryStrategy.maxAttempts` |
| `retryIntervalMS` | `retryStrategy.retryBaseInterval` (converted to seconds) |
| `request.agentOptions` | `agentOptions` |

### Usage

```javascript
// Get network session
const networkSession = legacyClient.getNetworkSession();

// Use with SDK-Gen BoxClient
const { BoxClient } = require('box-node-sdk/lib/sdk-gen/client');
const auth = legacyClient.getAuthentication();
const sdkGenClient = new BoxClient({ auth, networkSession });
```

### With Custom Headers

```javascript
const networkSession = legacyClient.getNetworkSession({
  additionalHeaders: {
    'X-Custom-Header': 'custom-value',
    'X-Request-ID': 'tracking-123',
  },
});
```

### With Custom Retry Strategy

```javascript
const { BoxRetryStrategy } = require('box-node-sdk/lib/sdk-gen/networking/retries');

const networkSession = legacyClient.getNetworkSession({
  retryStrategy: new BoxRetryStrategy({
    maxAttempts: 15,
    retryBaseInterval: 3,
  }),
});
```

### With Request Interceptors

```javascript
const networkSession = legacyClient.getNetworkSession({
  interceptors: [
    {
      beforeRequest: (options) => {
        console.log('Request:', options.url);
        return options;
      },
      afterResponse: (response) => {
        console.log('Response:', response.status);
        return response;
      },
    },
  ],
});
```


