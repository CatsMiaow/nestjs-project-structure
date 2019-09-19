import { BadRequestException, Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { ConfigService } from '../../common/providers';
import { SampleDto } from '../dto';
import { DatabaseService } from '../providers';

/**
 * route /test/sample/*
 */
@Controller('sample')
export class SampleController {
  constructor(
    private readonly config: ConfigService,
    private readonly dbquery: DatabaseService) {}

  @Get()
  public hello() {
    return {
      hello: this.config.get('hello'),
      foo: this.config.get('foo')
    };
  }

  @Get('foo1')
  public foo1(@Query('name') name: string) {
    if (!name) {
      throw new BadRequestException('InvalidParameter');
    }

    return `bar1: ${name}`;
  }

  @Get('foo2/:name')
  public foo2(@Param('name') name: string) {
    return `bar2: ${name}`;
  }

  @Post('foo3')
  public foo3(@Body() param: SampleDto) {
    return `bar3: ${JSON.stringify(param)}`;
  }

  @Get('database')
  public database() {
    // this.dbquery.sample2();
    // this.dbquery.sample3();
    return this.dbquery.sample1();
  }
}
