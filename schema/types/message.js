import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql';
import { UserType } from './admin';
import { db } from '../../helpers';

export const MessageInputArgs = {
  text: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'title'
  },
  issueUuid: {
    type: new GraphQLNonNull(GraphQLID),
    description: 'conversationUuid'
  },
};

export const MessageOutputArgs = {
  uuid: {
    type: new GraphQLNonNull(GraphQLID),
    description: 'Uuid',
  },
  ...MessageInputArgs,
  author: {
    type: UserType,
    async resolve(root) {
      console.log({ root });
      return db.getUserByUuid(root.userUuid);
    }
  }
};

export const Message = new GraphQLObjectType({
  name: 'message',
  description: 'message',
  fields: MessageOutputArgs
});