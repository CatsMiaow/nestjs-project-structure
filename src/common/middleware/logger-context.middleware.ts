import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { storage } from 'nestjs-pino/storage';

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
  // GraphQL logging uses the apollo plugins.
  // https://docs.nestjs.com/graphql/plugins
  // https://docs.nestjs.com/graphql/field-middleware

  constructor(private readonly logger: PinoLogger) {}

  public use(req: Request, _res: Response, next: () => void): void {
    const store = storage.getStore();

    if (store) {
      const user = req.user?.userId || '';
      // Add extra fields to share in logger context
      this.logger.assign({ user });
    }

    return next();
  }
}
