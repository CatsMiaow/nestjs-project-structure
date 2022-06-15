/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="../typings/global" />
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import prompts from 'prompts';
import * as rimraf from 'rimraf';
import * as shell from 'shelljs';

dotenv.config();
if (!process.env.DB_HOST) {
  throw new Error('Create a .env file');
}

process.env['PATH'] += (path.delimiter + path.join(process.cwd(), 'node_modules', '.bin'));
(async (): Promise<void> => {
  const response = await prompts([{
    type: 'text',
    name: 'db',
    message: 'Please enter a database name.',
    validate: (value: string): boolean => !!value,
  }, /* {
    type: 'select',
    name: 'db',
    message: 'Please select a database name.',
    choices: [
      { title: 'db1' },
      { title: 'db2' },
    ],
  } */]);

  const { db } = <{ db: string }>response;
  const MODEL_DIR = path.join(__dirname, '../src/entity', db);
  rimraf.sync(`${MODEL_DIR}/*`);

  const generatorConfig = [
    '--noConfig',
    '--cf none', // file names
    '--ce pascal', // class names
    '--cp none', // property names
    '--strictMode !', // strictPropertyInitialization
    `--namingStrategy ${path.join(__dirname, 'NamingStrategy.js')}`,
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
  shell.exec(`typeorm-model-generator ${generatorConfig.join(' ')}`);

  const files = [];
  fs.readdirSync(MODEL_DIR).forEach((file: string) => {
    files.push(`export * from './${file.replace('.ts', '')}';`);
  });
  files.push('');
  // export entity db tables
  // AS-IS import { Tablename } from './entity/dbname/tablename';
  // TO-BE import { Tablename } from './entity/dbname';
  fs.writeFileSync(path.join(MODEL_DIR, 'index.ts'), files.join('\n'));
})();
