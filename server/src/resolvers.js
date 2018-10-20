import { allBooks, imageUrl } from './book';

const resolvers = {
  Book: {
    imageUrl: (book, { size }) => imageUrl(size, book.googleId),
    // ratingCount: book => book.rating_count
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