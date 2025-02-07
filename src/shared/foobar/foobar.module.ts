import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FoobarService } from './foobar.service.js';
import { Sampletable1 } from '../../entity/sampledb1/index.js';

@Module({
  imports: [TypeOrmModule.forFeature([Sampletable1])],
  providers: [FoobarService],
  exports: [FoobarService],
})
export class FoobarModule {}
