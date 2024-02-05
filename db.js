// db.js
import { MongoClient } from 'mongodb';
import fs from 'fs';
import dotenv from 'dotenv';

// Manually load .env file if it exists
const envPath = './.env';
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else if (process.env.NODE_ENV !== 'production') {
  console.error('Error: .env file is missing.');
  process.exit(1);
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri || !dbName) {
  console.error(
    'Error: MONGODB_URI and DB_NAME environment variables must be set.'
  );
  process.exit(1);
}

const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    process.exit(1);
  }
}

export default connectToMongoDB;
