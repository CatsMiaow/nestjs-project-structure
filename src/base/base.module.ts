import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import * as controllers from './controllers';
import { AuthModule } from '../auth';

@Module({
  imports: [TerminusModule, AuthModule, HttpModule], // Authentication
  controllers: Object.values(controllers),
})
export class BaseModule {}
