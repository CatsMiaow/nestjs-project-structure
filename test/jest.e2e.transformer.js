/* eslint-disable */
const transformer = require('@nestjs/graphql/plugin');

// https://docs.nestjs.com/graphql/cli-plugin#integration-with-ts-jest-e2e-tests
module.exports = {
  name: 'nestjs-graphql-transformer',
  version: 1,
  factory: (tsCompiler) => transformer.before({}, tsCompiler.program)
};
