import { BadRequestException, Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import { Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { Tablename1 } from '../../entity/dbname1';
import { SampleDto } from '../dto';
import { DatabaseService } from '../providers';
import { FoobarService } from '../../shared/foobar';

/**
 * route /test/sample/*
 */
@UseGuards(RolesGuard)
@Controller('sample')
export class SampleController {
  constructor(
    private readonly config: ConfigService,
    private readonly dbquery: DatabaseService,
    private readonly foobarService: FoobarService,
  ) {}

  @Get()
  public sample(): object {
    return {
      hello: this.config.get('hello'),
      foo: this.config.get('foo'),
    };
  }

  @Get('hello') // test/sample/hello
  public hello(@Req() req: Request, @Res() res: Response): void {
    res.json({
      message: req.originalUrl,
    });
  }

  @Get('hello/query') // test/sample/hello/query?name=anything
  public helloQuery(@Query('name') name: string): string {
    if (!name) {
      throw new BadRequestException('InvalidParameter');
    }

    return `hello: ${name}`;
  }

  @Get('hello/param/:name') // test/sample/hello/param/anything
  public helloParam(@Param('name') name: string): string {
    return `hello: ${name}`;
  }

  @Post('hello/body') // test/sample/hello/body
  public helloBody(@Body() param: SampleDto): string {
    return `hello: ${JSON.stringify(param)}`;
  }

  @Get('database')
  public database(): Promise<Tablename1[]> {
    // this.dbquery.sample2();
    // this.dbquery.sample3();
    return this.dbquery.sample1();
  }

  @Get('foobars')
  public foobars(): Promise<Tablename1[]> {
    return this.foobarService.getFoobars();
  }

  @Roles('admin')
  @Get('admin')
  public admin(): string {
    return 'Need admin role';
  }
}
