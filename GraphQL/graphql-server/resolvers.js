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

// VVIP - gql query execution flow
/*
e.g. client query
query ExampleQuery {
  books {
    title
  }
}
*/
// FLOW
// 1. client can write objects only if they are exposed as a property in the type Query object created in .schema file
// 2. gql goes the the resolver function
// 3. books keyword is matched with books function inside Query property in resolvers, and that resolver function is run
// 4. event though if the resolver returns all the fields of the object (e.g. book), gql will truncate and return only those fields that are asked by the client

// Although apollo server gives us the gql explorer by default to write client side queries
// always look at the query object to understand what all is exposed by the schema
/*
type Query {
}
*/
