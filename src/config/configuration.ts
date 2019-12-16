import { config } from './default';

export const configuration = async () => {
  const environment = await import(`./${process.env.NODE_ENV || 'development'}`);

  // or deep merge
  return { ...config, ...environment.config };
};
