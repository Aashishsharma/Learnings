import { books, authors, reviews } from './db.js';
import { dateScalar } from './custom-scalars.js';

// need to register all custom scalar types in the resolvers

export const resolvers = {
  Date: dateScalar, // STEP 3 - register custom scalar type in resolvers
  // note - for all the properties in graph's entry point type Query
  // the resolver function needs to be inside the Query object (see below)
  // and for all nested / related queries, their resolvers must be outside of this Query object
  Query: {
    books: () => books,
    authors: () => authors,
    // resolver to return a single book
    // 1st arg is parent (see author resolver for more)
    // 2nd arg is args - which has the arguments passed by client
    // 3rd arg is context - to explore
    book: (_, args) => {
      return books.find((book) => book.id === args.id);
    },
    // get single author by name
    author: (_, args) => {
      return authors.find((author) => author.name === args.name);
    },
  },

  // resolvers for nested data
  // below gql means
  // from authors object, where authorname = name, fectch all the books
  Author: {
    // get all books for given author
    // here parent represents any args paased into Parent gql i.e in Author
    books: (parent) => {
      return books.filter((book) => book.author === parent.name);
    },

    book: (parent, args) => {
      let book = books.filter((book) => book.author == parent.name && book.id == args.id);
      console.log({ book });
      // big problem, below I returned book instead of book[0]
      // even though the filter returned 1 element, it is still an array
      // and gql complains that you are returning a book arr instead of a book
      // beacuse in the Author schema, we have book(id: Int!) => book, it returns book and not [book]
      return book[0];
    },
    // client gql query for above resolver -
    /*
    query getAllBooksbyAuthor($name: String!, $id: Int!) {
      author(name: $name) {
        name,
          book(id: $id) {
            title
          }
      }
    }
    */
    // notice in above query we are calling book inside author property
    // hence this resolver is inside Author and not inside Query property
    // all resolvers under Query are root resolver
  },
  // similarly
  // for double nesting
  // find an author with given name, find only one book, and find all review within the given book
  // this means, Author should have nested field - book and book should have nested field review
  // we already have resolver for author -> book, new we need to build book -> review resolver
  // similar to author, create a new object for resolver Book, and inside that return the reviews

  // client query
  /*
    query getAllBooksbyAuthor($name: String!, $id: Int!) {
        author(name: $name) {
            name,
            book(id: $id) {
              title,
              reviews {
                review
              }
            }
        } 
    }
  */
  Book: {
    reviews: (parent, args) => {
      let data = reviews.filter((item) => item.bookId === parent.id);
      console.log({ data });
      return data;
    },
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
// always look at the below query object to understand what all is exposed by the schema
/*
type Query {
}
*/

// Summary for nested queries
// for any complex nested query from client
// the root object of that query, the resolver function needs to be present in the Query object
// now if there is a nested object within the root object
// e.g. a book inside the author
// a new propert needs to be created besides the Query object inside resolver object
// hence we have Author besides Query
// in author write respective resolvers
