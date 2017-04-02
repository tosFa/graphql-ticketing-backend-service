import { GraphQLObjectType } from 'graphql';
import { issues, issue } from './issue';
import { messages, message } from './message';
import { admin, admins } from './admin';
import { signIn } from './admin';

export default new GraphQLObjectType({
  name: 'query',
  description: 'query',
  fields: {
    issues,
    issue,
    messages,
    message,
    admin,
    admins,
  }
});