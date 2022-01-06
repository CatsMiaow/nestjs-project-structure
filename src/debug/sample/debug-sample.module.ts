import { Module } from '@nestjs/common';

import { Debug } from '../debug.decorator';
import { DebugModule } from '../debug.module';
import { DebugSampleController } from './debug-sample.controller';
import { DebugSampleService } from './debug-sample.service';

@Debug('ModuleContext')
@Module({
  imports: [DebugModule.forRoot()],
  controllers: [DebugSampleController],
  providers: [DebugSampleService],
})
export class DebugSampleModule {}
