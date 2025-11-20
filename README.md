<p align="center">
  <img src="https://github.com/box/sdks/blob/master/images/box-dev-logo.png" alt= “box-dev-logo” width="30%" height="50%">
</p>

# Box Node SDK v10

[![Project Status](http://opensource.box.com/badges/active.svg)](http://opensource.box.com/badges)
![build](https://github.com/box/box-node-sdk/actions/workflows/build_and_test.yml/badge.svg)
[![npm version](https://badge.fury.io/js/box-node-sdk.svg)](https://badge.fury.io/js/box-node-sdk)
[![image](https://img.shields.io/npm/dm/box-node-sdk.svg)](https://badge.fury.io/js/box-node-sdk)
![Platform](https://img.shields.io/badge/node-18--22-blue)
[![Coverage](https://coveralls.io/repos/github/box/box-node-sdk/badge.svg?branch=main)](https://coveralls.io/github/box/box-node-sdk?branch=main)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Supported versions](#supported-versions)
  - [Version v4](#version-v4)
  - [Version v10](#version-v10)
  - [Which Version Should I Use?](#which-version-should-i-use)
- [Installing](#installing)
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Documentation](#documentation)
- [Migration guides](#migration-guides)
- [Browser Support](#browser-support)
- [Versioning](#versioning)
  - [Version schedule](#version-schedule)
- [Contributing](#contributing)
- [FIPS 140-2 Compliance](#fips-140-2-compliance)
- [Questions, Bugs, and Feature Requests?](#questions-bugs-and-feature-requests)
- [Copyright and License](#copyright-and-license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Introduction

We are excited to introduce the v10 major release of the Box Node SDK,
designed to elevate the developer experience and streamline your integration with the Box Content Cloud.

With this SDK version, you’ll have access to:

1. Full API Support: The new generation of Box SDKs empowers developers with complete coverage of the Box API ecosystem. You can now access all the latest features and functionalities offered by Box, allowing you to build even more sophisticated and feature-rich applications.
2. Rapid API Updates: Say goodbye to waiting for new Box APIs to be incorporated into the SDK. With our new auto-generation development approach, we can now add new Box APIs to the SDK at a much faster pace (in a matter of days). This means you can leverage the most up-to-date features in your applications without delay.
3. Embedded Documentation: We understand that easy access to information is crucial for developers. With our new approach, we have included comprehensive documentation for all objects and parameters directly in the source code of the SDK. This means you no longer need to look up this information on the developer portal, saving you time and streamlining your development process.
4. Enhanced Convenience Methods: Our commitment to enhancing your development experience continues with the introduction of convenience methods. These methods cover various aspects such as chunk uploads, classification, and much more.
5. Seamless Start: The new SDKs integrate essential functionalities like authentication, automatic retries with exponential backoff, exception handling, request cancellation, and type checking, enabling you to focus solely on your application's business logic.

Embrace the new generation of Box SDKs and unlock the full potential of the Box Content Cloud.

# Supported versions

To enhance developer experience, we have introduced the new generated codebase through the `sdk-gen` module.
The `sdk-gen` module is available in two major supported versions: v4 and v10.

## Version v4

In v4 of the Box Node SDK, we are introducing a version that consolidates both the manually written package (legacy SDK) and the generated SDK (currently in v10, formerly known as [box-typescript-sdk-gen](https://github.com/box/box-typescript-sdk-gen)) into a single SDK package for improved usability and maintenance. This allows developers to use both modules within a single project.

The codebase for v4 of the Box Node SDK is currently available in the [combined-sdk](https://github.com/box/box-node-sdk/tree/combined-sdk) branch.
Migration guide for migrating from manually written SDK to generated SDK can be found [here](./migration-guides/from-box-node-sdk-to-sdk-gen.md).

Version v4 is intended for:

- Existing developers of the Box Node SDK v3 who want to access new API features while keeping their current codebase largely unchanged.
- Existing developers who are in the process of migrating to `sdk-gen` module, but do not want to move all their code to the new module immediately.

## Version v10

Starting from v10, the SDK is built entirely on the generated `sdk-gen` module, which fully and exclusively replaces the old `boxsdk` module.
The codebase for v10 of the Box Node SDK is currently available in the [main](https://github.com/box/box-node-sdk/tree/main) branch.

Version v10 is intended for:

- New users of the Box Node SDK.
- Developers already working with the generated Box TypeScript SDK previously available under the [Box TypeScript SDK Gen repository](https://github.com/box/box-typescript-sdk-gen).

## Which Version Should I Use?

| Scenario                                                                                                                                                              | Recommended Version                                                    | Example Dependency            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------- |
| Creating a new application                                                                                                                                            | Use [v10](https://github.com/box/box-node-sdk/tree/main)               | `npm install box-node-sdk@10` |
| Existing app using [box-typescript-sdk-gen](https://www.npmjs.com/package/box-typescript-sdk-gen) artifact                                                            | Migrate to [v10](https://github.com/box/box-node-sdk/tree/main)        | `npm install box-node-sdk@10` |
| Existing app using both [box-typescript-sdk-gen](https://www.npmjs.com/package/box-typescript-sdk-gen) and [box-node-sdk](https://www.npmjs.com/package/box-node-sdk) | Upgrade to [v4](https://github.com/box/box-node-sdk/tree/combined-sdk) | `npm install box-node-sdk@^4` |
| Existing app using v3 of [box-node-sdk](https://www.npmjs.com/package/box-node-sdk) artifact                                                                          | Upgrade to [v4](https://github.com/box/box-node-sdk/tree/combined-sdk) | `npm install box-node-sdk@^4` |

For full guidance on SDK versioning, see the [Box SDK Versioning Guide](https://developer.box.com/guides/tooling/sdks/sdk-versioning/).

# Installing

If you are using npm:

```console
npm install box-node-sdk@<version>
```

If you use yarn, please do this instead:

```console
yarn add box-node-sdk@<version>
```

Where `VERSION` is the version of the SDK you want to use. The next generation of the SDK starts with version `10.0.0`.

# Getting Started

To get started with the SDK, get a Developer Token from the Configuration page of your app in the [Box Developer
Console](https://app.box.com/developers/console). You can use this token to make test calls for your own Box account.

The SDK provides an `DeveloperTokenAuth` class, which allows you to authenticate using your Developer Token.
Use instance of `DeveloperTokenAuth` to initialize `Client` object.
Using `Client` object you can access managers, which allow you to perform some operations on your Box account.

The example below demonstrates how to authenticate with Developer Token and print names of all items inside a root folder.

```js
const { BoxClient, BoxDeveloperTokenAuth } = require('box-node-sdk');

async function main(token) {
  let auth = new BoxDeveloperTokenAuth({ token });
  let client = new BoxClient({ auth });
  let entries = (await client.folders.getFolderItems('0')).entries;
  entries.forEach((entry) => console.log(entry));
}

main('INSERT YOUR DEVELOPER TOKEN HERE');
```

In order to use in browser make sure you include the `lib/bundle.js` file and then you can access the classes like so:

```js
const { BoxClient, BoxDeveloperTokenAuth } = window['box-node-sdk'];
```

See example.html for an example website using this SDK.

To run the example locally:

1. Start the local server by running `npx serve -p 3000` in the project directory.
2. Make sure `http://localhost:3000` is allowlisted in CORS Domains of your application.
3. Head over to `http://localhost:3000/example.html`.
4. Provide a fresh Developer Token to the dialog window that shows up upon running the example.
5. Make sure that you get an alert message that includes your user name.

# Authentication

Box Node SDK v10 supports multiple authentication methods including Developer Token, OAuth 2.0,
Client Credentials Grant, and JSON Web Token (JWT).

You can find detailed instructions and example code for each authentication method in
[Authentication](./docs/authentication.md) document.

# Documentation

Browse the [docs](docs/README.md) or see [API Reference](https://developer.box.com/reference/) for more information.

# Migration guides

Migration guides which help you to migrate to supported major SDK versions can be found [here](./migration-guides).

# Browser Support

This SDK works in modern browsers that support ES6+ features. It seamlessly integrates with frontend frameworks like ReactJS, Angular, and NextJS. Check out our example below:

- [React Sample App](https://github.com/box-community/box-ts-sdk-react)

# Versioning

We use a modified version of [Semantic Versioning](https://semver.org/) for all changes. See [version strategy](VERSIONS.md) for details which is effective from 30 July 2022.

Currently, we support versions v10 and v4 of the SDK. New features and functionality are added to v10, while the manually written portion of v4 receives bug fixes and security updates only.

A current release is on the leading edge of our SDK development, and is intended for customers who are in active development and want the latest and greatest features.  
Instead of stating a release date for a new feature, we set a fixed minor or patch release cadence of maximum 2-3 months (while we may release more often).
At the same time, there is no schedule for major or breaking release. Instead, we will communicate one quarter in advance the upcoming breaking change to allow customers to plan for the upgrade.

We always recommend that all users run the latest available minor release for whatever major version is in use.
We highly recommend upgrading to the latest SDK major release at the earliest convenient time and before the EOL date.

## Version schedule

| Version | Supported Environments  | State     | First Release | EOL/Terminated         |
| ------- | ----------------------- | --------- | ------------- | ---------------------- |
| 10      | Node.js >= 18           | Supported | 17 Sep 2025   | TBD                    |
| 4       | Node.js >= 18           | Supported | 23 Oct 2025   | 2027 or v5 is released |
| 3       | Node.js >= 14 and <= 20 | EOL       | 23 May 2023   | 23 Oct 2025            |
| 2       | Node.js >= 8 and <= 14  | EOL       | 29 Sep 2021   | 23 Jul 2023            |
| 1       |                         | EOL       | 28 Mar 2019   | 29 Sep 2021            |

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

Copyright 2025 Box, Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
