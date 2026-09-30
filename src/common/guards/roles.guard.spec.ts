import type { Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/internal';
import { expect, test } from 'vitest';

import { RolesGuard } from './roles.guard';
import type { Payload } from '../../auth';
import { Roles } from '../decorators';

@Roles('admin')
class AdminController {}

class PublicController {}

const guard = new RolesGuard(new Reflector());
const handler = (): void => undefined;
const admin: Payload = { userId: 'admin', username: 'admin', roles: ['admin'] };

function httpContext(controller: Type, user?: Payload): ExecutionContextHost {
  return new ExecutionContextHost([{ user }], controller, handler);
}

test('allows a route without roles', () => {
  expect(guard.canActivate(httpContext(PublicController))).toBe(true);
});

test('allows a user with one of the roles', () => {
  expect(guard.canActivate(httpContext(AdminController, admin))).toBe(true);
});

test('denies a user without the roles and an anonymous request', () => {
  expect(guard.canActivate(httpContext(AdminController, { ...admin, roles: ['test'] }))).toBe(false);
  expect(guard.canActivate(httpContext(AdminController))).toBe(false);
});

test('reads the user from the GraphQL context', () => {
  const context = new ExecutionContextHost([{}, {}, { req: { user: admin } }, {}], AdminController, handler);
  context.setType('graphql');

  expect(guard.canActivate(context)).toBe(true);
});
