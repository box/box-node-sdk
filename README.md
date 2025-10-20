<p align="center">
  <img src="https://github.com/box/sdks/blob/master/images/box-dev-logo.png" alt= “box-dev-logo” width="30%" height="50%">
</p>


# Box Node.js SDK

[![Project Status](http://opensource.box.com/badges/active.svg)](http://opensource.box.com/badges)
[![Known Vulnerabilities](https://snyk.io/test/github/box/box-node-sdk/badge.svg)](https://snyk.io/test/github/box/box-node-sdk)
![Platform](https://img.shields.io/badge/node-18--24-blue)
[![Coverage](https://coveralls.io/repos/github/box/box-node-sdk/badge.svg?branch=main)](https://coveralls.io/github/box/box-node-sdk?branch=main)

A Node.js interface to the [Box Content API](https://developer.box.com/reference/).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Box Node.js SDK](#box-nodejs-sdk)
- [Supported versions](#supported-versions)
  - [Version v4](#version-v4)
  - [Version v10](#version-v10)
- [Installation](#installation)
  - [Installing v10 (Generated SDK only)](#installing-v10-generated-sdk-only)
  - [Installing v4 (Both Generated and Manual SDK)](#installing-v4-both-generated-and-manual-sdk)
- [Getting Started](#getting-started)
  - [With generated SDK](#with-generated-sdk)
  - [With manually written SDK](#with-manually-written-sdk)
- [Generated SDK](#generated-sdk)
  - [Authentication](#authentication)
  - [Documentation](#documentation)
- [Manually Written SDK (deprecated)](#manually-written-sdk-deprecated)
  - [Creating API Clients](#creating-api-clients)
  - [Basic Client](#basic-client)
  - [Persistent Client](#persistent-client)
  - [App Auth Client](#app-auth-client)
  - [Using the Client to Make API Calls](#using-the-client-to-make-api-calls)
  - [Constructing API Calls Manually](#constructing-api-calls-manually)
- [FIPS 140-2 Compliance](#fips-140-2-compliance)
- [Versions](#versions)
  - [Supported Version](#supported-version)
  - [Version schedule](#version-schedule)
- [Questions, Bugs, and Feature Requests?](#questions-bugs-and-feature-requests)
- [Contributing to the Box Node SDK](#contributing-to-the-box-node-sdk)
- [Changelog](#changelog)
- [Upgrades](#upgrades)
- [Documentation](#documentation-1)
- [Copyright and License](#copyright-and-license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


# Supported versions

## Version v4

In v4 of the Box Node SDK, we are introducing a version that consolidates both the manually written SDK (formerly known as v3) and the generated SDK (currently in v10, formerly known as [box-typescript-sdk-gen](https://github.com/box/box-typescript-sdk-gen)) into a single SDK package for improved usability and maintenance. This allows developers to use both the manually written SDK and the generated SDK in the same project.

Version v4 of the Box Node SDK will be supported until 2027. During this period, the manually written SDK will be marked as deprecated and will receive only bug fixes and security updates.
All new features and functionality will be provided exclusively in the `sdk-gen` namespace.

The codebase for v4 of the Box Node SDK is currently available in the [combined-sdk](https://github.com/box/box-node-sdk/tree/combined-sdk) branch.
Migration guide for migrating from manually written SDK to generated SDK can be found [here](./docs/migration-guides/from-typescript-sdk-gen-v1-to-box-node-sdk-v4.md).

Version v4 is intended for:

- Existing developers of the Box Node SDK, who want to access new APIs features while keeping minimum changes to their existing code.
- Existing developers who are in process of migrating to the generated SDK, but do not want to move all functions immediately.

## Version v10

Starting from v10, the Box Node SDK will only contain the generated SDK, and will fully remove the manually written SDK.
The codebase for v10 of the Box Node SDK is currently available in the [sdk-gen](https://github.com/box/box-node-sdk/tree/sdk-gen) branch.

Version v10 is intended for:

- New developers of the Box Node SDK, who want to use the latest and greatest features of the Box API.
- Developers already working with the [Box TypeScript SDK Gen](https://github.com/box/box-typescript-sdk-gen), who want to migrate to the Box Node SDK package name.

You can find the migration guide [here](https://github.com/box/box-node-sdk/blob/sdk-gen/docs/migration-guides/from-box-typescript-sdk-gen-v1-to-box-node-sdk-v10.md) for transitioning from Box TypeScript SDK Gen to Box Node SDK v10. If you have any questions, please create an issue in the repository or reach out to [Box Developer Support](https://developer.box.com/support/).

# Installation

For general Node SDK installation details, see the [Box Developer documentation](https://developer.box.com/guides/tooling/sdks/node/).

## Installing v10 (Generated SDK only)

If you want to use only the generated SDK with the latest features:

```bash
npm install --save box-node-sdk@^10
```

## Installing v4 (Both Generated and Manual SDK)

If you need to use both the generated SDK and the manually written SDK (for migration purposes):

```bash
npm install --save box-node-sdk@^4
```

In version v4, the manually written SDK is available in the `box-node-sdk` package, and the generated SDK is available in the `box-node-sdk/sdk-gen` namespace.

# Getting Started

To get started with the SDK, get a Developer Token from the Configuration page
of your platform app in the [Box Developer Console][dev-console].
You can use this token to make test calls for your own Box account.

[dev-console]: https://app.box.com/developers/console

## With generated SDK

The SDK provides a `BoxDeveloperTokenAuth` class, which allows you to authenticate using your Developer Token. Use an instance of `BoxDeveloperTokenAuth` to initialize a `BoxClient` object. Using the `BoxClient` object you can access managers, which allow you to perform operations on your Box account.

The example below demonstrates how to authenticate with Developer Token and print names of all items inside a root folder.

```js
const { BoxClient, BoxDeveloperTokenAuth } = require('box-node-sdk/sdk-gen');

async function main(token) {
  let auth = new BoxDeveloperTokenAuth({ token });
  let client = new BoxClient({ auth });
  let entries = (await client.folders.getFolderItems('0')).entries;
  entries.forEach((entry) => console.log(entry));
}

main('INSERT YOUR DEVELOPER TOKEN HERE');
```

## With manually written SDK

From this version v4, we are introducing the ESM and CJS modules support for the SDK.
To use the SDK in ESM mode, you can use the following import:
```js
import { BoxSDK } from 'box-node-sdk';
```

To use the SDK in CJS mode, you can use the following import:
```js
const BoxSDK = require('box-node-sdk').default;
```

Then, you can use the SDK to make API calls. For example:
```js
// Initialize the SDK with your app credentials
var sdk = new BoxSDK({
  clientID: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET',
});

// Create a basic API client, which does not automatically refresh the access token
var client = sdk.getBasicClient('DEVELOPER_TOKEN');

// Get your own user object from the Box API
// All client methods return a promise that resolves to the results of the API call,
// or rejects when an error occurs
client.users
  .get(client.CURRENT_USER_ID)
  .then((user) => console.log('Hello', user.name, '!'))
  .catch((err) => console.log('Got an error!', err));
```


# Generated SDK

The following sections provide detailed documentation for the generated SDK.

## Authentication

The generated SDK supports multiple authentication methods to fit different use cases:

- **[Developer Token](./docs/sdk-gen/authentication.md#developer-token)** - For quick testing and development
- **[OAuth 2.0](./docs/sdk-gen/authentication.md#oauth-20-auth)** - For integrating with existing Box users
- **[JWT Auth](./docs/sdk-gen/authentication.md#jwt-auth)** - Server-to-server authentication for enterprise applications
- **[Client Credentials Grant](./docs/sdk-gen/authentication.md#client-credentials-grant)** - Alternative server-to-server authentication method

For detailed information on each authentication method, including setup instructions and code examples, please see the [Authentication Guide](./docs/sdk-gen/authentication.md).

## Documentation

Complete documentation for the generated SDK is available in the [`./docs/sdk-gen`](./docs/sdk-gen).

# Manually Written SDK (deprecated)

The following sections provide detailed documentation for the manually written SDK.

## Creating API Clients

Clients are used to communicate with the API on behalf of a user.

Box supports three different types of client:

- **Basic Client:** Simple, makes calls via the given access token until the access token expires
- **Persistent Client:** For use with traditional OAuth2 apps, can refresh its tokens automatically and persist them via a token store
- **App Auth Client:** Uses the app auth JWT grant to act on behalf of app/managed users and create new tokens automatically

## Basic Client

Returns a Box Client with a Basic API Session. The client is able to make requests on behalf of a user. A basic session has no access to a user's refresh token. Because of this, once the session's tokens expire the client cannot recover and a new session will need to be generated.

```js
var client = BoxSDK.getBasicClient('ACCESS_TOKEN');
```

## Persistent Client

Returns a Box Client with a persistent API session. A persistent API session helps manage the user's tokens, and can refresh them automatically if the access token expires. If a central data-store is given, the session can read & write tokens to it.

> NOTE: If tokenInfo or tokenStore are formatted incorrectly, this method will throw an error. If you haven't explicitly created either of these objects or are otherwise not completely confident in their validity, you should wrap your call to getPersistentClient in a try-catch to handle any potential errors.

If you do not provide a token store object, the SDK will continue refreshing tokens locally as long
as the Node.js process lives, but will not able to restore the user's authentication on process
restart or share that authentication state between different processes.

```js
var client = sdk.getPersistentClient(tokenInfo, null);
```

Providing a token store will allow the SDK to persist the user's authentication state
so that you can resume making API calls as a user if the Node.js process needs to restart,
or share the authentication state between multiple different processes.

```js
var client = sdk.getPersistentClient(tokenInfo, tokenStore);
```

The token store is the interface used by persistent clients to interact with the consumer app's central storage layer. For a token store to be valid, it must have the following three methods:

```js
store.read(function (err, data) {}); // read TokenInfo from app central store.
store.write(tokenInfo, function (err, data) {}); // write TokenInfo to the app's central store.
store.clear(function (err, data) {}); // delete TokenInfo from the app's central store.
```

Note that these methods don't pass in identifying information as arguments. You'll most likely need to create them on-demand for each client.

## App Auth Client

App Auth allows an platform app to fully manage the Box accounts of its users; they do not
have direct login credentials to Box and all operations are performed through the API
using a JWT grant.

If you have a JSON configuration file from the [Box Developer Console][dev-console]
that includes your private key information, you can import that directly to create an SDK instance:

```js
var sdkConfig = require('/path/to/config.json');
var sdk = BoxSDK.getPreconfiguredInstance(sdkConfig);

// Get the service account client, used to create and manage app user accounts
// The enterprise ID is pre-populated by the JSON configuration,
// so you don't need to specify it here
var serviceAccountClient = sdk.getAppAuthClient('enterprise');

// Get an app user or managed user client
var appUserClient = sdk.getAppAuthClient('user', 'YOUR-APP-USER-ID');
```

Otherwise, you can manually pass the necessary configuration parameters to the SDK:

```js
var sdk = new BoxSDK({
  clientID: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET',
  appAuth: {
    keyID: 'PUBLIC_KEY_ID',
    privateKey: 'PRIVATE_KEY',
    passphrase: 'PRIVATE_KEY_PASSPHRASE',
  },
});

// Get the service account client, used to create and manage app user accounts
var serviceAccountClient = sdk.getAppAuthClient(
  'enterprise',
  'APP_ENTERPRISE_ID'
);

// Get an app user or managed user client
var appUserClient = sdk.getAppAuthClient('user', 'YOUR-APP-USER-ID');
```

## Using the Client to Make API Calls

The different API endpoints you can call are represented as methods, grouped into
managers by the type of object they interact with.

For example:

```js
// Get the user object for the current user
client.users
  .get(client.CURRENT_USER_ID)
  .then((currentUser) => {
    /* ... */
  })
  .catch((error) => {
    /* handle any errors */
  });

// Update the name for folder with ID 123
client.folders
  .update('123', { name: 'New Folder Name' })
  .then((folderInfo) => {
    /* ... */
  })
  .catch((error) => {
    /* handle any errors */
  });

// Upload a new file to folder 123
client.files
  .uploadFile('123', 'bicycle.png', fileContents)
  .then((fileObject) => {
    /* ... */
  })
  .catch((error) => {
    /* handle any errors */
  });

// Delete the comment with ID 456
client.comments
  .delete('456')
  .then(() => {
    /* ... */
  })
  .catch((error) => {
    /* handle any errors */
  });
```

For complete documentation about the available operations, please see
the [SDK documentation pages](./docs) and the auto-generated
[JSDocs](https://rawgit.com/box/box-node-sdk/main/docs/jsdoc/index.html).
These contain detailed information about which methods are available and
how to use them.

## Constructing API Calls Manually

The SDK also exposes low-level request methods for constructing your own API calls.
These can be useful for adding your own API calls that aren't yet explicitly supported by the SDK.

The low-level methods always return a response object that contains the raw API response, and do not
turn non-2xx status codes into errors like the normal client methods do.

```js
// GET /files/123?fields=id,name
client.get('/files/123', {qs: {fields: 'id,name'}})
	.then(response => { /* ... */ })
	.catch(error => { /* handle any errors */ });

// PUT /files/123
// {
//     "name": "New File Name"
// }
client.put('/files/123', {body: {name: 'New File Name'}});
	.then(response => { /* ... */ })
	.catch(error => { /* handle any errors */ });

// DELETE /files/123
client.del('/files/123');
	.then(response => { /* ... */ })
	.catch(error => { /* handle any errors */ });
```

# FIPS 140-2 Compliance

The Box Node SDK allows the use of FIPS 140-2 validated SSL libraries, such as OpenSSL 3.0.
However, some actions are required to enable this functionality.

By default, the version of OpenSSL Node.js includes is not FIPS enabled. Therefore, if you want to use OpenSSL 3.0 with FIPS, you need to [build OpenSSL 3.0 with FIPS enabled](https://github.com/openssl/openssl/blob/master/README-FIPS.md) and then build Node.js use the shared OpenSSL 3.0 library.

According to [Node.js OpenSSL Strategy](https://github.com/nodejs/TSC/blob/main/OpenSSL-Strategy.md) document, you can use the OpenSSL 3.0 from Node.js v16 or later.

# Versions

We use a modified version of [Semantic Versioning](https://semver.org/) for all changes. See [version strategy](VERSIONS.md) for details which is effective from 30 July 2022.

## Supported Version

Currently, we support versions v10 and v4 of the SDK. New features and functionality are added to v10, while the manually written portion of v4 receives bug fixes and security updates only.

A current release is on the leading edge of our SDK development, and is intended for customers who are in active development and want the latest and greatest features.  
Instead of stating a release date for a new feature, we set a fixed minor or patch release cadence of maximum 2-3 months (while we may release more often).
At the same time, there is no schedule for major or breaking release. Instead, we will communicate one quarter in advance the upcoming breaking change to
allow customers to plan for the upgrade. We always recommend that all users run the latest available minor release for whatever major version is in use.
We highly recommend upgrading to the latest SDK major release at the earliest convenient time and before the EOL date.

## Version schedule

| Version | Supported Environments  | State      | First Release | EOL/Terminated |
| ------- | ----------------------- | ---------- | ------------- | -------------- |
| 10      | Node.js >= 16           | Supported  | 17 Sep 2025   | TBD            |
| 4       | Node.js >= 16           | Supported  | Q4 2025       | TBD            |
| 3       | Node.js >= 14 and <= 20 | Supported  | 23 May 2023   | TBD            |
| 2       | Node.js >= 8 and <= 14  | Maintained | 29 Sep 2021   | 23 Jul 2023    |
| 1       |                         | EOL        | 28 Mar 2019   | 29 Sep 2021    |

# Questions, Bugs, and Feature Requests?

[Browse the issues tickets](https://github.com/box/box-node-sdk/issues)! Or, if that doesn't work, [file a new one](https://github.com/box/box-node-sdk/issues/new) and someone will get back to you. If you have general questions about the
Box API, you can post to the [Box Developer Forum](https://community.box.com/t5/Developer-Forum/bd-p/DeveloperForum).

# Contributing to the Box Node SDK

For information on how to contribute to this project, please see [the Contribution guidelines](./CONTRIBUTING.md).

# Changelog

See [CHANGELOG.md](./CHANGELOG.md).

# Upgrades

You can read about how to migrate to the new version [here](./docs/upgrade/).

# Documentation

You can find guides and tutorials in the `docs` directory.

- [Configuration](docs/configuration.md)

# Copyright and License

Copyright 2018 Box, Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
