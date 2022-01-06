/* eslint-disable @typescript-eslint/ban-types */
import { Logger } from '@nestjs/common';
import { performance } from 'perf_hooks';

const MethodLog = (context?: string): MethodDecorator => (
  (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
    const originalMethod: unknown = descriptor.value;
    if (typeof originalMethod !== 'function') {
      return;
    }

    descriptor.value = async function (...args: unknown[]): Promise<unknown> {
      const start = performance.now();
      const result: unknown = await originalMethod.apply(this, args);
      const end = performance.now();

      const time = (end - start).toFixed(2);
      const ownKey = (typeof target === 'function') ? `${target.name}` : '';
      const name = context ? `${ownKey}.${String(propertyKey)}` : String(propertyKey);
      const params = (args.length > 0) ? `(${args})` : '';

      Logger.debug(`${name}${params} +${time}ms`, context || ownKey);
      // or Use result to add response log
      return result;
    };
  }
);

/**
 * https://stackoverflow.com/questions/47621364
 * https://github.com/Papooch/decorate-all
 */
const ClassLog = (context?: string): ClassDecorator => (
  (target: Function): void => {
    const descriptors = Object.getOwnPropertyDescriptors(target.prototype);

    for (const [propertyKey, descriptor] of Object.entries(descriptors)) {
      const originalMethod: unknown = descriptor.value;
      if (!(originalMethod instanceof Function) || propertyKey === 'constructor') {
        continue;
      }

      MethodLog(context)(target, propertyKey, descriptor);

      if (originalMethod !== descriptor.value) {
        const metadataKeys = Reflect.getMetadataKeys(originalMethod);
        for (const key of metadataKeys) {
          const value = Reflect.getMetadata(key, originalMethod);
          Reflect.defineMetadata(key, value, <Object>descriptor.value);
        }
      }

      Object.defineProperty(target.prototype, propertyKey, descriptor);
    }
  }
);

export const DebugLog = (context?: string): ClassDecorator & MethodDecorator => (
  (target: Object, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): void => {
    if (!descriptor) {
      ClassLog(context)(<Function>target);
    } else if (propertyKey) {
      MethodLog(context)(target, propertyKey, descriptor);
    }
  }
);
