/* eslint-disable import/prefer-default-export */
import { ApolloServer } from '@apollo/server';
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from '@as-integrations/aws-lambda';

import typeDefs from '../typeDefs.js';
import resolvers from '../resolvers.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);
