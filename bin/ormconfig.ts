/// <reference types="../typings/global" />
import { loadEnvFile } from 'node:process';
import { DataSource, type DataSourceOptions } from 'typeorm';

import * as sampledb1 from '../src/entity/sampledb1';
import * as sampledb2 from '../src/entity/sampledb2';
import { configuration } from '../src/config';

try {
  loadEnvFile();
} catch {}

// TypeORM resolves glob paths with its own loader, which cannot read TypeScript.
// Passing the classes keeps the entities inside the module graph vite-node compiles.
// Add the folder here after creating it with `npm run entity:load`.
const entities = [...Object.values(sampledb1), ...Object.values(sampledb2)];

const ormconfig = async (): Promise<DataSource> => {
  const config = <{ db: DataSourceOptions }>await configuration();

  return new DataSource({
    ...config.db,
    entities,
  });
};

// eslint-disable-next-line import/no-default-export
export default ormconfig();
