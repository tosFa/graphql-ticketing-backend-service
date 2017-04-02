import { GraphQLObjectType } from 'graphql';
import { token } from './tokens';
import { issue, deleteIssue } from './issue';
import message from './message';

export default new GraphQLObjectType({
  name: 'mutations',
  description: 'mutation',
  fields: {
    token,
    issue,
    deleteIssue,
    message,
  }
});