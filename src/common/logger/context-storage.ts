import { AsyncLocalStorage } from 'async_hooks';

class ContextStorage<T = Record<string, unknown>> {
  private storage: AsyncLocalStorage<T>;

  constructor() {
    this.storage = new AsyncLocalStorage();
  }

  public save(metadata: T): void {
    this.storage.enterWith(metadata);
  }

  public get(): T | undefined {
    return this.storage.getStore();
  }
}

export const contextStorage = new ContextStorage();
