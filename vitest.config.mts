/* eslint-disable import/no-default-export */
import path from 'node:path';
import { loadEnvFile } from 'node:process';
import { defineConfig } from 'vitest/config';

try {
  loadEnvFile();
} catch {}

export default defineConfig({
  test: {
    globals: true,
    root: './',
    testTimeout: 30_000,
  },
  resolve: {
    // Vitest does not read the tsconfig `paths`, so mirror them here.
    // https://docs.nestjs.com/recipes/swc#path-aliases
    alias: {
      '#entity': path.resolve('src/entity'),
    },
  },
});
