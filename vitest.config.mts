/* eslint-disable import/no-default-export */
import path from 'node:path';
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
  },
  resolve: {
    // Vitest does not read the tsconfig `paths`, so mirror them here.
    // https://docs.nestjs.com/recipes/swc#path-aliases
    alias: {
      '#entity': path.resolve('src/entity'),
    },
  },
});
