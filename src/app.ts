import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { middleware } from './app.middleware';
import { AppModule } from './app.module';
import { Logger } from './common';

/**
 * https://docs.nestjs.com
 * https://github.com/nestjs/nest/tree/master/sample
 * https://github.com/nestjs/nest/issues/2249#issuecomment-494734673
 */
async function bootstrap(): Promise<void> {
  const isProduction = (process.env.NODE_ENV === 'production');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    autoFlushLogs: true,
  });

  app.useLogger(await app.resolve(Logger));
  // https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true,
    transform: true, // transform object to DTO class
  }));

  if (isProduction) {
    app.enable('trust proxy');
  }

  // Express Middleware
  middleware(app);

  await app.listen(process.env.PORT || 3000);
}

// eslint-disable-next-line no-console
bootstrap().then(() => console.log('Bootstrap', new Date().toLocaleString())).catch(console.error);
