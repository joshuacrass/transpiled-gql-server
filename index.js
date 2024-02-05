import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { MongoClient, ObjectId } from 'mongodb';

import 'dotenv/config';

// MongoDB connection string and database name from environment variables
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

// Create a new MongoClient
const client = new MongoClient(uri);

// Function to connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    return client.db(dbName);
  } catch (error) {
    console.error('Could not connect to MongoDB Atlas', error);
    process.exit(1);
  }
}

// GraphQL type definitions
const typeDefs = `#graphql
  type Article {
    _id: ID!
    title: String
    author: Author
    createdAt: String
    lastUpdatedAt: String
    imageURL: String
    version: Int
    summary: String
    status: String
    views: Int
    likes: Int
    contentBlocks: [ContentBlock]
  }

  type Author {
    _id: ID!
    name: String
    articles: [Article]
  }

  type Query {
    articles: [Article]
    authors: [Author]
  }

  type ContentBlock {
  id: Int!
  type: String!
  data: String!
  language: String
}
`;

// Resolvers for GraphQL operations
const resolvers = {
  Query: {
    articles: async () => {
      const db = await connectToMongoDB();
      const articles = await db.collection('articles').find().toArray();
      return articles;
    },
    authors: async () => {
      const db = await connectToMongoDB();
      return await db.collection('authors').find().toArray();
    },
  },
  Article: {
    author: async (parent) => {
      const db = await connectToMongoDB();
      const author = await db
        .collection('authors')
        .findOne({ _id: new ObjectId(parent.author) });
      return author;
    },
  },
  Author: {
    articles: async (parent, args, context) => {
      const db = await connectToMongoDB();
      const articles = await db
        .collection('articles')
        .find({ author: new ObjectId(parent._id) })
        .toArray();
      return articles;
    },
  },
};

// Create and configure Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Function to start the Apollo Server
async function startApolloServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at: ${url}`);
}

// Start the server
startApolloServer();
