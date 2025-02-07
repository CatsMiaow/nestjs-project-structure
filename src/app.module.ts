import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE, RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from './auth/index.js';
import { BaseModule } from './base/index.js';
import { CommonModule, ExceptionsFilter } from './common/index.js';
import { configuration, loggerOptions } from './config/index.js';
import { SampleModule as DebugSampleModule } from './debug/index.js';
import { GqlModule } from './gql/index.js';
import { SampleModule } from './sample/index.js';

@Module({
  imports: [
    // https://getpino.io
    // https://github.com/iamolegga/nestjs-pino
    LoggerModule.forRoot(loggerOptions),
    // Configuration
    // https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // Database
    // https://docs.nestjs.com/techniques/database
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeOrmModuleOptions>('db'),
      }),
      inject: [ConfigService],
    }),
    // Static Folder
    // https://docs.nestjs.com/recipes/serve-static
    // https://docs.nestjs.com/techniques/mvc
    ServeStaticModule.forRoot({
      rootPath: `${import.meta.dirname}/../public`,
      renderPath: '/',
    }),
    // Service Modules
    AuthModule, // Global for Middleware
    CommonModule, // Global
    BaseModule,
    SampleModule,
    GqlModule,
    DebugSampleModule,
    // Module Router
    // https://docs.nestjs.com/recipes/router-module
    RouterModule.register([
      {
        path: 'test',
        module: SampleModule,
      },
      {
        path: 'test',
        module: DebugSampleModule,
      },
    ]),
  ],
  providers: [
    // Global Guard, Authentication check on all routers
    // { provide: APP_GUARD, useClass: AuthenticatedGuard },
    // Global Filter, Exception check
    { provide: APP_FILTER, useClass: ExceptionsFilter },
    // Global Pipe, Validation check
    // https://docs.nestjs.com/pipes#global-scoped-pipes
    // https://docs.nestjs.com/techniques/validation
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        // disableErrorMessages: true,
        transform: true, // transform object to DTO class
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
