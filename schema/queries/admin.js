import { GraphQLList, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLID } from 'graphql';
import { UserType } from '../types/index';
import { db } from '../../helpers';

export const admins = {
  description: 'gets a list of admins',
  args: {
    lastItem: {
      type: GraphQLString,
      description: 'lastItem',
    },
    limit: {
      type: GraphQLInt,
      description: 'limit',
    }
  },
  type: new GraphQLList(UserType),
  async resolve(root, args, context) {
    return db.admins;
  },
};

export const admin = {
  description: 'admin model',
  args: {
    uuid: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'uuid',
    },
  },
  type: UserType,
  async resolve(root, args, context) {
    return db.admins.find(admin => admin.uuid === args.uuid);
  },
};