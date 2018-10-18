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
  imageURL: String!
  rating: Float
}
`;

export default typeDefs;