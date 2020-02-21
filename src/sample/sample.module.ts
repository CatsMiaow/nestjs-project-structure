import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tablename1 } from '../entity/dbname1';
import { Tablename2 } from '../entity/dbname2';
import { FoobarModule } from '../shared/foobar';
import * as controllers from './controllers';
import * as providers from './providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // ...Object.values(tables)
      Tablename1, Tablename2,
    ]),
    FoobarModule, // Shared Module
  ],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class SampleModule {}
