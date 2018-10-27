const typeDefs = `
schema {
  query: Query
  mutation: Mutation
}

# root query for our **Hackbook Server**
type Query {
  books(orderBy: BooksOrderBy = RATING_DESC): [Book]
  reviews(orderBy: ReviewOrderBy = ID_DESC): [Review]
  users: [User]
  book(id: ID!): Book
  searchBook(query: String!): [SearchBookResult]
  search(query: String!): [SearchResult]
}

# union to perform FTS global search in graphQL
union SearchResult = Book | Review | Author | User

# search to find books
type SearchBookResult {
  id: ID!
  title: String
  description: String
  authors: [String]
  imageUrl(size: ImageSize = LARGE): String
}

# mutation to create a Book or add a Review
type Mutation {
  createReview(reviewInput: ReviewInput!): Review
  createBook(googleBookId: ID!): Book
}

# create a review
input ReviewInput {
  bookId: ID!
  rating: Int!
  name: String!
  email: String!
  title: String
  comment: String
}

# order DESC or ASC by a review criteria
enum ReviewOrderBy {
  ID_ASC
  ID_DESC
}

# order DESC or ASC by a book criteria
enum BooksOrderBy {
  RATING_DESC
  ID_DESC
}

# book fields
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

# author fields
type Author {
  id: ID!
  name: String!
}

# review fields
type Review {
  id: ID!
  rating: Int
  title: String
  comment: String
  book: Book
  user: User
}

# user fields
type User {
  id: ID!
  name: String!
  imageUrl(size: Int = 50): String
}

# image size
enum ImageSize {
  SMALL
  LARGE
}
`;

export default typeDefs;