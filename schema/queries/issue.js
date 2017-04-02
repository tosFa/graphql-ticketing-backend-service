import { GraphQLList, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLID, GraphQLError } from 'graphql';
import { Issue as IssueType } from '../types/index';
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
export const issues = {
  description: 'gets a list of issues',
  args: paginationInput,
  type: new GraphQLList(IssueType),
  async resolve(root, args, { user }) {
    if (!user) {
      throw new GraphQLError('Not Authorized', null, null, null, 'authorization');
    }

    return db.getIssues(user);
  },
};

export const issue = {
  description: 'gets a list of issues',
  args: {
    uuid: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'uuid',
    },
    ...paginationInput,
  },
  type: IssueType,
  async resolve(root, { uuid }, { user }) {
    if (!user) {
      throw new GraphQLError('Not Authorized', null, null, null, 'authorization');
    }
    return db.getIssue(user, uuid);
  },
};