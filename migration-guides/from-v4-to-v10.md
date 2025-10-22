# Migration guide from v4 to v10 version of `box-node-sdk`

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Migration guide from v4 to v10 version of `box-node-sdk`](#migration-guide-from-v4-to-v10-version-of-box-node-sdk)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Supported Environments](#supported-environments)
  - [Migration Scope and Module Compatibility](#migration-scope-and-module-compatibility)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

Version 10 of the Box Node SDK is a modern, fully auto-generated SDK built entirely from auto-generated package.  
In version 4, the SDK included two packages side by side: the manually maintained `box-node-sdk` module and the generated `sdk-gen`.  
Starting with version 10, the manually maintained `box-node-sdk` module has been removed, and only the `sdk-gen` module remains.

**Important**: In v10, the `sdk-gen` module is moved to the `box-node-sdk` namespace with `box-node-sdk/sdk-gen` alias namespace for backward compatibility.

If you are migrating code from `box-node-sdk` to `sdk-gen` module, detailed instructions are available in the dedicated  
[Migration guide: migrate from `box-node-sdk` to `sdk-gen` module](./from-box-node-sdk-to-sdk-gen.md).

## Installation

To install v10 version of Box Node SDK use command:

```console
npm install box-node-sdk@10
```

Starting with v10, the manually maintained `box-node-sdk` module is no longer included.
Installing v10 provides only the `sdk-gen` module.

## Supported Environments

Both v4 and v10 of the Box Node SDK share the same Node.js version requirement: Node.js 18 or higher.  
No changes to your environment are needed when upgrading from v4 to v10.

## Migration Scope and Module Compatibility

If your project only uses the `sdk-gen` module from v4, no code changes are required to migrate to v10.  
The generated `sdk-gen` module is the same in both v4 and v10.

If your project still includes code that uses the manually maintained `box-node-sdk` module, follow the dedicated guide to update it:  
[Migration guide: migrate from `box-node-sdk` to `sdk-gen` module](./from-box-node-sdk-to-sdk-gen.md).
