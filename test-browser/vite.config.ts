import { defineConfig } from 'vite';
import path from 'path';
import { testEnvList } from './sdkTest.config.mjs';

export default defineConfig({
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'node-fetch': path.resolve(__dirname, 'src/shims/node-fetch.ts'),
    },
    preserveSymlinks: true,
  },
  optimizeDeps: {
    include: ['box-node-sdk'],
  },
  build: {
    commonjsOptions: {
      include: [/box-node-sdk/, /node_modules/],
      transformMixedEsModules: true,
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  plugins: [
    {
      name: 'env-api',
      configureServer(server) {
        server.middlewares.use('/api/env', (_req, res) => {
          const envObject = Object.fromEntries(
            testEnvList.map((env: string) => [env, process.env[env]]),
          );
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(envObject));
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use('/api/env', (_req, res) => {
          const envObject = Object.fromEntries(
            testEnvList.map((env: string) => [env, process.env[env]]),
          );
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(envObject));
        });
      },
    },
  ],
});
