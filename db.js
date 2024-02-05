import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file if it exists

// Function to validate environment variables
function validateEnvVariables() {
  if (!process.env.MONGODB_URI || !process.env.DB_NAME) {
    throw new Error(
      'MONGODB_URI and DB_NAME environment variables are required'
    );
  }
}

// Create a new MongoClient
let client;

async function connectToMongoDB() {
  try {
    // Load environment variables and validate them
    validateEnvVariables();

    // Initialize MongoClient only if it has not been initialized yet
    if (!client) {
      client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      console.log('Connected to MongoDB');
    }
    return client.db(process.env.DB_NAME);
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    throw error; // Rethrow the error to handle it outside or to fail gracefully
  }
}

export default connectToMongoDB;
