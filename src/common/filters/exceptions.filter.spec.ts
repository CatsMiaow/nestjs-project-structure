import { Logger, NotFoundException } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/internal';
import { afterAll, afterEach, expect, test, vi } from 'vitest';

import { ExceptionsFilter } from './exceptions.filter';

// Observe the Nest logger that the filter writes to, and keep the test output clean.
const logError = vi.spyOn(Logger.prototype, 'error').mockReturnValue();

function graphqlHost(): ExecutionContextHost {
  const host = new ExecutionContextHost([{}, {}, { req: { body: { operationName: 'Read', variables: { id: 1 } } } }, {}]);
  host.setType('graphql');
  return host;
}

afterEach(() => {
  logError.mockClear();
});

test('logs an unexpected GraphQL error with its operation', () => {
  const error = new Error('boom');
  new ExceptionsFilter().catch(error, graphqlHost());

  expect(logError).toHaveBeenCalledWith({ err: error, args: 'Read {"id":1}' });
});

test('logs a thrown value that is not an Error', () => {
  new ExceptionsFilter().catch('boom', graphqlHost());

  expect(logError).toHaveBeenCalledWith('UnhandledException', 'boom');
});

test('does not log an HttpException below 500', () => {
  new ExceptionsFilter().catch(new NotFoundException(), graphqlHost());

  expect(logError).not.toHaveBeenCalled();
});

afterAll(() => {
  logError.mockRestore();
});
