/* eslint-disable max-len, @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
// @ts-expect-error type is not supported
import * as transformer from '@nestjs/graphql/plugin';

// https://docs.nestjs.com/graphql/cli-plugin#integration-with-ts-jest-e2e-tests
export const version = 1;
export const name = 'nestjs-graphql-transformer';
export const factory = (tsCompiler: any) => transformer.before({}, tsCompiler.program);
