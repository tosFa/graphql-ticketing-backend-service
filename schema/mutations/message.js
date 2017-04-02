import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
import uuid from 'node-uuid';
import { api, db } from '../../helpers';
import { pubsub } from '../../helpers/pubsub';
import { Message, MessageInputArgs } from '../types/index';

export default {
  description: 'create a new issue',
  args: MessageInputArgs,
  type: Message,
  async resolve(root, args, { user: { uuid: userUuid } }) {
    const message = { uuid: uuid.v4(), ...args, userUuid };
    const event = {
      group: `ISSUE_${args.issueUuid}`,
      type: 'NEW_MESSAGE',
      timestamp: new Date,
      payload: JSON.stringify({ message }),
    };

    try {
      db.messages.push(message);
      await pubsub.publish('event', event);
    } catch(e) {
      console.error('RTM data error: ');
      console.error(e);
    }
    return { ...message };
  }
};
