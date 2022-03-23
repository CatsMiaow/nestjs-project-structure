export const config = {
  graphql: {
    debug: true,
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
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
