import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    // https://github.com/nestjs/nest/issues/964#issuecomment-480834786
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }

    const request = this.getRequest(context);
    // In the graphql call, the path is passed to '/'
    if (request.url === '/' || request.url.startsWith('/test/')) {
      return true;
    }

    return request.isAuthenticated(); // or token
  }

  private getRequest(context: ExecutionContext): Request {
    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context).getContext();
      return <Request>ctx.req;
    }

    return context.switchToHttp().getRequest<Request>();
  }
}
