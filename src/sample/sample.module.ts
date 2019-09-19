import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as tables from '../entity/dbname';
import * as controllers from './controllers';
import * as providers from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([
    ...Object.values(tables)
  ])],
  controllers: Object.values(controllers),
  providers: Object.values(providers)
})
export class SampleModule {}
