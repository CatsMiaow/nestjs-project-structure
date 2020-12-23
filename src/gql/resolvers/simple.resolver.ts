import { NotFoundException } from '@nestjs/common';
import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ForbiddenError } from 'apollo-server-express';
import type { Request } from 'express';

import { Logger } from '../../common/providers';
import { SimpleInput, SimpleArgs } from '../dto';
import { Simple, User } from '../models';
import { SimpleService } from '../providers';

@Resolver(() => Simple)
export class SimpleResolver {
  constructor(private readonly logger: Logger, private simpleService: SimpleService) {
    this.logger.setContext(SimpleResolver.name);
  }

  // access before method call: http://localhost:3000/login-test?username=test&password=test
  @Query(() => User)
  public user(@Context('req') req: Request): User {
    this.logger.log('user');
    if (!req.user) {
      throw new ForbiddenError('NotFoundUser');
    }

    return req.user;
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
