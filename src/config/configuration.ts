import path from 'node:path';

import type { Config, Default, Objectype, Production } from './config.interface';

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
  // `module: nodenext` emits these as native dynamic imports, which need the file extension.
  // Running from source the file is `.ts`, but Vite maps the `.js` specifier back to it.
  const { config } = <{ config: Default }>await import(path.join(__dirname, 'envs', 'default.js'));
  const { config: environment } = <{ config: Production }>(
    await import(path.join(__dirname, 'envs', `${process.env.NODE_ENV || 'development'}.js`))
  );

  // object deep merge
  return util.merge(config, environment);
};
