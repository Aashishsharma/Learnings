import { books, authors } from './db.js';

export const typeDefs = `#graphql
  type Book {
    title: String!,
    price: Int!,
    author: String!
  } 

  type Author {
    name: String!,
    books: [Book!]
  }

  type Query {
    books: [Book!],
    authors: [Author!]
  }
`;

export const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
  },
};
