import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tablename1 } from '../../entity/dbname1';
import { FoobarService } from './foobar.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tablename1])],
  providers: [FoobarService],
  exports: [FoobarService],
})
export class FoobarModule {}
