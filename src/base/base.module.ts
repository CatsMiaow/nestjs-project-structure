import { Module } from '@nestjs/common';

import { AuthModule } from '../auth';
import * as controllers from './controllers';

@Module({
  imports: [AuthModule], // Authentication
  controllers: Object.values(controllers),
})
export class BaseModule {}
