import { allBooks, imageUrl } from './book';
import { auhtorsByBookId } from './author';
// import { reviewsByBookId } from './review';

const resolvers = {
  Book: {
    imageUrl: (book, { size }) => imageUrl(size, book.googleId),
    authors: (book, args, context) => {
      const { loaders } = context;
      const { findAuthorsByBookIdsLoader } = loaders;
      return findAuthorsByBookIdsLoader.load(book.id);
      // auhtorsByBookId(book.id)
    },
    // reviews: book => reviewsByBookId(book.id),
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