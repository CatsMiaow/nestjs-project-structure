import { RequestMethod } from '@nestjs/common';
import type { Request } from 'express';
import type { IncomingMessage } from 'http';
import { nanoid } from 'nanoid';
import type { Params } from 'nestjs-pino';
import { multistream } from 'pino';
import type { ReqId } from 'pino-http';

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
  }, multistream([
    // https://getpino.io/#/docs/help?id=log-to-different-streams
    { stream: process.stdout },
    { stream: process.stderr, level: 'error' },
  ], { dedupe: true })],
  exclude: [
    { method: RequestMethod.GET, path: 'health' },
    { method: RequestMethod.ALL, path: 'graphql' },
  ],
};
