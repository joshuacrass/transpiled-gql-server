const { ApolloServer, gql } = require('apollo-server-lambda');
const mongoose = require('mongoose');
const Article = require('./models/articles');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Define your schema
const typeDefs = gql`
  type Article {
    id: ID!
    title: String
    content: String
  }

  type Query {
    articles: [Article]
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    articles: async () => await Article.find({}),
  },
};

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

exports.handler = server.createHandler();
