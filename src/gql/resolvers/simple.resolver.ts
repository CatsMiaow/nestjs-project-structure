import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { JwtAuthGuard } from '../../auth';
import { ReqUser, Roles, RolesGuard } from '../../common';
import { SimpleInput, SimpleArgs } from '../dto';
import { Simple, Payload } from '../models';
import { SimpleService } from '../providers';

@Resolver(() => Simple)
export class SimpleResolver {
  constructor(
    @InjectPinoLogger(SimpleService.name) private readonly logger: PinoLogger,
    private simpleService: SimpleService,
  ) {}

  @Query(() => Payload)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('test')
  public user(@ReqUser() user: Payload): Payload {
    this.logger.info('user');

    return user;
  }

  @Mutation(() => Simple)
  public async create(@Args('simpleData') simpleData: SimpleInput): Promise<Simple> {
    this.logger.info('create');

    return this.simpleService.create(simpleData);
  }

  @Query(() => Simple)
  public async read(@Args('id', { type: () => ID }) id: number): Promise<Simple> {
    this.logger.info('read');

    const simple = await this.simpleService.read(id);
    if (!simple) {
      throw new NotFoundException('NotFoundData');
    }

    return simple;
  }

  @Query(() => [Simple])
  public async find(@Args() simpleArgs: SimpleArgs): Promise<Simple[]> {
    this.logger.info('find');

    return this.simpleService.find(simpleArgs);
  }

  @Mutation(() => Boolean)
  public async remove(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    this.logger.info('remove');

    return this.simpleService.remove(id);
  }
}
