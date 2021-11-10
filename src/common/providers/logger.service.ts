/* eslint-disable no-console, @typescript-eslint/no-unused-expressions */
import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

import { RequestContext } from './request-context.service';

/**
 * https://docs.nestjs.com/techniques/logger
 */
@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  private isProduction: boolean = (process.env.NODE_ENV === 'production');

  constructor(private req: RequestContext, context: string) {
    super(context);
  }

  private get reqContext(): string {
    return this.req.context?.id || '';
  }

  public override log(message: unknown, context?: string): void {
    this.isProduction
      ? console.log(this.prodContext(context), message)
      : super.log(message, this.devContext(context));
  }

  public override error(message: unknown, trace?: string, context?: string): void {
    this.isProduction
      ? console.error(this.prodContext(context), message, '\n', trace)
      : super.error(message, trace, this.devContext(context));
  }

  private getContext(context?: string): string {
    return context || this.context || '';
  }

  private prodContext(context?: string): string {
    // dayjs().format('YYYY-MM-DD HH:mm:ss');
    let prefix = new Date().toLocaleString();

    if (this.reqContext) {
      prefix += ` [${this.reqContext}]`;
    }

    const ctx = this.getContext(context);
    if (ctx) {
      prefix += ` [${ctx}]`;
    }

    return prefix;
  }

  private devContext(context?: string): string {
    const prefix = [];

    this.reqContext && prefix.push(this.reqContext);

    const ctx = this.getContext(context);
    ctx && prefix.push(ctx);

    return prefix.join('] [');
  }
}
