import { Module } from '@nestjs/common';

import { SampleController } from './sample.controller.js';
import { SampleService } from './sample.service.js';
import { SimpleLogController } from './simple-log.controller.js';
import { Debug } from '../debug.decorator.js';
import { DebugModule } from '../debug.module.js';

@Debug('ModuleContext')
@Module({
  imports: [DebugModule.forRoot({})],
  controllers: [SampleController, SimpleLogController],
  providers: [SampleService],
})
export class SampleModule {}
