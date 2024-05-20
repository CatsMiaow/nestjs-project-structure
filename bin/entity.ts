/* eslint-disable no-console, import/no-extraneous-dependencies */
/// <reference types="../typings/global" />
import { execSync } from 'child_process';
import { config } from 'dotenv';
import { readdirSync, writeFileSync } from 'fs';
import { join as pathJoin } from 'path';
import prompts from 'prompts';
import { rimrafSync } from 'rimraf';

config();
if (!process.env.DB_HOST) {
  throw new Error('Create a .env file');
}

(async (): Promise<void> => {
  const response = await prompts([
    {
      type: 'text',
      name: 'db',
      message: 'Please enter a database name.',
      validate: (value: string): boolean => !!value,
    } /* {
    type: 'select',
    name: 'db',
    message: 'Please select a database name.',
    choices: [
      { title: 'db1' },
      { title: 'db2' },
    ],
  } */,
  ]);

  const { db } = <{ db: string }>response;
  const MODEL_DIR = pathJoin(__dirname, '../src/entity', db);
  rimrafSync(`${MODEL_DIR}/*`);

  const generatorConfig = [
    '--noConfig',
    '--cf none', // file names
    '--ce pascal', // class names
    '--cp none', // property names
    '--strictMode !', // strictPropertyInitialization
    `--namingStrategy ${pathJoin(__dirname, 'NamingStrategy.js')}`,
    `-h ${process.env.DB_HOST}`,
    `-p ${process.env.DB_PORT}`,
    // https://github.com/Kononnable/typeorm-model-generator/issues/204#issuecomment-533709527
    // If you use multiple databases, add comma.
    `-d ${db}`, // `-d ${db},`,
    `-u ${process.env.DB_USER}`,
    `-x ${process.env.DB_PASSWORD}`,
    `-e ${process.env.DB_TYPE}`,
    `-o ${MODEL_DIR}`,
  ];

  try {
    execSync(`typeorm-model-generator ${generatorConfig.join(' ')}`, { stdio: 'pipe' });
  } catch (error) {
    console.error(`> Failed to load '${db}' database.`, error);
    return;
  }

  const files = [];
  readdirSync(MODEL_DIR).forEach((file: string) => {
    files.push(`export * from './${file.replace('.ts', '')}';`);
  });
  files.push('');
  // export entity db tables
  // AS-IS import { Tablename } from './entity/dbname/tablename';
  // TO-BE import { Tablename } from './entity/dbname';
  writeFileSync(pathJoin(MODEL_DIR, 'index.ts'), files.join('\n'));

  console.log(`> '${db}' database entities has been created: ${MODEL_DIR}`);
})().catch((error: unknown) => {
  console.error(error);
});
