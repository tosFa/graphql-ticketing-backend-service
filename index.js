import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import startWebsocketServer from './ws';

import { graphqlMiddleware, graphiqlMiddleware } from './middlewares';

const port = 8888;

// import * as loaders from './loaders';

const app = express();

var whitelist = [
  'http://localhost:3000',
];
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
};
app.use('*', cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/graphql', graphqlMiddleware);
app.use('/graphiql', graphiqlMiddleware);

app.listen(port);
console.log(`The GraphQL Server is running on http://localhost:${port}`);

startWebsocketServer();
