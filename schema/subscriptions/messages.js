import { GraphQLObjectType, GraphQLString } from 'graphql';

export default {
  description: 'Message Type',
  args: {
    text: {
      type: GraphQLString,
      description: 'Text',
    }
  },
  type: new GraphQLObjectType({
    name: 'text',
    description: 'text',
    fields: {
      text: {
        type: GraphQLString,
        description: 'Text',
      }
    }
  }),
  resolve: (object) => object,
}