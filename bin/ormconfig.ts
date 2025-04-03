// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="../typings/global" />
import * as dotenv from 'dotenv';
import { DataSource, type DataSourceOptions } from 'typeorm';

import { configuration } from '../src/config';

dotenv.config();
const ormconfig = async (): Promise<DataSource> => {
  const config = <{ db: DataSourceOptions }>await configuration();

  return new DataSource({
    ...config.db,
    entities: [`${__dirname}/../src/entity/**/*.{js,ts}`],
    migrations: [`${__dirname}/../src/migration/**/*.{js,ts}`],
  });
};

// eslint-disable-next-line import/no-default-export
export default ormconfig();
