import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';

import { AppModule } from './app.module';
import { CustomLogger } from './common/providers';

/**
 * https://docs.nestjs.com
 * https://github.com/nestjs/nest/tree/master/sample
 * https://github.com/nestjs/nest/issues/2249#issuecomment-494734673
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true,
    transform: true // transform object to DTO class
  }));

  if (process.env.NODE_ENV === 'production') {
    app.useLogger(app.get(CustomLogger));
    app.set('trust proxy', 1);
  }

  //#region Express Middleware
  app.use(compression());
  app.use(session({
    secret: 'tEsTeD',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());
  //#endregion

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
