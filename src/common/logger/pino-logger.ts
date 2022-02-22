import type { LoggerService as NestLoggerService } from '@nestjs/common';
import type { Level } from 'pino';

import { contextStorage } from './context-storage';
import { logger } from './pino';

/**
 * this.logger.info('message');
 * this.logger.info({ guildId, channelId, userId, msg: 'message' });
 * this.logger.info({ guildId, channelId, userId }, 'message');
 * this.logger.error(Error, 'message');
 * this.logger.error({ guildId, channelId, userId, err: Error }, 'message');
 */
export class PinoLogger implements NestLoggerService {
  constructor(private context?: string) {}

  public static setMetadata(metadata: Record<string, unknown>): void {
    contextStorage.save(metadata);
  }

  public setContext(context: string): void {
    this.context = context;
  }

  public log(message: unknown, ...optionalParams: unknown[]): void {
    this.call('info', message, optionalParams);
  }

  public error(message: unknown, ...optionalParams: unknown[]): void {
    this.call('error', message, optionalParams);
  }

  public warn(message: unknown, ...optionalParams: unknown[]): void {
    this.call('warn', message, optionalParams);
  }

  public debug(message: unknown, ...optionalParams: unknown[]): void {
    this.call('debug', message, optionalParams);
  }

  public verbose(message: unknown, ...optionalParams: unknown[]): void {
    this.call('trace', message, optionalParams);
  }

  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument */
  private call(level: Level, message: any, params: any[]): void {
    const obj = <Record<'context' | 'err', any>>{ ...contextStorage.get() };

    if (this.context) {
      obj.context = this.context;
    } else if (params.length > 0) {
      obj.context = params.pop();
    }

    if (typeof message === 'object') {
      if (message instanceof Error) {
        // https://getpino.io/#/docs/api?id=errors
        obj.err = message;
      } else {
        Object.assign(obj, message);
      }

      logger[level](obj, ...params);
    } else if (level === 'error' && typeof message === 'string') {
      obj.err = new Error(message);
      if (params[0]) {
        obj.err.stack = params.pop();
      }

      logger[level](obj, ...params);
    } else {
      logger[level](obj, message, ...params);
    }
  }
}
