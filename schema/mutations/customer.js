import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
import uuid from 'node-uuid';
import { db } from '../../helpers';
import { UserType, SigInInputArgs } from '../types/index';

export default {
  description: 'create a new admin',
  args: SigInInputArgs,
  type: UserType,
  async resolve(root, args, context) {
    const customer = { uuid: uuid.v4(), ...args };

    try {
      db.customers.push(customer);
    } catch(e) {
      console.error(e);
    }
    return { ...customer };
  }
};
