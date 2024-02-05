// resolvers.js
import connectToMongoDB from './db.js';
import { ObjectId } from 'mongodb';

const resolvers = {
  Query: {
    articles: async () => {
      const db = await connectToMongoDB();
      return await db.collection('articles').find().toArray();
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
};

export default resolvers;
