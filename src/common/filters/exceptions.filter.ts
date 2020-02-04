import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost): void {
    super.catch(exception, host);

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      // Slack notifications?
      // const request = host.switchToHttp().getRequest<Request>();
      // request.method, request.originalUrl...
    }
  }
}
