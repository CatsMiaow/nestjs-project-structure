# Logger

## ConsoleLogger

This is a basic sample from this repository. \
Extend the built-in [ConsoleLogger](https://docs.nestjs.com/techniques/logger#extend-built-in-logger) in Nest and add `req.id` to the log as [request-scoped](https://docs.nestjs.com/fundamentals/injection-scopes#request-provider).

![console-logger](https://user-images.githubusercontent.com/1300172/155107295-0d8232ef-5223-41c1-ac51-b1f582563f49.png)

## PinoLogger

Implement `LoggerService` with [pino](https://github.com/pinojs/pino) and and add `req.id` to the log as [AsyncLocalStorage](https://nodejs.org/api/async_context.html#class-asynclocalstorage).

### Usage

1. Check the pino [configuration]('./pino.ts).
2. [middleware](../middleware/logger.middleware.ts)
3. [index](./index.ts)

**Development**
![dev-pino-logger](https://user-images.githubusercontent.com/1300172/155109548-90dd59e7-f0de-404e-8e88-3319e5f2917a.png)

**Production**
![prod-pino-logger](https://user-images.githubusercontent.com/1300172/155111590-eeb85470-197f-415b-8fe9-c8d647308bb3.png)
