const typeDefs = `
schema {
  # graphql query
  query: Query
  # graphql server
  mutation: Mutation
}

# root query for our **Hackbook Server**
type Query {
  # books order by rating
  books(orderBy: BooksOrderBy = RATING_DESC): [Book]
  # reviews order by id
  reviews(orderBy: ReviewOrderBy = ID_DESC): [Review]
  # list fo users
  users: [User]
  # a book
  book(id: ID!): Book
  # search a book
  searchBook(query: String!): [SearchBookResult]
  # search globally by a book or review or author or user or all
  search(query: String!): [SearchResult]
}

# union to perform FTS global search in graphQL
union SearchResult = Book | Review | Author | User

# search to find books
type SearchBookResult {
  # search book result unique id
  id: ID!
  # search book result title
  title: String
  # search book result description
  description: String
  # search boo result retrieve authors array
  authors: [String]
  # search book result image url
  imageUrl(size: ImageSize = LARGE): String
}

# mutation to create a Book or add a Review
type Mutation {
  # add a new review
  createReview(reviewInput: ReviewInput!): Review
  # add a new book
  createBook(googleBookId: ID!): Book
}

# create a review
input ReviewInput {
  # book review input unique id
  bookId: ID!
  # review input rating
  rating: Int!
  # review input name
  name: String!
  # review input email
  email: String!
  # review input title
  title: String
  # review ionput comment
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
  # book unique id
  id: ID!
  # book title
  title: String!
  # book description
  description: String!
  # book image url
  imageUrl(size: ImageSize = LARGE): String!
  # book rating
  rating: Float
  # book subtitle
  subtitle: String
  # book rating count
  ratingCount: Int
  # list of authors by book
  authors: [Author]
  # list of reviews by book
  reviews: [Review]
}

# author fields
type Author {
  # author unique id
  id: ID!
  # author name
  name: String! @deprecated(reason: "Use \`firstName & lastName\`.")
  # author first name
  firstName: String
  # author last name
  lastName: String
}

# review fields
type Review {
  # review unique id
  id: ID!
  # review rating
  rating: Int
  # review title
  title: String
  # review comment
  comment: String
  # a reviewer book
  book: Book
  # a reviewer user
  user: User
}

# user fields
type User {
  # user unique id
  id: ID!
  # user name
  name: String!
  # user image url
  imageUrl(size: Int = 50): String
}

# image size
enum ImageSize {
  SMALL
  LARGE
}
`;

export default typeDefs;