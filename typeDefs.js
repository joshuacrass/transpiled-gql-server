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
    tags: [String]
    language: String
  }

  type Video {
    _id: ID!
    title: String
    author: Author
    createdAt: String
    lastUpdatedAt: String
    imageURL: String
    videoURL: String
    version: Int
    summary: String
    status: String
    views: Int
    likes: Int
    tags: [String]
    language: String
  }

  type Author {
    _id: ID!
    name: String
    articles: [Article]
    videos: [Video]
    imageURL: String
  }

  type Query {
    articles(status: String): [Article]
    videos: [Video]
    getArticleById(_id: ID!): Article
    getVideoById(_id: ID!): Video
    topLikedArticles: [Article]
    authors: [Author]
  }

  type Mutation {
    createArticle(
      title: String!
      author: ID!
      imageURL: String!
      version: Int
      summary: String!
      status: String
      views: Int
      likes: Int
      contentBlocks: [ContentBlockInput]
      tags: [String]
      language: String
    ): Article

  }

  input ContentBlockInput {
   id: Int!
   type: String!
   data: String!
  language: String
  }


  type ContentBlock {
  id: Int!
  type: String!
  data: String!
  language: String
  }

`;

export default typeDefs;
