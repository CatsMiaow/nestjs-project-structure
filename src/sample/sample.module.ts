import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as controllers from './controllers/index.js';
import * as providers from './providers/index.js';
import { Sampletable1 } from '../entity/sampledb1/index.js';
import { Sampletable2 } from '../entity/sampledb2/index.js';
import { FoobarModule } from '../shared/foobar/index.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // ...Object.values(tables)
      Sampletable1,
      Sampletable2,
    ]),
    FoobarModule, // Shared Module
  ],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class SampleModule {}
