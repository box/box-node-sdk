<p align="center">
  <img src="https://github.com/box/sdks/blob/master/images/box-dev-logo.png" alt= “box-dev-logo” width="30%" height="50%">
</p>


# Box Node SDK

[![Project Status](http://opensource.box.com/badges/active.svg)](http://opensource.box.com/badges)
[![Known Vulnerabilities](https://snyk.io/test/github/box/box-node-sdk/badge.svg)](https://snyk.io/test/github/box/box-node-sdk)
![Platform](https://img.shields.io/badge/node-18--24-blue)
[![Coverage](https://coveralls.io/repos/github/box/box-node-sdk/badge.svg?branch=main)](https://coveralls.io/github/box/box-node-sdk?branch=main)

A Node.js interface to the [Box Content API](https://developer.box.com/reference/).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Box Node SDK](#box-node-sdk)
- [Supported versions](#supported-versions)
  - [Version v4](#version-v4)
  - [Version v10](#version-v10)
  - [Which Version Should I Use?](#which-version-should-i-use)
- [Installing](#installing)
- [Getting Started](#getting-started)
  - [With sdk\_gen module (recommended)](#with-sdk_gen-module-recommended)
  - [With manual SDK (deprecated)](#with-manual-sdk-deprecated)
- [Authentication](#authentication)
- [Using both sdk\_gen and manual legacy SDK simultaneously](#using-both-sdk_gen-and-manual-legacy-sdk-simultaneously)
- [Documentation](#documentation)
- [Migration guides](#migration-guides)
- [Versioning](#versioning)
  - [Version schedule](#version-schedule)
- [Contributing](#contributing)
- [FIPS 140-2 Compliance](#fips-140-2-compliance)
- [Questions, Bugs, and Feature Requests?](#questions-bugs-and-feature-requests)
- [Copyright and License](#copyright-and-license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


# Supported versions

To enhance developer experience, provide full Box API coverage, and rapid updates we have introduced the new generated codebase through the `sdk-gen` module.
The `sdk-gen` module is available in two major supported versions: v4 and v10.

## Version v4

In v4 of the Box Node SDK, we are introducing a version that consolidates both the manually written package (legacy SDK) and the generated SDK (currently in v10, formerly known as [box-typescript-sdk-gen](https://github.com/box/box-typescript-sdk-gen)) into a single SDK package for improved usability and maintenance. This allows developers to use both modules within a single project.

Version v4 of the Box Node SDK will be supported until 2027. During this period, the manually written SDK will be marked as deprecated and will receive only bug fixes and security updates.
All new features and functionality will be provided exclusively in the `sdk-gen` module.

The codebase for v4 of the Box Node SDK is currently available in the [combined-sdk](https://github.com/box/box-node-sdk/tree/combined-sdk) branch.
Migration guide for migrating from manually written SDK to generated SDK can be found [here](./migration-guides/from-manual-sdk-to-sdk-gen.md).

Version v4 is intended for:
- Existing developers of the Box Node SDK v3 who want to access new API features while keeping their current codebase largely unchanged.
- xisting developers who are in the process of migrating to `sdk-gen` module, but do not want to move all their code to the new module immediately.

## Version v10

Starting from v10, the SDK is built entirely on the generated `sdk-gen` module, which fully and exclusively replaces the old `boxsdk` module.
The codebase for v10 of the Box Node SDK is currently available in the [sdk-gen](https://github.com/box/box-node-sdk/tree/sdk-gen) branch.

Version v10 is intended for:
- New users of the Box Node SDK.
- Developers already working with the generated Box TypeScript SDK previously available under the [Box TypeScript SDK Gen repository](https://github.com/box/box-typescript-sdk-gen).

## Which Version Should I Use?

| Scenario                                                                                                       | Recommended Version                                                | Example Dependency                |
|----------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|-----------------------------------|
| Creating a new application                                                                                     | Use [v10](https://github.com/box/box-node-sdk/tree/sdk-gen)        | `npm install box-node-sdk@10`     |
| Existing app using [box-sdk-gen](https://www.npmjs.com/package/box-typescript-sdk-gen) artifact                | Migrate to [v10](https://github.com/box/box-node-sdk/tree/sdk-gen) | `npm install box-node-sdk@10`      |
| Existing app using both [box-sdk-gen](https://www.npmjs.com/package/box-typescript-sdk-gen) and [box-node-sdk](https://www.npmjs.com/package/box-node-sdk) | Upgrade to [v4](https://github.com/box/box-node-sdk/tree/combined-sdk)                             | `npm install box-node-sdk@^4`                               |
| Existing app using v3 of [box-node-sdk](https://www.npmjs.com/package/box-node-sdk) artifact         | Upgrade to [v4](https://github.com/box/box-node-sdk/tree/combined-sdk)                                       | `npm install box-node-sdk@^4` |

For full guidance on SDK versioning, see the [Box SDK Versioning Guide](https://developer.box.com/guides/tooling/sdks/sdk-versioning/).

# Installing

To install Box Node SDK v4 version that consolidates both the manual written package (legacy SDK) and the generated SDK (sdk-gen), run the command:

```bash
npm install --save box-node-sdk@^4
```

Supported Node versions are 18 and above.

**Important:** In version v4, the manually written SDK is available in the `box-node-sdk` module, and the generated SDK is available in the `box-node-sdk/sdk-gen` module.

# Getting Started

To get started with the SDK, get a Developer Token from the Configuration page of your app in the [Box Developer Console](https://app.box.com/developers/console). 
Developer Tokens are short-lived and expire after 60 minutes, which is good for testing but not for production use.
To learn about other authentication methods, see the [Authentication](#authentication) section below.

The examples below demonstrate how to authenticate with Developer Token and print names of all items inside a root folder.

## With sdk_gen module (recommended)

The SDK provides an `BoxDeveloperTokenAuth` class, which allows you to authenticate using your Developer Token.
Use instance of `BoxDeveloperTokenAuth` to initialize BoxClient object. Using `BoxClient` object you can access managers,
which allow you to perform some operations on your Box account.

```js
const { BoxClient, BoxDeveloperTokenAuth } = require('box-node-sdk/sdk-gen');

async function main(token) {
  let auth = new BoxDeveloperTokenAuth({ token });
  let client = new BoxClient({ auth });
  let entries = (await client.folders.getFolderItems('0')).entries;
  entries.forEach(entry => console.log(entry.name));
}

main('INSERT YOUR DEVELOPER TOKEN HERE');
```

## With manual SDK (deprecated)

From version v4, we are adding support for ESM modules, and keeping support for CommonJS modules.
For each class in the package are exported as a default export, and you can import them using the following syntax:

Using `import` syntax:
```js
import BoxSDK from 'box-node-sdk';
```

Using `require` syntax:
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

# Authentication

Both the manual and `sdk-gen` modules support multiple authentication methods, including
Developer Token, OAuth 2.0, Client Credentials Grant, and JSON Web Token (JWT).

You can find detailed instructions and example code for each authentication method in the following documentation:
- [Authentication for the `sdk-gen` module](./docs/sdk-gen/authentication.md)
- [Authentication for the manual SDK](./docs/authentication.md)

# Using both sdk_gen and manual legacy SDK simultaneously

With v4 of the Box Python SDK, you can use both the `sdk-gen` and manual modules in the same project.

```js
const { BoxSDK } = require('box-node-sdk');
const { BoxClient, BoxDeveloperTokenAuth } = require('box-node-sdk/sdk-gen');

// Using the generated SDK (recommended)
const newAuth = new BoxDeveloperTokenAuth({ token: 'DEVELOPER_TOKEN' });
const newClient = new BoxClient({ auth: newAuth });
const newFolderItems = await newClient.folders.getFolderItems('0');

// Using the manual legacy SDK (deprecated)
const legacySdk = new BoxSDK({ clientID: 'id', clientSecret: 'secret' });
const manualClient = legacySdk.getBasicClient('DEVELOPER_TOKEN');
const manualFolderItems = await manualClient.folders.getItems('0')

// Both clients can be used in the same application
```

# Documentation

Full documentation of the available functionality, along with example code can be found:
- for the `sdk-gen` module in the [sdk-gen](./docs/sdk-gen/) directory.
- for the manual SDK in the [manual](./docs/) directory.

# Migration guides

Migration guides which help you to migrate to supported major SDK versions can be found [here](./migration-guides/).

# Versioning

We use a modified version of [Semantic Versioning](https://semver.org/) for all changes. See [version strategy](VERSIONS.md) for details which is effective from 30 July 2022.

Currently, we support versions v10 and v4 of the SDK. New features and functionality are added to v10, while the manually written portion of v4 receives bug fixes and security updates only.

A current release is on the leading edge of our SDK development, and is intended for customers who are in active development and want the latest and greatest features.  
Instead of stating a release date for a new feature, we set a fixed minor or patch release cadence of maximum 2-3 months (while we may release more often). 
At the same time, there is no schedule for major or breaking release. Instead, we will communicate one quarter in advance the upcoming breaking change to allow customers to plan for the upgrade. 

We always recommend that all users run the latest available minor release for whatever major version is in use. 
We highly recommend upgrading to the latest SDK major release at the earliest convenient time and before the EOL date.

## Version schedule

| Version | Supported Environments  | State      | First Release | EOL/Terminated |
| ------- | ----------------------- | ---------- | ------------- | -------------- |
| 10      | Node.js >= 18           | Supported  | 17 Sep 2025   | TBD            |
| 4       | Node.js >= 18           | Supported  | 23 Oct 2025   | 2027           |
| 3       | Node.js >= 14 and <= 20 | Supported  | 23 May 2023   | 23 Oct 2025    |
| 2       | Node.js >= 8 and <= 14  | Maintained | 29 Sep 2021   | 23 Jul 2023    |
| 1       |                         | EOL        | 28 Mar 2019   | 29 Sep 2021    |

# Contributing

For information on how to contribute to this project, please see [the Contribution guidelines](./CONTRIBUTING.md).

# FIPS 140-2 Compliance

The Box Node SDK allows the use of FIPS 140-2 validated SSL libraries, such as OpenSSL 3.0.
However, some actions are required to enable this functionality.

By default, the version of OpenSSL Node.js includes is not FIPS enabled. Therefore, if you want to use OpenSSL 3.0 with FIPS, you need to [build OpenSSL 3.0 with FIPS enabled](https://github.com/openssl/openssl/blob/master/README-FIPS.md) and then build Node.js use the shared OpenSSL 3.0 library.

According to [Node.js OpenSSL Strategy](https://github.com/nodejs/TSC/blob/main/OpenSSL-Strategy.md) document, you can use the OpenSSL 3.0 from Node.js v16 or later.

# Questions, Bugs, and Feature Requests?

Need to contact us directly? [Browse the issues tickets](https://github.com/box/box-node-sdk/issues)! Or, if that
doesn't work, [file a new one](https://github.com/box/box-node-sdk/issues/new) and we will get
back to you. If you have general questions about the Box API, you can post to the [Box Developer Forum](https://community.box.com/box-platform-5).

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
