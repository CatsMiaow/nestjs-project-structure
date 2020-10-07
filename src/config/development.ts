export const config = {
  db: {
    type: process.env.DB_TYPE || 'mysql',
    synchronize: true,
    logging: true,
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'username',
    password: process.env.DB_PASSWORD || 'password',
    // database: 'dbname',
    extra: {
      connectionLimit: 10,
    },
  },
  foo: 'dev-bar',
};
