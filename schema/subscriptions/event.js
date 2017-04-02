import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';


export const eventInputArgs = {
  group: {
    type: GraphQLString,
    description: 'group',
  },
  types: {
    type: new GraphQLList(GraphQLString),
    description: 'eventType',
  },
  timestamp: {
    type: GraphQLString,
    description: 'timestamp',
  },
};

export const eventOutputArgs = {
  ...eventInputArgs,
  payload: {
    type: GraphQLString,
    description: 'payload',
  },
};

export default {
  description: 'Event',
  args: eventInputArgs,
  type: new GraphQLObjectType({
    name: 'channelEvent',
    description: 'channel Event Type',
    fields: eventOutputArgs
  }),
  resolve: (object) => object,
}