/* eslint-disable import/no-default-export */
import type { Config } from 'jest';

import config from '../jest.config';

// https://github.com/nestjs/graphql/issues/810#issuecomment-618308354
const jestConfig: Config = {
  ...config,
  rootDir: '.',
  testMatch: ['**/e2e/**/*.+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.e2e.json',
        // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/astTransformers
        astTransformers: {
          before: ['<rootDir>/jest.e2e.transformer.ts'],
        },
        // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/isolatedModules
        // isolatedModules: true,
      },
    ],
  },
  moduleNameMapper: {
    '#(.*)': '<rootDir>/../src/$1',
  },
};

export default jestConfig;
