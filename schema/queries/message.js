import { GraphQLList, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLID } from 'graphql';
import { Message as MessageType } from '../types/index';
import { db } from '../../helpers';

export const messages = {
  description: 'gets a list of messages',
  args: {
    lastItem: {
      type: GraphQLID,
      description: 'lastItem',
    },
    limit: {
      type: GraphQLInt,
      description: 'limit',
    },
    issueUuid: {
      type: GraphQLID,
      description: 'issueUuid',
    }
  },
  type: new GraphQLList(MessageType),
  async resolve(root, args, context) {
    console.log({ args });
    return db.getMessages(args.issueUuid, args.lastItem, args.limit);
  },
};

export const message = {
  description: 'gets a list of issues',
  args: {
    uuid: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'uuid',
    },
  },
  type: MessageType,
  async resolve(root, args, context) {
    return db.messages.find(message => message.uuid === args.uuid);
  },
};