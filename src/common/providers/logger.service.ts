/* eslint-disable no-console */
import { Injectable, Logger as BaseLogger, Scope } from '@nestjs/common';

import { RequestContext } from './request-context.service';

/**
 * https://docs.nestjs.com/techniques/logger
 */
@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends BaseLogger {
  constructor(private req: RequestContext, public context?: string) {
    super(context);
  }

  public log(message: unknown): void {
    // super.log(message, this.context);
    console.log(this.prefix(), message);
  }

  public error(message: unknown, trace?: string): void {
    // super.error(message, trace, this.context);
    console.error(this.prefix(), message, '\n', trace);
  }

  private prefix(): string {
    let prefix = '';
    if (this.req.context?.id) {
      prefix += `[${this.req.context.id}] `;
    }

    // dayjs().format('YYYY-MM-DD HH:mm:ss');
    prefix += new Date().toLocaleString();

    if (this.context) {
      prefix += ` [${this.context}]`;
    }

    return prefix;
  }
}
