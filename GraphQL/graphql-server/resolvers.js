import { books, authors } from './db.js';
import { dateScalar } from './custom-scalars.js';

// need to register all custom scalar types in the resolvers

export const resolvers = {
  Date: dateScalar, // STEP 3 - register custom scalar type in resolvers
  Query: {
    books: () => books,
    authors: () => authors,
  },
};
