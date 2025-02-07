/* eslint-disable import/no-extraneous-dependencies, import/no-default-export */
import { defineConfig, mergeConfig } from 'vitest/config';

import config from '../vitest.config.js';

export default mergeConfig(
  config,
  defineConfig({
    test: {
      include: ['**/e2e/**/*.{spec,test}.ts'],
    },
  }),
  true,
);
