/* eslint-disable import/no-default-export */
import { loadEnvFile } from 'node:process';
import { defineConfig } from 'vitest/config';

try {
  loadEnvFile();
} catch {}

export default defineConfig({
  test: {
    root: './',
    testTimeout: 30_000,
    // Vitest keeps an existing NODE_ENV (e.g. `development` from the shell), so override it to always load `envs/test.ts`.
    env: { NODE_ENV: 'test' },
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['src/entity/**'],
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
});
