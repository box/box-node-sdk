# Migration guide from v3 to v4 version of `box-node-sdk`

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Migration guide from v3 to v4 version of `box-node-sdk`](#migration-guide-from-v3-to-v4-version-of-box-node-sdk)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Supported Environments](#supported-environments)
  - [Highlighting the Key Differences](#highlighting-the-key-differences)
    - [Update module export style in manually maintained `box-node-sdk` module](#update-module-export-style-in-manually-maintained-box-node-sdk-module)
    - [Using box-node-sdk and sdk-gen together](#using-box-node-sdk-and-sdk-gen-together)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

The v4 release of the Box Node SDK is a transitional version designed to help developers migrate from
the manually maintained v3 SDK to the modern, auto-generated v10+ SDK.

This release combines two packages into a side-by-side package:

- `box-node-sdk` - the manually maintained package from v3.
- `sdk-gen` - the new, auto-generated module built from the official OpenAPI specification (and the sole component of the v10 SDK).

**Important**: In v4, the `sdk-gen` module is under the `box-node-sdk/sdk-gen` namespace.

This hybrid approach allows you to gradually adopt the new `sdk-gen` features
while continuing to use your existing v3 integration, eliminating the need for an immediate full rewrite.

## Installation

To start using v4 version of the Box Node SDK, update your project's `box-node-sdk` dependency to version 4.  
You can find the latest available version on [npm](https://www.npmjs.com/package/box-node-sdk).

```console
npm install box-node-sdk@4
```

Or you can manually update your `package.json` file:

```json
{
  "dependencies": {
    "box-node-sdk": "^4.0.0"
  }
}
```

After updating the dependency, run `npm install` to install the new version of the SDK.

## Supported Environments

Because v4 of the Box Node SDK consolidates the manually maintained `box-node-sdk` module from v3 and the new auto-generated `sdk-gen` modules,
it now follows the newer package minimum platform requirements.

Supported Node.js versions: 18+
**Note: Node.js 16 and 17 are no longer supported.**

If your application currently targets an older Node.js version, update your deployment environment to meet these minimum requirements.

## Highlighting the Key Differences

If you are migrating code from the manually maintained `box-node-sdk` module to the auto-generated `sdk-gen` module, which we recommend,
the key differences between the packages are documented in:

- [Migration guide: box-node-sdk → sdk-gen](./from-box-node-sdk-to-sdk-gen.md)

### Update module export style in manually maintained `box-node-sdk` module

We have updated the module export style in the manually maintained `box-node-sdk` module to support the ES module and be more consistent with the generated `sdk-gen` module.

**Old (`box-node-sdk`):**

```typescript
// Using import statement
import BoxSDK from 'box-node-sdk';

// Using require statement
const BoxSDK = require('box-node-sdk');
```

**From version v4 (`box-node-sdk`):**

```typescript
// Using import statement (no changes)
import BoxSDK from 'box-node-sdk';

// Using require statement (need to use .default to access the default export)
const BoxSDK = require('box-node-sdk').default;
```

### Using box-node-sdk and sdk-gen together

After migration to Box Node SDK v4, you can use both the manually maintained `box-node-sdk` module and the generated `sdk-gen` module.
You just need to import the required classes from the appropriate package depending on which SDK you intend to use.
If both packages contain classes with the same name, you can use type aliases to resolve any naming conflicts.

```typescript
import BoxSDK from 'box-node-sdk';
import { BoxClient, BoxDeveloperTokenAuth } from 'box-node-sdk/sdk-gen';

// Using the generated SDK (recommended)
const newAuth = new BoxDeveloperTokenAuth({ token: 'DEVELOPER_TOKEN' });
const newClient = new BoxClient({ auth: newAuth });
const newFolderItems = await newClient.folders.getFolderItems('0');

// Using the manually written legacy SDK (deprecated)
const legacySdk = new BoxSDK({ clientID: 'id', clientSecret: 'secret' });
const manualClient = legacySdk.getBasicClient('DEVELOPER_TOKEN');
const manualFolderItems = await manualClient.folders.getItems('0');

// Both clients can be used in the same application
```
