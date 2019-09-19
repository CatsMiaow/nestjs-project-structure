import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';

import { AppModule } from './app.module';

/**
 * https://docs.nestjs.com
 * https://github.com/nestjs/nest/tree/master/sample
 * https://github.com/nestjs/nest/issues/2249#issuecomment-494734673
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true
    // transform: true
  }));

  //#region Express Middleware
  app.use(session({
    secret: 'tEsTeD',
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());
  //#endregion

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
