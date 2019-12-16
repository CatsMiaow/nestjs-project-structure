// tslint:disable: no-hardcoded-credentials
export const config = {
  db: {
    type: process.env.DB_TYPE || 'mysql',
    synchronize: false,
    logging: false,
    database: 'dbname',
    replication: {
      master: {
        host: process.env.DB_HOST || 'hostMaster',
        port: process.env.DB_PORT || 3306,
        username: process.env.DB_USER || 'username',
        password: process.env.DB_PASSWORD || 'password'
      },
      slaves: [{
        host: 'hostSlave',
        port: 3306,
        username: 'username',
        password: 'password'
      }]
    },
    extra: {
      connectionLimit: 30
    }
  },
  foo: 'pro-bar'
};
