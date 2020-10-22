import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';

import { AppModule } from './app.module';
import { Logger } from './common/providers';

/**
 * https://docs.nestjs.com
 * https://github.com/nestjs/nest/tree/master/sample
 * https://github.com/nestjs/nest/issues/2249#issuecomment-494734673
 */
async function bootstrap(): Promise<void> {
  const isProduction = (process.env.NODE_ENV === 'production');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: isProduction ? Logger : undefined,
  });
  // https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true,
    transform: true, // transform object to DTO class
  }));

  if (isProduction) {
    app.enable('trust proxy');
  }

  //#region Express Middleware
  app.use(compression());
  app.use(session({
    // Requires 'store' setup for production
    secret: 'tEsTeD',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: isProduction },
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  // https://github.com/graphql/graphql-playground/issues/1283#issuecomment-703631091
  app.use(helmet({ contentSecurityPolicy: isProduction ? undefined : false }));
  //#endregion

  await app.listen(process.env.PORT || 3000);
}

// eslint-disable-next-line no-console
bootstrap().then(() => console.log('Bootstrap', new Date().toLocaleString())).catch(console.error);
