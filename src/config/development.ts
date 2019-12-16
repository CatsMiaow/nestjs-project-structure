// tslint:disable: no-hardcoded-credentials
export const config = {
  db: {
    type: process.env.DB_TYPE || 'mysql',
    synchronize: false,
    logging: true,
    database: 'dbname',
    replication: {
      master: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        username: process.env.DB_USER || 'username',
        password: process.env.DB_PASSWORD || 'password'
      },
      slaves: [{
        host: '127.0.0.1',
        port: 3306,
        username: 'username',
        password: 'password'
      }]
    },
    extra: {
      connectionLimit: 10
    }
  },
  foo: 'dev-bar'
};
