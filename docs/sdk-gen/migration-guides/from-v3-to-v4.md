# Migration guide from v3 to v4 version of `box-node-sdk`

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Migration guide from v3 to v4 version of `box-node-sdk`](#migration-guide-from-v3-to-v4-version-of-box-node-sdk)
  - [Introduction](#introduction)
  - [Highlighting the Key Differences](#highlighting-the-key-differences)
    - [Module Import/Export Syntax Changes](#module-importexport-syntax-changes)
      - [For CommonJS Users (Node.js `require()`)](#for-commonjs-users-nodejs-require)
      - [For ES Module Users (ESM `import`)](#for-es-module-users-esm-import)
      - [Dual Package Support](#dual-package-support)
      - [Migration Examples](#migration-examples)
      - [Build Tool Compatibility](#build-tool-compatibility)
      - [Automated Migration](#automated-migration)
    - [Breaking Changes Summary](#breaking-changes-summary)
    - [Benefits of the New Syntax](#benefits-of-the-new-syntax)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

The v4 version of the SDK is a major release that introduces a new way of interacting with the Box API.

## Highlighting the Key Differences

### Module Import/Export Syntax Changes

One of the major changes in v4 is the modernization of module syntax from CommonJS `export =` to standard ES module `export default`. This change improves compatibility with modern JavaScript tooling and enables better tree-shaking.

#### For CommonJS Users (Node.js `require()`)

If you're using CommonJS `require()` statements, you'll need to add `.default` to access the exported modules:

**v3 Syntax:**
```javascript
const BoxSDK = require('box-node-sdk');
const TokenManager = require('box-node-sdk/lib/token-manager');
const Config = require('box-node-sdk/lib/util/config');
```

**v4 Syntax:**
```javascript
const BoxSDK = require('box-node-sdk').default;
const TokenManager = require('box-node-sdk/lib/token-manager').default;
const Config = require('box-node-sdk/lib/util/config').default;
```

#### For ES Module Users (ESM `import`)

v4 now fully supports modern ES module imports, which were not available in v3:

**New in v4 - ES Module Support:**
```javascript
// Default imports
import BoxSDK from 'box-node-sdk';
import TokenManager from 'box-node-sdk/lib/token-manager';
import Config from 'box-node-sdk/lib/util/config';

// You can also use named imports for specific managers
import { Files, Folders, Users } from 'box-node-sdk/managers';
```

#### Dual Package Support

v4 maintains backward compatibility by providing both CommonJS and ES module builds:

- **CommonJS build**: `box-node-sdk` (for Node.js `require()`)
- **ES Module build**: `box-node-sdk/esm` (for `import` statements)
- **Package.json exports**: Automatically selects the correct build based on your import method

#### Migration Examples

**Basic SDK Initialization:**

```javascript
// v3
const BoxSDK = require('box-node-sdk');
const sdk = new BoxSDK({
  clientID: 'your-client-id',
  clientSecret: 'your-client-secret'
});

// v4 - CommonJS
const BoxSDK = require('box-node-sdk').default;
const sdk = new BoxSDK({
  clientID: 'your-client-id',
  clientSecret: 'your-client-secret'
});

// v4 - ES Modules (New!)
import BoxSDK from 'box-node-sdk';
const sdk = new BoxSDK({
  clientID: 'your-client-id',
  clientSecret: 'your-client-secret'
});
```

**Working with Managers:**

```javascript
// v3
const Files = require('box-node-sdk/lib/managers/files');
const Folders = require('box-node-sdk/lib/managers/folders');

// v4 - CommonJS
const Files = require('box-node-sdk/lib/managers/files').default;
const Folders = require('box-node-sdk/lib/managers/folders').default;

// v4 - ES Modules (New!)
import Files from 'box-node-sdk/lib/managers/files';
import Folders from 'box-node-sdk/lib/managers/folders';
```

#### Build Tool Compatibility

The new ES module support in v4 provides better compatibility with modern build tools:

- **Webpack**: Improved tree-shaking and bundle optimization
- **Rollup**: Better dead code elimination
- **Vite**: Native ES module support
- **TypeScript**: Enhanced type inference and module resolution

#### Automated Migration

For large codebases, you can use a simple find-and-replace to update your imports:

**Find:** `require('box-node-sdk`
**Replace:** `require('box-node-sdk').default`

Or use a more targeted approach for specific modules:

```bash
# Example sed command for Unix-like systems
sed -i "s/require('box-node-sdk')/require('box-node-sdk').default/g" **/*.js
```

### Breaking Changes Summary

1. **Module Exports**: All modules now use `export default` instead of `export =`
2. **CommonJS Imports**: Require `.default` property access
3. **ES Module Support**: New import syntax available
4. **Build Outputs**: Dual package with both CommonJS and ES module builds

### Benefits of the New Syntax

- **Modern Standards**: Aligns with current JavaScript module standards
- **Better Tooling**: Improved support for bundlers and development tools  
- **Tree Shaking**: Enables better dead code elimination in bundlers
- **TypeScript**: Enhanced type checking and IntelliSense support
- **Future Proof**: Prepares for potential future ES module-only environments

