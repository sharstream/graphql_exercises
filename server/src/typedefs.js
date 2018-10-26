const typeDefs = `
schema {
  query: Query
  mutation: Mutation
}

type Query {
  books(orderBy: BooksOrderBy = RATING_DESC): [Book]
  reviews(orderBy: ReviewOrderBy = ID_DESC): [Review]
  users: [User]
  book(id: ID!): Book
  searchBook(query: String!): [SearchBookResult]
}

type SearchBookResult {
  id: ID!
  title: String
  description: String
  authors: [String]
  imageUrl(size: ImageSize = LARGE): String
}

type Mutation {
  createReview(reviewInput: ReviewInput!): Review
}

input ReviewInput {
  bookId: ID!
  rating: Int!
  name: String!
  email: String!
  title: String
  comment: String
}

enum ReviewOrderBy {
  ID_ASC
  ID_DESC
}

enum BooksOrderBy {
  RATING_DESC
  ID_DESC
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
  rating: Int
  title: String
  comment: String
  book: Book
  user: User
}

type User {
  id: ID!
  name: String!
  imageUrl(size: Int = 50): String
}

enum ImageSize {
  SMALL
  LARGE
}
`;

export default typeDefs;