/// <reference types="../typings/global" />
import ormconfig from './ormconfig';

/**
 * Synchronizes the database schema with the entities.
 * https://typeorm.io/docs/data-source/data-source-api
 */
(async (): Promise<void> => {
  const dataSource = await (await ormconfig).initialize();

  try {
    await dataSource.synchronize();
    console.log('> Schema synchronization finished successfully.');
  } finally {
    await dataSource.destroy();
  }
})().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
