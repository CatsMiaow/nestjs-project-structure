import type { Config, Default, Objectype, Production } from './config.interface.js';

const util = {
  isObject<T>(value: T): value is T & Objectype {
    return value != null && typeof value === 'object' && !Array.isArray(value);
  },
  merge<T extends Objectype, U extends Objectype>(target: T, source: U): T & U {
    for (const key of Object.keys(source)) {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (this.isObject(targetValue) && this.isObject(sourceValue)) {
        Object.assign(sourceValue, this.merge(targetValue, sourceValue));
      }
    }

    return { ...target, ...source };
  },
};

export const configuration = async (): Promise<Config> => {
  const { config } = <{ config: Default }>await import(`${import.meta.dirname}/envs/default.js`);
  const { config: environment } = <{ config: Production }>(
    await import(`${import.meta.dirname}/envs/${process.env.NODE_ENV || 'development'}.js`)
  );

  // object deep merge
  return util.merge(config, environment);
};
