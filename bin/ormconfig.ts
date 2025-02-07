/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="../typings/global.d.ts" />
import * as dotenv from 'dotenv';
import { DataSource, type DataSourceOptions } from 'typeorm';

import { configuration } from '../src/config/index.js';

dotenv.config();
const ormconfig = async (): Promise<DataSource> => {
  const config = <{ db: DataSourceOptions }>await configuration();

  return new DataSource({
    ...config.db,
    entities: [`${import.meta.dirname}/../src/entity/**/*.{js,ts}`],
    migrations: [`${import.meta.dirname}/../src/migration/**/*.{js,ts}`],
  });
};

// eslint-disable-next-line import/no-default-export
export default ormconfig();
