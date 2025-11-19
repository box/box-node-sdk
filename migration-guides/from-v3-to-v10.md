# Migration guide from v3 to v10 version of `box-node-sdk`

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Migration guide from v3 to v10 version of `box-node-sdk`](#migration-guide-from-v3-to-v10-version-of-box-node-sdk)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Supported Environments](#supported-environments)
  - [Highlighting the Key Differences](#highlighting-the-key-differences)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

The v10 release of Box Node SDK library helps Typescript developers to conveniently integrate with Box API.
In the contrary to the previous version (v3 or lower), it is not manually maintained, but auto-generated
based on Open API Specification. This means you can leverage the most up-to-date Box API features in your
applications without delay. We introduced this major version bump to reflect the significant codebase changes
and to align with other Box SDKs, which will also adopt generated code starting from their v10 releases.
More information and benefits of using the new can be found in the
[README](../README.md) file.

## Installation

To install v10 version of Box Node SDK use command:

```console
npm install box-node-sdk@10
```

We have also introduced v4 version of Box Node SDK that consolidates both the manually maintained `box-node-sdk` module from v3
and the new, auto-generated `sdk-gen` module from v10.
If you would like to use a feature available only in the new SDK, you won't need to necessarily migrate all your code
to use generated SDK at once. You will be able to use a new feature from the `sdk-gen` module,
while keeping the rest of your code unchanged. However, we recommend to fully migrate to the v10 of the SDK eventually.
More information about v4 version can be found in the [migration guide from v3 to v4](./from-v3-to-v4.md).

**Important**: In v10, the `sdk-gen` module is under the `box-node-sdk` namespace with `box-node-sdk/sdk-gen` alias namespace for backward compatibility.

## Supported Environments

The v10 version of Box Node SDK no longer supports Node.js version below 18.

If your application currently targets an older Node.js version, update your deployment environment to meet these minimum requirements.

## Highlighting the Key Differences

There are important differences between the `box-node-sdk` (v3) and the generated `sdk-gen` (v10) modules.
We have prepared a separate document that presents the main differences and provides guidance to help you migrate.
For side-by-side code examples, see: [Migration guide: migrate from box-node-sdk to sdk-gen](./from-box-node-sdk-to-sdk-gen.md).
