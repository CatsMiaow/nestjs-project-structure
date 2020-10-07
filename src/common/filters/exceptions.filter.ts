import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch, ForbiddenException, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { GqlContextType, GqlExceptionFilter } from '@nestjs/graphql';
import { ApolloError, ForbiddenError } from 'apollo-server-express';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter implements GqlExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost): void {
    if (host.getType<GqlContextType>() === 'graphql') {
      // const gqlHost = GqlArgumentsHost.create(host);

      // https://www.apollographql.com/docs/apollo-server/data/errors
      if (exception instanceof ForbiddenException) {
        throw new ForbiddenError(exception.message);
      }

      const status = this.getStatus(exception);
      const error = exception instanceof Error
        ? exception
        : new Error(String(exception));

      if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        Logger.error(error.message, error.stack, 'UnhandledException');
      }

      throw new ApolloError(error.message);
    }

    super.catch(exception, host);

    const status = this.getStatus(exception);
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      // Error Notifications
      // const request = host.switchToHttp().getRequest<Request>();
      // request.method, request.originalUrl...
    }
  }

  private getStatus(exception: unknown): number {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
