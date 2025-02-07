/* eslint-disable import/no-extraneous-dependencies, import/no-default-export */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    testTimeout: 30_000,
  },
});
