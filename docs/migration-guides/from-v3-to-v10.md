# Migration guide from v3 to v10 version of `box-node-sdk`

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Migration guide from v3 to v10 version of `box-node-sdk`](#migration-guide-from-v3-to-v10-version-of-box-node-sdk)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Highlighting the Key Differences](#highlighting-the-key-differences)
    - [Native support for async-await and Promises](#native-support-for-async-await-and-promises)
    - [Embracing Explicitly Defined Schemas](#embracing-explicitly-defined-schemas)
    - [Immutable design](#immutable-design)
  - [Diving into Authentication](#diving-into-authentication)
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

The v10 release of `box-node-sdk` library helps Javascript and Typescripts developers to conveniently integrate with Box API.
In the contrary to the previous versions (v10 or lower), it is not manually maintained, but auto-generated
based on Open API Specification. This means you can leverage the most up-to-date Box API features in your
applications without delay. We introduced this major version bump to reflect the significant codebase changes
and to align with other Box SDKs, which will also adopt generated code starting from their v10 releases.
More information and benefits of using the new can be found in the
[README](https://github.com/box/box-node-sdk/blob/sdk-gen/README.md) file.

## Installation

To install v10 version of Box Node SDK, you can use npm or yarn or similar tool. The library is available on the
[npm](https://www.npmjs.com/package/box-node-sdk).

If you are using npm:

```console
npm install box-node-sdk@<version>
```

If you use yarn, please do this instead:

```console
yarn add box-node-sdk@<version>
```

Where `VERSION` is the version of the SDK you want to use. The next generation of the SDK starts with version `10.0.0`.

## Highlighting the Key Differences

### Native support for async-await and Promises

The v10 version of the SDK introduces a more organized and intuitive method of interacting with the Box API. Let's explore the changes:

**Old (`v3`):**

In the v3 version of the SDK, API interactions allowed for passing `callback` as the last argument

```typescript
function callback(user) {
  console.log('hello', user);
}
client.users.get('123456', {} /* options */, callback);
```

If you didn't provide the `callback` a Promise would be returned.

**New (`v10`):**

The v10 version of the SDK ensures promises are used consistently across the full SDK.

```typescript
const user = await client.users.getUserById('123456');
```

### Embracing Explicitly Defined Schemas

The v10 version of the SDK brings clarity to data interactions by providing explicit data type definitions:

**Old (`v3`):**

The v3 version of the SDK was more ambiguous, which could lead to potential issues:

```typescript
const file = await client.files.get('12345678');
/* file has generic Object type */
```

**New (`v10`):**

With the v10 version of the SDK, developers can be confident in the data structures they're working with:

```typescript
interface FileBase {
  id: string;
  type: FileBaseTypeField;
  etag?: string;
}
```

### Immutable design

The v10 version of the SDK is designed to be mostly immutable. This means that methods,
which used to modify the existing object in the v3 version of the SDK now return a new instance of the class with the modified state.
This design pattern is used to avoid side effects and make the code more predictable and easier to reason about.
Methods, which returns a new modified instance of an object, will always have a prefix `with` in their names, e.g.

**New (`v10`)**

```typescript
asUserClient: BoxClient = client.withAsUserHeader('USER_ID');
```

## Diving into Authentication

Authentication is a crucial aspect of any SDK. Let's delve into the authentication methods supported by both versions of the SDKs and understand the enhancements in the new version:

### Developer Token

The Developer Token remains a straightforward method for authentication:

**Old (`v3`):**

```typescript
var BoxSDK = require('box-node-sdk');
var sdk = new BoxSDK({
  clientID: 'YOUR-CLIENT-ID',
  clientSecret: 'YOUR-CLIENT_SECRET',
});

var client = sdk.getBasicClient('YOUR-DEVELOPER-TOKEN');
```

**New (`v10`):**

The v10 version of the SDK offers a more streamlined approach:

```typescript
import { BoxClient, BoxDeveloperTokenAuth } from 'box-node-sdk';

const auth = new BoxDeveloperTokenAuth({ token: 'DEVELOPER_TOKEN_GOES_HERE' });
const client = new BoxClient({ auth });
```

### JWT Authentication

JSON Web Tokens (JWT) offer a secure method of authentication. Here's how the process has evolved:

#### Leveraging the JWT Configuration File

**Old (`v3`):**

```typescript
var BoxSDK = require('box-node-sdk');
var jsonConfig = require('/path/to/config.json');
var sdk = BoxSDK.getPreconfiguredInstance(jsonConfig);

var serviceAccountClient = sdk.getAppAuthClient('enterprise');
```

**New (`v10`):**

The v10 version of the provides a more organized approach:

```typescript
import { BoxClient, BoxJwtAuth, JwtConfig } from 'box-node-sdk';

const jwtConfig = JwtConfig.fromConfigFile('/path/to/config.json');
const auth = new BoxJwtAuth({ config: jwtConfig });
const client = new BoxClient({ auth });
```

#### Manually Providing JWT Configuration

For those who prefer manual configurations, both version of the SDKs offer flexibility:

**Old (`v3`):**

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
  'YOUR-ENTERPRISE-ID',
);
```

**New (`v10`):**

The v10 version of the SDK introduces a more structured approach:

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

**Old (`v3`):**

```typescript
const userClient = sdk.getAppAuthClient('user', 'USER_ID');
```

**New (`v10`):**

```typescript
const userAuth = jwtAuth.withUserSubject('USER_ID');
const userClient = new BoxClient({ auth: userAuth });
```

### Client Credentials Grant

The Client Credentials Grant method is a popular choice for many developers. Let's see how it's been enhanced:

#### Service Account Token Acquisition

**Old (`v3`):**

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

**New (`v10`):**

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

**Old (`v3`):**

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

**New (`v10`):**

The v10 version of the SDK streamlines the process:

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

**Old (`v3`):**

```typescript
const client = sdk.getCCGClientForUser('USER_ID');
```

**New (`v10`):**

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

**Old (`v3`):**

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

**New (`v10`):**

The v10 version of the SDK provides more flexibility:

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

**Old (`v3`):**

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

**New (`v10`):**

The v10 version of the SDK simplifies the process:

```typescript
await oauth.getTokensAuthorizationCodeGrant('code');
const client = new BoxClient({ auth: oauth });
```

### Customizable Token Storage and Retrieval Callbacks

Token management is crucial for maintaining secure sessions. The v10 version of the SDK offers enhanced flexibility:

**Old (`v3`):**

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

**New (`v10`):**

The v10 version of the SDK allows developers to define custom classes for token storage:

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

**Old (`v3`):**

```typescript
client
  .exchangeToken('item_preview', 'https://api.box.com/2.0/files/123456789')
  .then((tokenInfo) => {
    // tokenInfo.accessToken contains the new downscoped access token
  });
```

**New (`v10`):**

```typescript
let resource = 'https://api.box.com/2.0/files/123456789';
let token = await oauth.downscopeToken(['item_preview'], resource);
const auth = new BoxDeveloperTokenAuth({ token: token.accessToken });
const client = new BoxClient({ auth });
```

### Revoke token

The difference between the v3 version and the v10 version of the SDK in the process of revoking token is as follows.

**Old (`v3`):**

```typescript
client.revokeTokens('<TOKEN>').then(() => {
  // the client's access token have been revoked
});
```

**New (`v10`):**

```typescript
await auth.revokeTokens();
```

## Configuration

### As-User header

The As-User header is used by enterprise admins to make API calls on behalf of their enterprise's users.
This requires the API request to pass an `As-User: USER-ID` header. The following examples assume that the client has
been instantiated with an access token with appropriate privileges to make As-User calls.

In the v3 version of the SDK the client `asUser(userID)` method set up the client to impersonate a given user.
It modified existing client, so that all calls made with its instance were made in context of the impersonated user.

**Old (`v3`):**

```typescript
client.asUser('USER-ID');
client.folders.getItems('0').then((items) => {
  // items contains the collection of files and folders
  // in the root folder of the user with USER-ID
});
```

**New (`v10`):**

In the v10 version of the SDK the method was renamed to `withAsUserHeader(userId: string): BoxClient`
and returns a new instance of `BoxClient` class with the As-User header appended to all API calls made by the client.

```typescript
const userClient = client.withAsUserHeader('1234567');
```

### Custom Base URLs

**Old (`v3`):**

In the v3 version of the SDK you could specify the custom base URLs, which will be used for API calls made by using
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

**New (`v10`):**

In the v10 version of the SDK this functionality has been implemented as part of the `BoxClient` class.
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

**Old (`v3`):**

In the v3 version of the SDK, you could pass the `body` as either a `JSON` object or a `string`, and it would return a `boolean` value indicating whether the message was valid.

```typescript
let isValid = BoxSDK.validateWebhookMessage(
  body,
  headers,
  primaryKey,
  secondaryKey,
);
```

**New (`v10`):**

In the v10 version of the SDK, the `WebhooksManager.validateMessage()` method requires the `body` to be of type `string`.
So if the body is in `JSON` type, you must convert it to a `string` using `JSON.stringify(body)` before calling `validateMessage()`.

```typescript
let stringBody = JSON.stringify(body);
let isValid = await WebhooksManager.validateMessage(
  stringBody,
  headers,
  primaryKey,
  { secondaryKey: secondaryKey } satisfies ValidateMessageOptionalsInput,
);
```

### Chunked upload of big files

For large files or in cases where the network connection is less reliable, you may want to upload the file in parts.
This allows a single part to fail without aborting the entire upload, and failed parts are being retried automatically.

**Old (`v3`):**

In the v3 version of the SDK, you could use the `getChunkedUploader()` method to create a chunked uploader object.
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

**New (`v10`):**

In the v10 version of the SDK, the equivalent method is `chunked_uploads.uploadBigFile()`. It accepts a `Readable` object
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
  parentFolderId,
);
```
