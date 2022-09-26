/* eslint-disable */
// @ts-expect-error type is not supported
import * as transformer from '@nestjs/graphql/plugin';

// https://docs.nestjs.com/graphql/cli-plugin#integration-with-ts-jest-e2e-tests
export const version = 1;
export const name = 'nestjs-graphql-transformer';
export const factory = (tsCompiler: any) => transformer.before({}, tsCompiler.program);
