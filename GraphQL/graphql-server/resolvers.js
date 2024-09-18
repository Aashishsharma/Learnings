import { books, authors, reviews } from './db.js';
import { dateScalar } from './custom-scalars.js';

// need to register all custom scalar types in the resolvers

export const resolvers = {
  Date: dateScalar, // STEP 3 - register custom scalar type in resolvers
  // note - all the root resolvers need to be under Query object
  // and for all nested / related queries, their resolvers must be outside of this Query object
  // basically everything mentioned inside type Query in schema needs be inside Query
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
      let author = authors.find((author) => author.name === args.name);
      console.log('LOG NO - 1');
      return author;
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

    // fectch one book with gove id for given author
    book: (parent, args) => {
      let book = books.filter((book) => book.author == parent.name && book.id == args.id);
      // big problem, below I returned book instead of book[0]
      // even though the filter returned 1 element, it is still an array
      // and gql complains that you are returning a book arr instead of a book
      // beacuse in the Author schema, we have book(id: Int!) => book, it returns book and not [book]
      console.log('LOG NO - 2');
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

  Book: {
    reviews: (parent, args) => {
      let data = reviews.filter((item) => item.bookId === parent.id);
      console.log('LOG NO - 3 ');
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
// we need to do resolver chaining

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
//gql flow for above query
/**
 * author(name: $name)
 * gql will look into root Query schema
 * property author() with parameter exists
 * gql goes to root resolver and find resolver with name author under root resolver
 * all root resolvers are always under Query resolver
 * from this function author name is fetched
 *
 * book(id: $id)
 * now this book is not a root object, it is under author
 * so author needs to be a separate resolver just like the root resolver
 * hence we have Author: {} besides Query: {} in the resolvers
 * now inside author resolver, gql will search for book() resolver
 * this resolver will have book(parent, args) - parent is whatever data returned by its previous resolver
 * in this case the author function from root resolver
 *
 * book(id: $id) {title, reviews}
 * from this second resolver gql fetches title and reviews
 * now reviews is not a not a root object, it is under book
 * so book also needs to be separte resolver just like author and root resolver
 * hence we have Book: {} besides Author: {} and Query {} in the resolvers
 * now inside Book, gql will serach for reviews resolver
 * reviews(parent, args) - here parent would be whatever data was returned by its previoud resolver
 * in this case book function from Author resolver
 */
