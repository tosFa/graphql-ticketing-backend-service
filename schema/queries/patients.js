import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
import { api } from '../../helpers';

export default {
  description: 'get patient account',
  type: new GraphQLObjectType({
    name: 'patient',
    description: 'patient',
    fields: {
      birth_date: {
        type: GraphQLString,
        description: 'birth_date'
      },
      carrier_type: {
        type: GraphQLString,
        description: 'carrier_type'
      },
      email: {
        type: GraphQLString,
        description: 'email'
      },
      fullname: {
        type: GraphQLString,
        description: 'fullname'
      },
    }
  }),
  resolve(root, args, { options }) {
    return api('account/', options);
  }
};
