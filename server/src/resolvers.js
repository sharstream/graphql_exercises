import { allBooks, imageUrl, findBookById } from './book';
// import { auhtorsByBookId } from './author';
import { allReviews } from './review';
import { allUsers } from './user';
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
  Review: {
    book: (review, args, context) => {
      const { loaders } = context;
      const { findBooksByIdsLoader } = loaders;
      return findBooksByIdsLoader.load(review.bookId);
      // findBookById(review.bookId)
    },
    user: (review, args, context) => {
      const { loaders } = context;
      const { findUsersByIdsLoader } = loaders;
      return findUsersByIdsLoader.load(review.userId)
    },
  },
  Query: {
    books: (root, args) => {
      return allBooks(args);
    },
    reviews: (root, args) => allReviews(args),
    users: () => allUsers(),
    book: (root, args, context) => {
      const { loaders } = context;
      const { findBooksByIdsLoader } = loaders;
      return findBooksByIdsLoader.load(args.id);
    },
  }
};

export default resolvers;