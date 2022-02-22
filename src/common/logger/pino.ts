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
  // https://getpino.io/#/docs/asynchronous?id=usage
  { stream: pino.destination({ dest: process.stdout.fd, sync: false }) },
  { stream: pino.destination({ dest: process.stderr.fd, sync: false }), level: 'error' },
], {}));
