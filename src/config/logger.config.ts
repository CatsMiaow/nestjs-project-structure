import type { Request } from 'express';
import type { IncomingMessage } from 'http';
import { nanoid } from 'nanoid';
import type { Params } from 'nestjs-pino';
import { multistream } from 'pino';
import type { ReqId } from 'pino-http';

const passUrl = ['/health', '/graphql'];

export const loggerOptions: Params = {
  pinoHttp: [{
    quietReqLogger: true,
    genReqId: (req: IncomingMessage): ReqId => (<Request>req).header('X-Request-Id') || nanoid(),
    ...(process.env.NODE_ENV === 'production'
      ? {}
      : {
        level: 'debug',
        // https://github.com/pinojs/pino-pretty
        transport: { target: 'pino-pretty', options: { singleLine: true } },
      }),
    autoLogging: {
      ignore: (req: IncomingMessage) => passUrl.includes((<Request>req).originalUrl),
    },
  }, multistream([
    // https://getpino.io/#/docs/help?id=log-to-different-streams
    { stream: process.stdout },
    { stream: process.stderr, level: 'error' },
  ], { dedupe: true })],
};
