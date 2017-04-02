import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
import uuid from 'node-uuid';
import { db } from '../../helpers';
import { UserType, SigInInputArgs } from '../types/index';

export default {
  description: 'create a new admin',
  args: SigInInputArgs,
  type: UserType,
  async resolve(root, args, context) {
    const admin = { uuid: uuid.v4(), ...args };

    try {
      db.admins.push(admin);
    } catch(e) {
      console.error(e);
    }
    return { ...admin };
  }
};
