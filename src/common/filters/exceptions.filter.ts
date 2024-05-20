import { ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { GqlArgumentsHost, GqlContextType, GqlExceptionFilter } from '@nestjs/graphql';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter implements GqlExceptionFilter {
  private readonly logger: Logger = new Logger();

  public override catch(exception: unknown, host: ArgumentsHost): void {
    let args: unknown;
    if (host.getType<GqlContextType>() === 'graphql') {
      const gqlHost = GqlArgumentsHost.create(host);
      const {
        req: {
          body: { operationName, variables },
        },
      } = gqlHost.getContext<{ req: { body: { operationName: string; variables: Record<string, unknown> } } }>();
      args = `${operationName} ${JSON.stringify(variables)}`;
    } else {
      super.catch(exception, host);
      // const req = host.switchToHttp().getRequest<Request>();
      // req.method, req.originalUrl...
      // args = req.body;
    }

    const status = this.getHttpStatus(exception);
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (exception instanceof Error) {
        this.logger.error({ err: exception, args });
      } else {
        // Error Notifications
        this.logger.error('UnhandledException', exception);
      }
    }
  }

  private getHttpStatus(exception: unknown): HttpStatus {
    return exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
