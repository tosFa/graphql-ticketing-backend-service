import { GraphQLInt } from 'graphql';
import * as types from '../types';

export default {
  type: types.UserType,
  // args: {
  //   id: {
  //     type: GraphQLInt,
  //   },
  // },
  resolve: (root, args, context) => {
    return {
      id: 1,
      name: "bla",
      auth_token: "234",
      confirmation_token: "234",
    }
  }
};