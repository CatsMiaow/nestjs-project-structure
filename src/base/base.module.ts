import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import * as controllers from './controllers';

@Module({
  imports: [AuthModule], // Authentication
  controllers: Object.values(controllers),
})
export class BaseModule {}
