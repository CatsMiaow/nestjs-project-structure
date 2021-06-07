import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { AuthModule } from '../auth';
import * as controllers from './controllers';

@Module({
  imports: [TerminusModule, AuthModule], // Authentication
  controllers: Object.values(controllers),
})
export class BaseModule {}
