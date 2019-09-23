// tslint:disable: no-any no-console
import { Logger } from '@nestjs/common';

// https://docs.nestjs.com/techniques/logger
// Non-Injectable
export class CustomLogger extends Logger {
  public log(message: any, context?: string) {
    console.log(this.prefix(context), message);
    // super.log(message, context);
  }

  public error(message: any, trace?: string, context?: string) {
    console.error(this.prefix(context), message, '\n', trace);
    // super.error(message, trace, context);
  }

  private prefix(context?: string): string {
    let prefix = new Date().toLocaleString();
    if (context) {
      prefix += ` ${context}`;
    }

    return `${prefix}]`;
  }
}
