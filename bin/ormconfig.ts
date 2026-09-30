/// <reference types="../typings/global" />
import { globSync } from 'node:fs';
import path from 'node:path';
import { loadEnvFile } from 'node:process';
import { DataSource, type DataSourceOptions } from 'typeorm';

import { configuration } from '../src/config';

try {
  loadEnvFile();
} catch {}

const root = path.join(__dirname, '..');

const ormconfig = async (): Promise<DataSource> => {
  const config = <{ db: DataSourceOptions }>await configuration();
  // TypeORM cannot load TypeScript entities from glob paths, so import them here.
  const files = globSync('src/entity/**/*.entity.ts', { cwd: root });
  const modules = await Promise.all(files.map(async (file) => <Record<string, unknown>>await import(path.join(root, file))));

  return new DataSource({
    ...config.db,
    entities: <DataSourceOptions['entities']>modules.flatMap((entityModule) => Object.values(entityModule)),
  });
};

// eslint-disable-next-line import/no-default-export
export default ormconfig();
