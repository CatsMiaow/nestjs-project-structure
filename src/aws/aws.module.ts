import { Module } from '@nestjs/common';

import { AWSService } from './aws.service';
import * as controllers from './controllers';
import * as providers from './providers';

@Module({
  controllers: Object.values(controllers),
  providers: [AWSService, ...Object.values(providers)],
})
export class AWSModule {}
