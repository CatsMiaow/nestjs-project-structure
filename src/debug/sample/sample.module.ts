import { Module } from '@nestjs/common';

import { Debug } from '../debug.decorator';
import { DebugModule } from '../debug.module';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';
import { SimpleLogController } from './simple-log.controller';

@Debug('ModuleContext')
@Module({
  imports: [DebugModule.forRoot()],
  controllers: [SampleController, SimpleLogController],
  providers: [SampleService],
})
export class SampleModule {}
