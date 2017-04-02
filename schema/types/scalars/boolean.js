import { GraphQLObjectType, GraphQLBoolean, GraphQLNonNull } from 'graphql';

export const BooleanType = new GraphQLObjectType({
  name: 'boolean',
  description: 'boolean',
  fields: {
    success: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'boolean outcome of the operation'
    }
  }
})