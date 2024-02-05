// netlify/functions/graphql.js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from '../typeDefs'; // Adjust the path as needed
import resolvers from '../resolvers'; // Adjust the path as needed

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = async (event, context) => {
  const { handler } = await startStandaloneServer(server, {
    context: ({ event, context }) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
    }),
    cors: {
      origin: '*', // Adjust according to your needs
      credentials: true,
    },
  });

  return handler(event, context);
};
