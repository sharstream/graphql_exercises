import { allBooks } from './book';

const resolvers = {
  Book: {
    ratingCount: book => book.rating_count
    // title: book => {
    //   return `${book.title} (from resolvers)`;
    // }
  },
  Query: {
    books: () => {
      return allBooks();
    },
  }
};

export default resolvers;