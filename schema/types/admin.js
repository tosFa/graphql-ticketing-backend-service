import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLEnumType } from 'graphql';

export const SigInInputArgs = {
  email: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'email'
  },
  password: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'password'
  },
  loginAs: {
    type: new GraphQLEnumType({
      name: 'loginAs',
      values: {
        admin: { value: 'admin' },
        customer: { value: 'customer' },
      }
    }),
    description: 'login as',
  },
};

export const UserType = new GraphQLObjectType({
  name: 'admin',
  description: 'admin',
  fields: {
    uuid: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'uuid',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'email'
    }
  }
});