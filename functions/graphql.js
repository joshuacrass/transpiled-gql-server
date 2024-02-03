// functions/graphql.js
const { ApolloServer, gql } = require('@apollo/server');

// Define your schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

// Create the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
