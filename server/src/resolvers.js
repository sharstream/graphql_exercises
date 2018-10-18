import { allBooks } from './book';

const resolvers = {
  Query: {
    books: () => {
      return allBooks();
    },
  }
};

export default resolvers;