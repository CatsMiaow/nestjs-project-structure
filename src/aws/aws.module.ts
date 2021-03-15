import { Module } from '@nestjs/common';

import { AwsService } from './aws.service';
import * as controllers from './controllers';
import * as providers from './providers';

@Module({
  controllers: Object.values(controllers),
  providers: [AwsService, ...Object.values(providers)],
})
export class AwsModule {}
