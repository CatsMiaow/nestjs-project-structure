# Debug

`DebugModule` outputs a log along with execution times when all methods of `controllers` and `providers` in the module (including import modules) in which the decorator is registered are executed. \
It can be used on a per module/class/method basis.

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
```

### Class

There is no need to import `DebugModule` when using it in class. It works as a separate decorator. \
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

See [Logger](./debug-log.decorator.ts#L22) to edit log format.

Example of log output of [step](./sample/debug-sample.controller.ts#L16) method \
![step](https://user-images.githubusercontent.com/1300172/148489601-91c5e3be-4122-464d-abfd-997fe9721c0b.png)

Example of log output of [chain](./sample/debug-sample.controller.ts#L24) method \
![chain](https://user-images.githubusercontent.com/1300172/148489682-99996cc9-7d9b-4c9e-a74e-1af4eaa184a5.png)
