import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// Validates that all necessary environment variables are set
function validateEnvVariables() {
  const requiredVars = ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST'];
  const unsetVars = requiredVars.filter((varName) => !process.env[varName]);
  if (unsetVars.length > 0) {
    throw new Error(
      `Required ENV variables are missing: ${unsetVars.join(', ')}`
    );
  }
}

// Constructs the MongoDB URI from the environment variables
function constructMongoDBUri() {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
  return `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
}

let client;

// Connects to MongoDB using the constructed URI
async function connectToMongoDB() {
  validateEnvVariables();

  const uri = constructMongoDBUri();

  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
  }

  return client.db(process.env.DB_NAME);
}

export default connectToMongoDB;
