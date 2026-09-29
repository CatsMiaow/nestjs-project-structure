import type { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import type { Params } from 'nestjs-pino';
import { multistream } from 'pino';
import type { ReqId } from 'pino-http';

const passUrl = new Set(['/health', '/graphql']);

export const loggerOptions: Params<Request, Response> = {
  // Also add the fields of PinoLogger.assign() to the "request completed" log.
  assignResponse: true,
  pinoHttp: [
    {
      // https://getpino.io/#/docs/api?id=timestamp-boolean-function
      // Change time value in production log.
      // timestamp: stdTimeFunctions.isoTime,
      quietReqLogger: true,
      enabled: process.env.NODE_ENV !== 'test',
      genReqId: (req): ReqId => req.header('X-Request-Id') ?? nanoid(),
      ...(process.env.NODE_ENV === 'production'
        ? {}
        : {
            level: 'debug',
            // https://github.com/pinojs/pino-pretty
            transport: {
              target: 'pino-pretty',
              options: { sync: true, singleLine: true },
            },
          }),
      autoLogging: {
        ignore: (req) => passUrl.has(req.originalUrl),
      },
    },
    multistream(
      [
        // https://getpino.io/#/docs/help?id=log-to-different-streams
        { level: 'debug', stream: process.stdout },
        { level: 'error', stream: process.stderr },
        { level: 'fatal', stream: process.stderr },
      ],
      { dedupe: true },
    ),
  ],
};
