const config = require('config');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const shell = require('shelljs');

/**
 * npm run entity dbname [skip]
 */
process.env.PATH += (path.delimiter + path.join(process.cwd(), 'node_modules', '.bin'));
if (process.argv.length < 3) {
  throw new Error('RequiredDatabase');
};

const db = process.argv[2];
const isBuild = process.argv[3] !== 'skip';

/* const DATABASE = [];
if (!DATABASE.includes(db)) {
  throw new Error('InvalidDatabase');
} */

const MODEL_DIR = path.join(__dirname, '../src/entity', db);
rimraf.sync(`${MODEL_DIR}/*`);

const dbConfig = config.get('db');
shell.exec('typeorm-model-generator --noConfig --ce pascal '
  + `-h ${dbConfig.replication.master.host} `
  + `-p ${dbConfig.replication.master.port} `
  // https://github.com/Kononnable/typeorm-model-generator/issues/204#issuecomment-533709527
  // If you use multiple databases, add comma.
  + `-d ${db} ` // + `-d ${db}, `
  + `-u ${dbConfig.replication.master.username} `
  + `-x ${dbConfig.replication.master.password} `
  + `-e ${dbConfig.type} `
  + `-o ${MODEL_DIR}`);

const files = [];
fs.readdirSync(MODEL_DIR).forEach((file) => {
  files.push(`export * from './${file.replace('.ts', '')}';`);
});
files.push('');
// export entity db tables
// AS-IS import { Tablename } from './entity/dbname/tablename';
// TO-BE import { Tablename } from './entity/dbname';
fs.writeFileSync(path.join(MODEL_DIR, 'index.ts'), files.join('\n'));

// Build skips and builds manually when errors occur
if (isBuild) {
  shell.exec('npm run build:entity');
}
