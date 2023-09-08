import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import type { Request } from 'express';

export const ReqUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  let request: Request;

  if (context.getType<GqlContextType>() === 'graphql') {
    const ctx = GqlExecutionContext.create(context).getContext<{ req: Request }>();
    request = ctx.req;
  } else {
    request = context.switchToHttp().getRequest<Request>();
  }

  return request.user;
});
