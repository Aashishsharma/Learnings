// this file specifies the datatype for gql

// Primitive scalar types in gql
// (Int | Float | String | Boolean | ID)

export const typeDefs = `#graphql
  # STEP 1 - declare custom scalar type 
  scalar Date
  type Book {
    id: Int,
    title: String!,
    price: Int!,
    author: String!,
    publishedOn: Date!, # use custom scalar type
    reviews: [Review!]
  } 

  type Author {
    id: Int,
    name: String!,
    books: [Book!],
    book(id: Int!): Book!
  }

  type Review {
    id: Int,
    review: String,
    bookId: Int
  }

  # Each graphql schema must must define the query type
  # e.g. if we don't define author in the Query type, the gql client 
  # won't be able to query on the author
  type Query {
    books: [Book!], # the name books need to match with the resolver function
    # and this is also the name the gql client will use in it's query
    authors: [Author!]
    # to get a single book by Id, expose another property
    book(id: Int): Book # it will take id as input and return a single book
    # we need to write a resolver function for this query
    # schema to get author by name
    author(name: String): Author
  
  }
  # for each of the qyery property we defined in type Query
  # we need to write the resolver function (in this case for books and authors)
`;

// other scalar types
// UNIONS
// `union SearchResult = Human | Droid | Starship`;
// interface

// interface Character {
//   id: ID!
//   name: String!
//   friends: [Character]
//   appearsIn: [Episode]!
// }

// using the interface - type Human implements Character
