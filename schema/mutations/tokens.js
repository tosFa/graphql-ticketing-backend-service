import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';
import { db } from '../../helpers';
import { SigInInputArgs } from '../types/index';

export const token = {
  description: 'fetch api tokens',
  args: SigInInputArgs,
  type: new GraphQLObjectType({
    name: 'token',
    description: 'token',
    fields: {
      auth_token: {
        type: GraphQLString,
        description: 'auth_token'
      },
    }
  }),
  resolve(root, args, context) {
    const userTable = args.loginAs === 'admin' ? 'admins' : 'customers';
console.log({ userTable });
    return db[userTable].find(admin => {
      if (admin.email === args.email && admin.password === args.password) {
        console.log({ admin });
        return true;
      }

    });
  }
};
