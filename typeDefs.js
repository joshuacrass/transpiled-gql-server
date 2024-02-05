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

export default typeDefs;
