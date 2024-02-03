// functions/graphql.js
const { ApolloServer, gql } = require('apollo-server-lambda');

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Resolvers define the technique for fetching the types in the
// schema. We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

exports.handler = server.createHandler();
