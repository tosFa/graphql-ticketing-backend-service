import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createSubscriptionManager } from '../helpers/pubsub';
import schema from '../schema';


export default () => {
  // WebSocket server for subscriptions
  const websocketServer = createServer((request, response) => {
    response.writeHead(404);
    response.end();
  });

  websocketServer.listen(9000, () => console.log( // eslint-disable-line no-console
    `Websocket Server is now running on http://localhost:9000`
  ));

// eslint-disable-next-line
  const subscriptionServer = new SubscriptionServer(
    {
      subscriptionManager: createSubscriptionManager(schema),
      // the onSubscribe function is called for every new subscription
      // and we use it to set the GraphQL context for this subscription
      onConnect: (connectionParams) => {
        console.log('onConnect: ', connectionParams);
        return Object.assign({}, connectionParams);
      },
      onConnect: () => console.log('onConnect'),
      onReconnect: () => console.log('onReconnect'),
      onDisconnect: () => console.log('onDisconnect'),
    },
    {
      server: websocketServer,
      path: '/'
    }
  );

  return { websocketServer, subscriptionServer };
};
