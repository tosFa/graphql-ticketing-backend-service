import { graphqlExpress } from 'graphql-server-express';
import DataLoader from 'dataloader';
import schema from '../schema';
import { api, db } from '../helpers';

const createLoaders = (options) => ({
  resourceLoader: new DataLoader((urls) => Promise.all(urls.map((url) => api(url, options)))),
});

export default graphqlExpress((req) => {
  const query = req.body.query;

  if (query && query.length > 2000) {
    throw new Error('Query too large.');
  }

  const user = db.getByAuthToken(req.headers['chat-auth-token'] || '');
console.log({ user });
  return {
    schema,
    context: {
      user,
      loaders: createLoaders({})
    },
    // formatError: (error) => error,
    // formatResponse: (response, options) => response
  };

});