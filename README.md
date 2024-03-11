# Transpiled GraphQL Server

## Overview

This project implements a GraphQL server using Apollo Server, designed for both AWS Lambda deployments and standalone operation. It serves as the backend for managing articles, videos, and author data, utilizing MongoDB for storage.

## Getting Started

### Prerequisites

- Node.js (v12.x or later)
- Yarn package manager
- MongoDB account and database setup
- AWS account (for Lambda deployment)

### Installation

1. Clone the repository to your local machine.
2. Install the necessary Node.js packages:
   ```sh
   yarn install
   ```
3. Create a `.env` file in the root directory with the following environment variables set according to your MongoDB setup:
   ```
   DB_USER=<your-db-user>
   DB_PASSWORD=<your-db-password>
   DB_NAME=<your-db-name>
   DB_HOST=<your-db-host>
   ```

### Running the Server Locally

To run the server in development mode:

```sh
yarn dev
```

This will start the GraphQL server on `http://localhost:4000` by default, where you can access the GraphQL playground to execute queries.

### Deployment

The project is configured for deployment to AWS Lambda using the Serverless framework.

1. Deploy to AWS Lambda:

   ```sh
   yarn deploy
   ```

2. To run the serverless offline for local emulation of AWS Lambda:
   ```sh
   yarn start
   ```

## Schema

This GraphQL server defines a schema that includes types for `Article`, `Video`, and `Author`, along with the necessary queries and mutations to interact with this data.

### Main Types

- `Article`: Represents an article with fields like title, author, createdAt, etc.
- `Video`: Represents a video with fields similar to an article but includes a videoURL.
- `Author`: Represents an author with a name, articles, videos, and an imageURL.

### Queries

- `articles`: Fetches articles based on status.
- `videos`: Fetches all videos.
- `topLikedArticles`: Fetches the top 3 liked articles.
- `getArticleById`: Fetches an article by its ID.
- `getVideoById`: Fetches a video by its ID.
- `authors`: Fetches all authors.

### Mutations

- `createArticle`: Creates a new article with given details.

## Development Notes

- The server can be configured to run as a standalone server for development or deployed to AWS Lambda for production.
- MongoDB is used for data storage, and the `db.js` file contains utility functions for connecting to MongoDB and validating environment variables.

## License

This project is licensed under the MIT License.
