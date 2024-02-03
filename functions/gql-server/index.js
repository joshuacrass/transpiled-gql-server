const { ApolloServer, gql } = require('apollo-server-lambda');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your schema
const typeDefs = gql`
  type Article {
    id: ID!
    title: String!
    content: String!
  }

  type Query {
    articles: [Article]
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    articles: async () => {
      // Assuming you have an Article model
      return await Article.find({});
    },
  },
};

// Create and start the server
const server = new ApolloServer({ typeDefs, resolvers });
exports.handler = server.createHandler();
