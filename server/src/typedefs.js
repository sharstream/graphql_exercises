const typeDefs = `
schema {
  query: Query
}

type Query {
  books: [Book]
}

type Book {
  id: ID!
  title: String!
  description: String!
  imageUrl(size: ImageSize = LARGE): String!
  rating: Float
  subtitle: String
  ratingCount: Int
  authors: [Author]
  reviews: [Review]
}

type Author {
  id: ID!
  name: String!
}

type Review {
  id: ID!
  title: String
}

enum ImageSize {
  SMALL
  LARGE
}
`;

export default typeDefs;