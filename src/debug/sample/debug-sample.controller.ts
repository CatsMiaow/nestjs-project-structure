import { Controller, Get } from '@nestjs/common';

import { DebugLog } from '../debug-log.decorator';
import { DebugSampleService } from './debug-sample.service';

/**
 * route /test/debug/*
 */
@Controller('debug')
@DebugLog('ClassContext')
export class DebugSampleController {
  constructor(private debugSample: DebugSampleService) {}

  @Get() // http://localhost:3000/test/debug
  @DebugLog('MethodContext')
  public step(): string {
    this.debugSample.stepOne('hello');
    this.debugSample.stepTwo('world');
    this.debugSample.stepThree();
    return 'OK';
  }

  @Get('chain') // http://localhost:3000/test/debug/chain
  public stepChain(): string {
    return this.debugSample.stepStart();
  }
}
