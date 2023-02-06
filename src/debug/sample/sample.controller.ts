import { Controller, Get } from '@nestjs/common';

import { SampleService } from './sample.service';
import { DebugLog } from '../debug-log.decorator';

/**
 * route /test/debug/*
 */
@Controller('debug')
@DebugLog('ClassContext')
export class SampleController {
  constructor(private sample: SampleService) {}

  @Get() // http://localhost:3000/test/debug
  @DebugLog('MethodContext')
  public step(): string {
    this.sample.stepOne('hello');
    this.sample.stepTwo('world');
    this.sample.stepThree();
    return 'OK';
  }

  @Get('chain') // http://localhost:3000/test/debug/chain
  public stepChain(): string {
    return this.sample.stepStart();
  }
}
