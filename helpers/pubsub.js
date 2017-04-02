import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
// import { RedisPubSub } from 'graphql-redis-subscriptions';

// const pubsub = new RedisPubSub();

const pubsub = new PubSub();
const createSubscriptionManager = (schema) => new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {
    channelEvent: (options, args) => ({
      channelEvent: {
        filter: (event) => event.group === args.group && args.types.indexOf(event.type) >= 0,
      },
    }),
  },
});

export { createSubscriptionManager, pubsub };