// resolvers.js
import connectToMongoDB from './db.js';
import { ObjectId } from 'mongodb';

const resolvers = {
  Query: {
    articles: async (_, args) => {
      const db = await connectToMongoDB();
      // Build your query based on provided arguments
      let query = {};
      if (args.status) {
        query.status = args.status;
      }
      return await db.collection('articles').find(query).toArray();
    },
    topLikedArticles: async () => {
      const db = await connectToMongoDB();

      return await db
        .collection('articles')
        .find({})
        .sort({ likes: -1 })
        .limit(3)
        .toArray();
    },
    getArticleById: async (_, { _id }) => {
      const db = await connectToMongoDB();
      return await db
        .collection('articles')
        .findOne({ _id: new ObjectId(_id) });
    },
    authors: async () => {
      const db = await connectToMongoDB();
      return await db.collection('authors').find().toArray();
    },
  },
  Article: {
    author: async (parent) => {
      const db = await connectToMongoDB();
      return await db
        .collection('authors')
        .findOne({ _id: new ObjectId(parent.author) });
    },
  },
  Author: {
    articles: async (parent) => {
      const db = await connectToMongoDB();
      return await db
        .collection('articles')
        .find({ author: new ObjectId(parent._id) })
        .toArray();
    },
  },
  Mutation: {
    createArticle: async (_, articleData) => {
      // Connect to MongoDB
      const db = await connectToMongoDB();

      // Add createdAt and lastUpdatedAt fields
      articleData.createdAt = new Date().toISOString();
      articleData.lastUpdatedAt = new Date().toISOString();

      // Convert author to ObjectId
      articleData.author = new ObjectId(articleData.author);

      // Insert the article
      const insertedArticle = await db
        .collection('articles')
        .insertOne(articleData);
      return await db
        .collection('articles')
        .findOne({ _id: new ObjectId(insertedArticle.insertedId) });
    },
  },
};

export default resolvers;
