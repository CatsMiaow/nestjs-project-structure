# Debug

`DebugModule` registers a decorator that outputs logs along with the execution time in all methods of the `controllers` and `providers` of the module (including import module) to which the `@Debug` decorator is applied. \
Instead of adding a log to every method one by one, you can leave a log of execution of all methods with one decorator. \
It can also be applied only to specific classes or methods.

## Usage

See the [sample](./sample) folder for examples.

### Module

```ts
@Debug('ModuleContext')
@Module({
  imports: [DebugModule.forRoot()],
  controllers: [...],
  providers: [...],
})
export class AppModule {}
```

To exclude a specific class within a module

```ts
@Debug({ context: 'ModuleContext', exclude: [AppService] })
// OR
DebugModule.forRoot({ exclude: ['SampleService'] })
```

### Class

You don't need to import `DebugModule` and `@Debug` when using it in class. It works as a separate decorator. \
Registering `@DebugLog` in a class applies to all methods in the class, so there is no need to register `@DebugLog` in a method.

```ts
@Controller()
@DebugLog('ClassContext')
export class AppController {
  @Get()
  @DebugLog('MethodContext')
  public method() {}
}
```

## Logging

See [Logger](./debug-log.decorator.ts#L15-L21) to edit log format.

Example of log output of [step](./sample/sample.controller.ts#L16) method \
![step](https://user-images.githubusercontent.com/1300172/179880495-dea3c467-0088-40a9-b44a-150b4166a081.png)

Example of log output of [chain](./sample/sample.controller.ts#L24) method \
![chain](https://user-images.githubusercontent.com/1300172/179880502-a84157f9-38dc-45d6-a2c9-34e3be85f0a6.png)
