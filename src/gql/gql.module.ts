import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SimpleService } from './providers/index.js';
import { SimpleResolver } from './resolvers/index.js';
import { DateScalar } from './scalars/index.js';
import { Sampletable1 } from '../entity/sampledb1/index.js';

/**
 * https://docs.nestjs.com/graphql/quick-start
 */
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => ({
        ...config.get<GqlModuleOptions>('graphql'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Sampletable1]),
  ],
  providers: [SimpleResolver, SimpleService, DateScalar],
})
export class GqlModule {}
