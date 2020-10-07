import { NotFoundException } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Simple } from '../models';
import { SimpleService } from '../providers';
import { SimpleInput, SimpleArgs } from '../dto';

@Resolver(() => Simple)
export class SimpleResolver {
  constructor(private simpleService: SimpleService) {}

  @Mutation(() => Simple)
  public create(@Args('simpleData') simpleData: SimpleInput): Promise<Simple> {
    return this.simpleService.create(simpleData);
  }

  @Query(() => Simple)
  public async read(@Args('id', { type: () => ID }) id: number): Promise<Simple> {
    const simple = await this.simpleService.read(id);
    if (!simple) {
      throw new NotFoundException('NotFoundData');
    }

    return simple;
  }

  @Query(() => [Simple])
  public async find(@Args() simpleArgs: SimpleArgs): Promise<Simple[]> {
    return this.simpleService.find(simpleArgs);
  }

  @Mutation(() => Boolean)
  public remove(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    return this.simpleService.remove(id);
  }
}
