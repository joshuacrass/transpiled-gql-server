import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

function validateEnvVariables() {
  if (!process.env.MONGODB_URI || !process.env.DB_NAME) {
    throw new Error(
      'MONGODB_URI and DB_NAME environment variables are required'
    );
  }
}

let client;

async function connectToMongoDB() {
  try {
    validateEnvVariables();

    if (!client) {
      client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      console.log('Connected to MongoDB');
    }
    return client.db(process.env.DB_NAME);
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    throw error;
  }
}

export default connectToMongoDB;
