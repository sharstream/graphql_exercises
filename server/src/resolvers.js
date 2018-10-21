import { allBooks, imageUrl, findBookById } from './book';
// import { auhtorsByBookId } from './author';
import { allReviews } from './review';
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
    }
  },
  Query: {
    books: () => {
      return allBooks();
    },
    reviews: () => allReviews(),
  }
};

export default resolvers;