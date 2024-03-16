/* eslint-disable no-underscore-dangle */
// resolvers.js
import { ObjectId } from 'mongodb';
import connectToMongoDB from './db.js';

const resolvers = {
  Query: {
    articles: async (_, args) => {
      const db = await connectToMongoDB();
      const query = {};
      if (args.status) {
        query.status = args.status;
      }
      return db.collection('articles').find(query).toArray();
    },
    videos: async () => {
      const db = await connectToMongoDB();
      return db.collection('videos').find({}).toArray();
    },
    topLikedArticles: async () => {
      const db = await connectToMongoDB();

      return db
        .collection('articles')
        .find({})
        .sort({ likes: -1 })
        .limit(3)
        .toArray();
    },
    getArticleById: async (_, { _id }) => {
      const db = await connectToMongoDB();
      return db.collection('articles').findOne({ _id: new ObjectId(_id) });
    },
    getVideoById: async (_, { _id }) => {
      const db = await connectToMongoDB();
      return db.collection('videos').findOne({ _id: new ObjectId(_id) });
    },
    authors: async () => {
      const db = await connectToMongoDB();
      return db.collection('authors').find().toArray();
    },
  },
  Article: {
    author: async (parent) => {
      const db = await connectToMongoDB();
      return db
        .collection('authors')
        .findOne({ _id: new ObjectId(parent.author) });
    },
  },
  Video: {
    author: async (parent) => {
      const db = await connectToMongoDB();
      return db
        .collection('authors')
        .findOne({ _id: new ObjectId(parent.author) });
    },
  },
  Author: {
    articles: async (parent) => {
      const db = await connectToMongoDB();
      return db
        .collection('articles')
        .find({ author: new ObjectId(parent._id) })
        .toArray();
    },
  },
  Mutation: {
    createArticle: async (_, articleData) => {
      const data = articleData;
      // Connect to MongoDB
      const db = await connectToMongoDB();

      // Add createdAt and lastUpdatedAt fields
      data.createdAt = new Date().toISOString();
      data.lastUpdatedAt = new Date().toISOString();

      // Convert author to ObjectId
      data.author = new ObjectId(data.author);

      // Insert the article
      const insertedArticle = db.collection('articles').insertOne(data);
      return db
        .collection('articles')
        .findOne({ _id: new ObjectId(insertedArticle.insertedId) });
    },
  },
};

export default resolvers;
