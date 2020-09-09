export const config = {
  db: {
    type: 'mysql',
    synchronize: false,
    logging: false,
    host: '127.0.0.1',
    port: 3306,
    username: 'username',
    password: 'password',
    database: 'dbname',
    extra: {
      connectionLimit: 5,
    },
  },
};
