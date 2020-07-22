export const config = {
  db: {
    type: 'mysql',
    synchronize: false,
    logging: false,
    database: 'dbname',
    host: '127.0.0.1',
    port: 3306,
    username: 'username',
    password: 'password',
    extra: {
      connectionLimit: 5,
    },
  },
};
