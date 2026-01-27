// This scripts will create a package.json for the ESM build in lib-esm directory
// to patch following properties:
// - type: 'module'
// - browser:
//   "./box/eventStream.js": "./box/eventStreamBrowser.js",
//   "./internal/utilsNode.js": "./internal/utilsBrowser.js"

import fs from 'fs';
import path from 'path';

const packageJsonPath = path.join(process.cwd(), 'lib-esm', 'package.json');
const packageJson = {
  type: 'module',
  browser: {
    './box/eventStream.js': './box/eventStreamBrowser.js',
    './internal/utilsNode.js': './internal/utilsBrowser.js',
  },
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
