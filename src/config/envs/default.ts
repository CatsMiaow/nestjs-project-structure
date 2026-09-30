export const config = {
  db: {},
  graphql: {
    debug: true,
    graphiql: true,
    autoSchemaFile: true,
    autoTransformHttpErrors: true,
    // cors: { credentials: true },
    // sortSchema: true,
    // installSubscriptionHandlers: true,
  },
  hello: 'world',
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
};
