import { Global, Module } from '@nestjs/common';

import * as providers from './providers';

@Global()
@Module({
  providers: Object.values(providers),
  exports: Object.values(providers),
})
export class CommonModule {}
