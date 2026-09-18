/// <reference types="../typings/global" />
import ormconfig from './ormconfig';

/**
 * The `typeorm schema:sync` command loads the data source with its own loader, which cannot read
 * TypeScript, so drive the DataSource directly and let vite-node compile this file.
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
