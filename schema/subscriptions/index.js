import { GraphQLObjectType } from 'graphql';
import event from './event';

export default new GraphQLObjectType({
  name: 'subscription',
  description: 'subscription',
  fields: {
    event
  }
});