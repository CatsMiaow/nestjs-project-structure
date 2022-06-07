import pino from 'pino';

const isProduction = (process.env.NODE_ENV === 'production');

export const logger = pino({
  ...(isProduction
    ? {}
    : {
      level: 'debug',
      transport: {
        // https://github.com/pinojs/pino-pretty
        target: 'pino-pretty',
      },
    }),
}, pino.multistream([
  // https://getpino.io/#/docs/help?id=log-to-different-streams
  { stream: process.stdout },
  { stream: process.stderr, level: 'error' },
], { dedupe: true }));
