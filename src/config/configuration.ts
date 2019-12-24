import { config } from './default';

export const util = {
  isObject<T>(value: T): boolean {
    return value !== null && typeof value === 'object' && Array.isArray(value) === false;
  },
  // tslint:disable-next-line: no-any
  merge(target: Record<string, any>, source: Record<string, any>) {
    for (const key of Object.keys(source)) {
      if (this.isObject(target[key]) && this.isObject(source[key])) {
        Object.assign(source[key], this.merge(target[key], source[key]));
      }
    }

    return { ...target, ...source };
  }
};

export const configuration = async () => {
  const environment = await import(`./${process.env.NODE_ENV || 'development'}`);

  // object deep merge
  return util.merge(config, environment.config);
};
