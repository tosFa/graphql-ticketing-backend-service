import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import uuid from 'node-uuid';
import { api, db } from '../../helpers';
import { pubsub } from '../../helpers/pubsub';
import { Issue, IssueInputArgs, BooleanType } from '../types/index';

export const issue = {
  description: 'create a new issue',
  args: IssueInputArgs,
  type: Issue,
  async resolve(root, args, { user }) {
    const issue = { uuid: uuid.v4(), ...args, customerUuid: user.uuid };
    const event = {
      group: 'ISSUES',
      type: 'NEW',
      timestamp: +new Date(),
      payload: JSON.stringify({ issue }),
    };

    try {
      db.issues.push(issue);
      await pubsub.publish('event', event);
    } catch(e) {
      console.error('RTM data error');
    }
    return { ...issue };
  }
};

export const deleteIssue = {
  description: 'deletes an issue',
  args: {
    uuid: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'uuid',
    },
  },
  type: BooleanType,
  async resolve(root, args, context) {
    const event = {
      group: 'ISSUES',
      type: 'DELETED',
      timestamp: new Date,
      payload: JSON.stringify({ uuid: args.uuid }),
    };

    try {
      db.issues = db.issues.filter(issue => issue.uuid !== args.uuid);
      db.messages = db.messages.filter(message => message.issueUuid !== args.uuid);
      await pubsub.publish('event', event);
    } catch(e) {
      console.error('RTM data error');
    }
    return { success: true };
  }
};