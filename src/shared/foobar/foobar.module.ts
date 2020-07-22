import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sampletable1 } from '../../entity/sampledb1';
import { FoobarService } from './foobar.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sampletable1])],
  providers: [FoobarService],
  exports: [FoobarService],
})
export class FoobarModule {}
