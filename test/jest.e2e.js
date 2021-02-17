// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../jest.config');

// https://github.com/nestjs/graphql/issues/810#issuecomment-618308354
module.exports = {
  ...config,
  rootDir: '.',
  testMatch: ['**/e2e/**/*.+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.e2e.json',
      // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/astTransformers
      astTransformers: {
        before: ['<rootDir>/jest.e2e.transformer.js'],
      },
      // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/isolatedModules
      // isolatedModules: true,
    },
  },
};
