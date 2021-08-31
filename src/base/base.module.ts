import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { AuthModule } from '../auth';
import * as controllers from './controllers';

@Module({
  imports: [TerminusModule, AuthModule, HttpModule], // Authentication
  controllers: Object.values(controllers),
})
export class BaseModule {}
