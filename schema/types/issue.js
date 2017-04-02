import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt } from 'graphql';
import { Message as MessageType } from './message';
import { UserType } from './admin';
import { db } from '../../helpers';

const paginationInput = {
  lastItem: {
    type: GraphQLString,
    description: 'lastItem',
  },
  limit: {
    type: GraphQLInt,
    description: 'limit',
  },
};

export const IssueInputArgs = {
  title: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'title'
  }
};

export const IssueOutputArgs =  {
  uuid: {
    type: new GraphQLNonNull(GraphQLID),
    description: 'Uuid',
  },
  customerUuid: {
    type: new GraphQLNonNull(GraphQLID),
    description: 'customerUuid'
  },
  ...IssueInputArgs,
};

export const Issue = new GraphQLObjectType({
  name: 'issue',
  description: 'issue',
  args: {
    uuid: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Uuid',
    },
  },
  fields: {
    ...IssueOutputArgs,
    messages: {
      args: paginationInput,
      type: new GraphQLList(MessageType),
      async resolve({ uuid }, args, { user }) {
        console.log({ args });
        return db.getMessages(uuid, args.lastItem, args.limit);
      }
    },
    author: {
      type: UserType,
      async resolve(root, args, context) {
        return db.getUserByUuid(root.customerUuid);
      }
    }
  }
});