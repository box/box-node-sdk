import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import fs from 'fs';
import path from 'path';

function getBrowserConfig() {
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  const browserFiles = packageJson.browser;
  Object.keys(browserFiles).forEach((key) => {
    if (browserFiles[key].includes('./lib/')) {
      delete browserFiles[key];
    }
  });
  return browserFiles;
}

function replaceFiles(options = {}) {
  const { files } = options;
  const backupFiles = {};

  return {
    name: 'replace-files',
    buildStart() {
      for (const [target, replacement] of Object.entries(files)) {
        const backup = `${target}.bak`;
        if (fs.existsSync(target)) {
          backupFiles[target] = backup;
          fs.copyFileSync(target, backup);
        }
        const content = fs.readFileSync(replacement, 'utf-8');
        fs.writeFileSync(target, content, 'utf-8');
      }
    },
    buildEnd() {
      for (const target of Object.keys(files)) {
        fs.rmSync(target, { force: true });
        const backup = backupFiles[target];
        if (backup) {
          fs.copyFileSync(backup, target);
          fs.rmSync(backup, { force: true });
        }
      }
    },
  };
}

function cleanupTypeScript(options = {}) {
  const { tsconfig } = options;
  const tsconfigFile = JSON.parse(fs.readFileSync(tsconfig, 'utf-8'));
  let tsOutputDir;

  return {
    name: 'cleanup-typescript',
    generateBundle(outputOptions) {
      const outputDir =
        outputOptions.dir ||
        (outputOptions.file
          ? outputOptions.file.substring(0, outputOptions.file.lastIndexOf('/'))
          : 'dist');
      tsOutputDir = path.resolve(
        outputDir,
        tsconfigFile.compilerOptions.outDir,
      );
    },
    closeBundle() {
      if (tsOutputDir) {
        fs.rmSync(tsOutputDir, { recursive: true, force: true });
      }
    },
  };
}

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/bundle.js',
    format: 'umd',
    name: 'box-typescript-sdk-gen',
    sourcemap: true,
    exports: 'named',
  },
  plugins: [
    replaceFiles({
      files: getBrowserConfig(),
    }),
    resolve({
      browser: true, // Instruct the plugin to use the "browser" field in package.json
      preferBuiltins: false, // Do not prefer built-in modules over npm packages
    }), // Resolves node modules
    commonjs(), // Converts CommonJS modules to ES6, necessary for some npm packages
    typescript({
      tsconfig: './tsconfig.rollup.json',
    }), // Compiles TypeScript
    json(), // Converts JSON files to ES6 modules
    cleanupTypeScript({
      tsconfig: './tsconfig.rollup.json',
    }),
  ],
};
