// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../jest.config');

// https://github.com/nestjs/graphql/issues/810#issuecomment-618308354
module.exports = {
  ...config,
  rootDir: '../dist',
  testMatch: ['**/e2e/**/*.+(spec|test).js'],
  testPathIgnorePatterns: ['/node_modules/'],
};
