# Migration guide from `box-node-sdk` to `sdk-gen`

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Migration guide from `box-node-sdk` to `sdk-gen`](#migration-guide-from-box-node-sdk-to-sdk-gen)
  - [Introduction](#introduction)
    - [Who is this for?](#who-is-this-for)
  - [Key Differences](#key-differences)
    - [Native support for async-await and Promises](#native-support-for-async-await-and-promises)
    - [Embracing Explicitly Defined Schemas](#embracing-explicitly-defined-schemas)
    - [Immutable design](#immutable-design)
  - [Authentication](#authentication)
    - [Developer Token](#developer-token)
    - [JWT Authentication](#jwt-authentication)
      - [Leveraging the JWT Configuration File](#leveraging-the-jwt-configuration-file)
      - [Manually Providing JWT Configuration](#manually-providing-jwt-configuration)
      - [User Authentication Simplified](#user-authentication-simplified)
    - [Client Credentials Grant](#client-credentials-grant)
      - [Service Account Token Acquisition](#service-account-token-acquisition)
      - [User Token Acquisition](#user-token-acquisition)
    - [Smooth Switching between Service Account and User](#smooth-switching-between-service-account-and-user)
    - [OAuth 2.0 Authentication](#oauth-20-authentication)
      - [Fetching the Authorization URL](#fetching-the-authorization-url)
      - [Seamless Authentication](#seamless-authentication)
    - [Customizable Token Storage and Retrieval Callbacks](#customizable-token-storage-and-retrieval-callbacks)
    - [Downscope token](#downscope-token)
    - [Revoke token](#revoke-token)
  - [Configuration](#configuration)
    - [As-User header](#as-user-header)
    - [Custom Base URLs](#custom-base-urls)
  - [Convenience methods](#convenience-methods)
    - [Webhook validation](#webhook-validation)
    - [Chunked upload of big files](#chunked-upload-of-big-files)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

Version availability:

- v3: ships only `box-node-sdk` package
- v4: ships both `box-node-sdk` and `sdk-gen` modules (side-by-side)
- v10: ships only `sdk-gen` module.

**Important**: In v4, the `sdk-gen` module is under the `box-node-sdk/sdk-gen` namespace. In v10, the `sdk-gen` module is under the `box-node-sdk` namespace with `box-node-sdk/sdk-gen` alias namespace for backward compatibility.

This document focuses on helping you migrate code from the manually maintained `box-node-sdk` module to the generated `sdk-gen` namespace.
Many APIs were redesigned for consistency and modern Javascript and Typescript patterns, so this guide calls out how to adopt the new shapes safely and incrementally.

Supported migration paths:

- v3 → v4: adopt `sdk-gen` gradually while keeping existing `box-node-sdk` usage
- v3 → v10+: migrate directly to `sdk-gen` module only
- v4 (within the same version): move usage from `box-node-sdk` to `sdk-gen` gradually

For comprehensive API docs with sample code for all methods, see the repository documentation in the root `docs` directory: [`docs/`](../docs/).

We recommend using `sdk-gen` as the preferred SDK going forward. This SDK is automatically generated from the
Box OpenAPI specification, ensuring consistency, reliability, and full API coverage.
Key Benefits:

- Comprehensive Coverage: Supports all Box API endpoints with consistent and predictable method signatures.
- Rapid Feature Availability: Automatically includes new features as soon as they are released in the Box API.
- Strong Typing: Provides complete type hints for every method and data structure, improving development efficiency and reducing runtime errors.
- Explicit Data Models: Includes clear, well-defined models for all API resources to improve readability and maintainability.
- Immutable Design: Built for immutability, making code behavior more predictable and easier to reason about.
- Rich Documentation: Offers detailed usage examples for every API method to help developers get started quickly.

### Who is this for?

- Developers with existing code using `box-node-sdk` who want to start using `sdk-gen` APIs.
- Developers using v4 of Box Node SDK that want to transition usage from manually maintained `box-node-sdk` module to generated `sdk-gen` within the same app.

## Key Differences

### Native support for async-await and Promises

The v10 version of the SDK introduces a more organized and intuitive method of interacting with the Box API. Let's explore the changes:

**Manual (`box-node-sdk`):**

In the manually maintained `box-node-sdk` module, API interactions allowed for passing `callback` as the last argument

```typescript
function callback(user) {
  console.log('hello', user);
}
client.users.get('123456', {} /* options */, callback);
```

If you didn't provide the `callback` a Promise would be returned.

**Generated (`sdk-gen`):**

The generated `sdk-gen` module ensures promises are used consistently across the full SDK.

```typescript
const user = await client.users.getUserById('123456');
```

### Embracing Explicitly Defined Schemas

The generated `sdk-gen` module brings clarity to data interactions by providing explicit data type definitions:

**Manual (`box-node-sdk`):**

The manually maintained `box-node-sdk` module was more ambiguous, which could lead to potential issues:

```typescript
const file = await client.files.get('12345678');
/* file has generic Object type */
```

**Generated (`sdk-gen`):**

With the generated `sdk-gen` module, developers can be confident in the data structures they're working with:

```typescript
interface FileBase {
  id: string;
  type: FileBaseTypeField;
  etag?: string;
}
```

### Immutable design

The generated `sdk-gen` module is designed to be mostly immutable. This means that methods,
which used to modify the existing object in the manually maintained `box-node-sdk` module now return a new instance of the class with the modified state.
This design pattern is used to avoid side effects and make the code more predictable and easier to reason about.
Methods, which returns a new modified instance of an object, will always have a prefix `with` in their names, e.g.

**Generated (`sdk-gen`)**

```typescript
asUserClient: BoxClient = client.withAsUserHeader('USER_ID');
```

## Authentication

Authentication is a crucial aspect of any SDK. Let's delve into the authentication methods supported by both versions of the SDKs and understand the enhancements in the new version:

### Developer Token

The Developer Token remains a straightforward method for authentication:

**Manual (`box-node-sdk`):**

```typescript
var BoxSDK = require('box-node-sdk');
var sdk = new BoxSDK({
  clientID: 'YOUR-CLIENT-ID',
  clientSecret: 'YOUR-CLIENT_SECRET',
});

var client = sdk.getBasicClient('YOUR-DEVELOPER-TOKEN');
```

**Generated (`sdk-gen`):**

The generated `sdk-gen` module offers a more streamlined approach:

```typescript
import { BoxClient, BoxDeveloperTokenAuth } from 'box-node-sdk';

const auth = new BoxDeveloperTokenAuth({ token: 'DEVELOPER_TOKEN_GOES_HERE' });
const client = new BoxClient({ auth });
```

### JWT Authentication

JSON Web Tokens (JWT) offer a secure method of authentication. Here's how the process has evolved:

#### Leveraging the JWT Configuration File

**Manual (`box-node-sdk`):**

```typescript
var BoxSDK = require('box-node-sdk');
var jsonConfig = require('/path/to/config.json');
var sdk = BoxSDK.getPreconfiguredInstance(jsonConfig);

var serviceAccountClient = sdk.getAppAuthClient('enterprise');
```

**Generated (`sdk-gen`):**

The generated `sdk-gen` module provides a more organized approach:

```typescript
import { BoxClient, BoxJwtAuth, JwtConfig } from 'box-node-sdk';

const jwtConfig = JwtConfig.fromConfigFile('/path/to/config.json');
const auth = new BoxJwtAuth({ config: jwtConfig });
const client = new BoxClient({ auth });
```

#### Manually Providing JWT Configuration

For those who prefer manual configurations, both version of the SDKs offer flexibility:

**Manual (`box-node-sdk`):**

```typescript
var BoxSDK = require('box-node-sdk');
var sdk = new BoxSDK({
  clientID: 'YOUR-CLIENT-ID',
  clientSecret: 'YOUR-CLIENT_SECRET',
  appAuth: {
    keyID: 'YOUR-KEY-ID',
    privateKey: 'YOUR-PRIVATE_KEY',
    passphrase: 'YOUR-PRIVATE-KEY-PASSPHRASE',
  },
});

var serviceAccountClient = sdk.getAppAuthClient(
  'enterprise',
  'YOUR-ENTERPRISE-ID'
);
```

**Generated (`sdk-gen`):**

The generated `sdk-gen` module introduces a more structured approach:

```typescript
import { BoxJwtAuth, JwtConfig } from 'box-node-sdk';

const jwtConfig = new JwtConfig({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  enterpriseId: 'YOUR_ENTERPRISE_ID',
  userId: 'USER_ID',
  jwtKeyId: 'YOUR_JWT_KEY_ID',
  privateKey: 'YOUR_PRIVATE_KEY',
  privateKeyPassphrase: 'PASSPHRASE',
  jwtAlgorithm: 'RS256',
});
const auth = new BoxJwtAuth({ config: jwtConfig });
```

#### User Authentication Simplified

To authenticate as user you need to call
`withUserSubject` method with id of the user to authenticate. The method returns a new instance of
`BoxJwtAuth` class, which will perform authentication call in scope of the user on the first API call.
The new auth instance can be used to create a new user client instance.

**Manual (`box-node-sdk`):**

```typescript
const userClient = sdk.getAppAuthClient('user', 'USER_ID');
```

**Generated (`sdk-gen`):**

```typescript
const userAuth = jwtAuth.withUserSubject('USER_ID');
const userClient = new BoxClient({ auth: userAuth });
```

### Client Credentials Grant

The Client Credentials Grant method is a popular choice for many developers. Let's see how it's been enhanced:

#### Service Account Token Acquisition

**Manual (`box-node-sdk`):**

```typescript
const BoxSDK = require('box-node-sdk');
const sdkConfig = {
  boxAppSettings: {
    clientID: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
  },
  enterpriseID: 'ENTERPRISE_ID',
};
const sdk = BoxSDK.getPreconfiguredInstance(sdkConfig);

const client = sdk.getAnonymousClient();
```

**Generated (`sdk-gen`):**

The v10 version of the SDK offers a more organized structure:

```typescript
import { CcgConfig, BoxCcgAuth, BoxClient } from 'box-node-sdk';

const ccgConfig = new CcgConfig({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  enterpriseId: 'YOUR_ENTERPRISE_ID',
});
const auth = new BoxCcgAuth({ config: ccgConfig });
const client = new BoxClient({ auth });
```

#### User Token Acquisition

**Manual (`box-node-sdk`):**

```typescript
const BoxSDK = require('box-node-sdk');
const sdkConfig = {
  boxAppSettings: {
    clientID: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
  },
  enterpriseID: 'ENTERPRISE_ID', // The enterprise id in this case is optional and can be omitted.
};
const sdk = BoxSDK.getPreconfiguredInstance(sdkConfig);

const client = sdk.getCCGClientForUser('USER_ID');
```

**Generated (`sdk-gen`):**

The generated `sdk-gen` module streamlines the process:

```typescript
import { CcgConfig, BoxCcgAuth, BoxClient } from 'box-node-sdk';

const ccgConfig = new CcgConfig({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  userId: 'YOUR_USER_ID',
});
const auth = new BoxCcgAuth({ config: ccgConfig });
const client = new BoxClient({ auth });
```

### Smooth Switching between Service Account and User

In the v10 version of the SDK, to keep the immutability design, the methods responsible for switching authenticated subject return
a new instance of `BoxCcgAuth` class. The new instance will fetch a new token on the next API call.
The new auth instance can be used to create a new client instance.
The old instance of `BoxCcgAuth` class will remain unchanged and will still use the old token.

**Manual (`box-node-sdk`):**

```typescript
const client = sdk.getCCGClientForUser('USER_ID');
```

**Generated (`sdk-gen`):**

To authenticate with enterprise subject call:

```typescript
const enterpriseAuth = ccgAuth.withEnterpriseSubject('YOUR_ENTERPRISE_ID');
const enterpriseClient = new BoxClient({ auth: enterpriseAuth });
```

To authenticate with user subject call:

```typescript
const userAuth = ccgAuth.withUserSubject('YOUR_USER_ID');
const userClient = new BoxClient({ auth: userAuth });
```

### OAuth 2.0 Authentication

OAuth 2.0 remains a robust authentication method. Let's explore the improvements:

#### Fetching the Authorization URL

**Manual (`box-node-sdk`):**

```typescript
var BoxSDK = require('box-node-sdk');
var sdk = new BoxSDK({
  clientID: 'YOUR-CLIENT-ID',
  clientSecret: 'YOUR-CLIENT_SECRET',
});

// the URL to redirect the user to
var authorize_url = sdk.getAuthorizeURL({
  response_type: 'code',
});
```

**Generated (`sdk-gen`):**

The generated `sdk-gen` module provides more flexibility:

```typescript
import { BoxOAuth, OAuthConfig } from 'box-node-sdk';

const config = new OAuthConfig({
  clientId: 'OAUTH_CLIENT_ID',
  clientSecret: 'OAUTH_CLIENT_SECRET',
});
const oauth = new BoxOAuth({ config: config });

var authorize_url = oauth.getAuthorizeUrl();
```

#### Seamless Authentication

**Manual (`box-node-sdk`):**

```typescript
sdk.getTokensAuthorizationCodeGrant('<CODE>', null, function (err, tokenInfo) {
  if (err) {
    // handle error
  }

  var tokenStore = new TokenStore();
  tokenStore.write(tokenInfo, function (storeErr) {
    if (storeErr) {
      // handle token write error
    }

    var client = sdk.getPersistentClient(tokenInfo, tokenStore);
  });
});
```

**Generated (`sdk-gen`):**

The generated `sdk-gen` module simplifies the process:

```typescript
await oauth.getTokensAuthorizationCodeGrant('code');
const client = new BoxClient({ auth: oauth });
```

### Customizable Token Storage and Retrieval Callbacks

Token management is crucial for maintaining secure sessions. The v10 version of the SDK offers enhanced flexibility:

**Manual (`box-node-sdk`):**

```typescript
function TokenStore() {
  // The token store constructor should create a specific store instance
  // for the user in question — it may need to take in a user ID or other
  // identifier.
}

TokenStore.prototype.read = function (callback) {
  // Read the user's tokens from your data store and
  // call the callback.
  // callback(error) if some error occured
  // callback(null, tokenInfo) if the read succeeded
};

TokenStore.prototype.write = function (tokenInfo, callback) {
  // Write the token information to the store.
  // The tokenInfo argument is an Object, and can be
  // serialized as JSON for storage.
  // Call the callback after the write.
  // callback(error) if some error occured
  // callback(null) if the write succeeded
};

TokenStore.prototype.clear = function (callback) {
  // Delete the user's token information from the store,
  // and call the callback after the write.
  // callback(error) if some error occured
  // callback(null) if the deletion succeeded
};
```

**Generated (`sdk-gen`):**

The generated `sdk-gen` module allows developers to define custom classes for token storage:

```typescript
import { BoxOAuth } from 'box-node-sdk';
import { TokenStorage } from 'box-node-sdk/box';
import { AccessToken } from 'box-node-sdk/schemas';

class CustomTokenStorage extends TokenStorage {
  async store(token: AccessToken): Promise<undefined> {
    // Store token
  }

  async get(): Promise<undefined | AccessToken> {
    // Retrieve token
    return token;
  }

  async clear(): Promise<undefined> {
    // Clear token
  }
}

const tokenStorage = new CustomTokenStorage();
const authConfig = { /* ... , */ tokenStorage };
const auth = new BoxOAuth({ config: authConfig });
```

### Downscope token

To process of downscoping token in The v10 version of the SDK is enhanced and more flexible.

**Manual (`box-node-sdk`):**

```typescript
client
  .exchangeToken('item_preview', 'https://api.box.com/2.0/files/123456789')
  .then((tokenInfo) => {
    // tokenInfo.accessToken contains the new downscoped access token
  });
```

**Generated (`sdk-gen`):**

```typescript
let resource = 'https://api.box.com/2.0/files/123456789';
let token = await oauth.downscopeToken(['item_preview'], resource);
const auth = new BoxDeveloperTokenAuth({ token: token.accessToken });
const client = new BoxClient({ auth });
```

### Revoke token

The difference between the manually maintained `box-node-sdk` module and the generated `sdk-gen` module in the process of revoking token is as follows.

**Manual (`box-node-sdk`):**

```typescript
client.revokeTokens('<TOKEN>').then(() => {
  // the client's access token have been revoked
});
```

**Generated (`sdk-gen`):**

```typescript
await auth.revokeTokens();
```

## Configuration

### As-User header

The As-User header is used by enterprise admins to make API calls on behalf of their enterprise's users.
This requires the API request to pass an `As-User: USER-ID` header. The following examples assume that the client has
been instantiated with an access token with appropriate privileges to make As-User calls.

In the manually maintained `box-node-sdk` module the client `asUser(userID)` method set up the client to impersonate a given user.
It modified existing client, so that all calls made with its instance were made in context of the impersonated user.

**Manual (`box-node-sdk`):**

```typescript
client.asUser('USER-ID');
client.folders.getItems('0').then((items) => {
  // items contains the collection of files and folders
  // in the root folder of the user with USER-ID
});
```

**Generated (`sdk-gen`):**

In the generated `sdk-gen` module the method was renamed to `withAsUserHeader(userId: string): BoxClient`
and returns a new instance of `BoxClient` class with the As-User header appended to all API calls made by the client.

```typescript
const userClient = client.withAsUserHeader('1234567');
```

### Custom Base URLs

**Manual (`box-node-sdk`):**

In the manually maintained `box-node-sdk` module you could specify the custom base URLs, which will be used for API calls made by using
the `configure` method on the SDK instance:

```typescript
const sdk = BoxSDKNode.getPreconfiguredInstance(APP_SETTINGS);
var additonalParams = {
  apiRootURL: 'https://my.company.url.com',
  uploadAPIRootURL: 'https://my.company.url.com/upload',
  authorizeRootURL: 'https://my.company.url.com/authorize',
};
sdk.configure(additonalParams);
```

**Generated (`sdk-gen`):**

In the generated `sdk-gen` module this functionality has been implemented as part of the `BoxClient` class.
By calling the `client.withCustomBaseUrls()` method, you can specify the custom base URLs that will be used for API
calls made by client. Following the immutability pattern, this call creates a new client, leaving the original client unmodified.

```typescript
const newClient = client.withCustomBaseUrls({
  baseUrl: 'https://api.box.com',
  uploadUrl: 'https://upload.box.com/api',
  oauth2Url: 'https://account.box.com/api/oauth2',
});
```

## Convenience methods

### Webhook validation

Webhook validation is used to validate a webhook message by verifying the signature and the delivery timestamp.

**Manual (`box-node-sdk`):**

In the manually maintained `box-node-sdk` module, you could pass the `body` as either a `JSON` object or a `string`, and it would return a `boolean` value indicating whether the message was valid.

```typescript
let isValid = BoxSDK.validateWebhookMessage(
  body,
  headers,
  primaryKey,
  secondaryKey
);
```

**Generated (`sdk-gen`):**

In the generated `sdk-gen` module, the `WebhooksManager.validateMessage()` method requires the `body` to be of type `string`.
So if the body is in `JSON` type, you must convert it to a `string` using `JSON.stringify(body)` before calling `validateMessage()`.

```typescript
let stringBody = JSON.stringify(body);
let isValid = await WebhooksManager.validateMessage(
  stringBody,
  headers,
  primaryKey,
  { secondaryKey: secondaryKey } satisfies ValidateMessageOptionalsInput
);
```

### Chunked upload of big files

For large files or in cases where the network connection is less reliable, you may want to upload the file in parts.
This allows a single part to fail without aborting the entire upload, and failed parts are being retried automatically.

**Manual (`box-node-sdk`):**

In the manually maintained `box-node-sdk` module, you could use the `getChunkedUploader()` method to create a chunked uploader object.
Then, you would call the `start()` method to begin the upload process.
The `getChunkedUploader()` method requires the `parentFolderId`, `fileSize`, `fileName` and `stream` parameters.

```typescript
var stream = fs.createReadStream('/path/to/file.txt');
var fileName = 'new_name.txt';
var fileSize = fs.statSync('/path/to/file.txt').size;
var parentFolderId = '0';
client.files
  .getChunkedUploader(parentFolderId, fileSize, fileName, stream)
  .then((uploader) => uploader.start())
  .then((file) => {
    /* ... */
  });
```

**Generated (`sdk-gen`):**

In the generated `sdk-gen` module, the equivalent method is `chunked_uploads.uploadBigFile()`. It accepts a `Readable` object
as the `file` parameter, and the `fileName` and `fileSize` parameters are now passed as arguments.
The `parentFolderId` parameter is also required to specify the folder where the file will be uploaded.

```typescript
import { File } from 'box-node-sdk/schemas/file';

var fileByteStream = fs.createReadStream('/path/to/file.txt');
var fileName = 'new_name.txt';
var fileSize = fs.statSync('/path/to/file.txt').size;
var parentFolderId = '0';
const uploadedFile: File = await client.chunkedUploads.uploadBigFile(
  fileByteStream,
  fileName,
  fileSize,
  parentFolderId
);
```
