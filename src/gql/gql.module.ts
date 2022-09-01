import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sampletable1 } from '#entity/sampledb1';
import { SimpleService } from './providers';
import { SimpleResolver } from './resolvers';
import { DateScalar } from './scalars';

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
