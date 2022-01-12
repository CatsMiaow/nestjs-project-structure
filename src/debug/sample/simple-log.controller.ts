import { Get } from '@nestjs/common';

import { LogController } from './log-controller.decorator';

/**
 * route /test/debug/log/*
 */
@LogController({ context: 'Simple', path: 'debug/log' })
export class SimpleLogController {
  @Get() // http://localhost:3000/test/debug/log
  public log(): string {
    return 'OK';
  }
}
