export const config = {
  aws: {
    access_key_id: 'access_key_id',
    secret_access_key: 'secret_access_key',
    region: 'region',
  },
  graphql: {
    debug: true,
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
    autoSchemaFile: 'schema.gql',
    // cors: { credentials: true },
    // sortSchema: true,
    // installSubscriptionHandlers: true,
  },
  hello: 'world',
  jwtSecret: process.env.JWT_SECRET,
};
