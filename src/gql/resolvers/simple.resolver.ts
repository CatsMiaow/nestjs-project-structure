import { NotFoundException } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Simple } from '../models';
import { SimpleService } from '../providers';
import { SimpleInput, SimpleArgs } from '../dto';
import { Logger } from '../../common/providers';

@Resolver(() => Simple)
export class SimpleResolver {
  constructor(private simpleService: SimpleService, private logger: Logger) {
    this.logger.setContext(SimpleResolver.name);
  }

  @Mutation(() => Simple)
  public create(@Args('simpleData') simpleData: SimpleInput): Promise<Simple> {
    this.logger.log('create');

    return this.simpleService.create(simpleData);
  }

  @Query(() => Simple)
  public async read(@Args('id', { type: () => ID }) id: number): Promise<Simple> {
    this.logger.log('read');

    const simple = await this.simpleService.read(id);
    if (!simple) {
      throw new NotFoundException('NotFoundData');
    }

    return simple;
  }

  @Query(() => [Simple])
  public async find(@Args() simpleArgs: SimpleArgs): Promise<Simple[]> {
    this.logger.log('find');

    return this.simpleService.find(simpleArgs);
  }

  @Mutation(() => Boolean)
  public remove(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    this.logger.log('remove');

    return this.simpleService.remove(id);
  }
}
