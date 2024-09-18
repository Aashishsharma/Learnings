// this file specifies the datatype for gql

// Primitive scalar types in gql
// (Int | Float | String | Boolean | ID)

export const typeDefs = `#graphql
  # STEP 1 - declare custom scalar type 
  scalar Date
  type Book {
    title: String!,
    price: Int!,
    author: String!,
    publishedOn: Date! # use custom scalar type
  } 

  type Author {
    name: String!,
    books: [Book!]
  }

  # Each graphql schema must must define the query type
  # e.g. if we don't define author in the Query type, the gql client 
  # won't be able to query on the author
  type Query {
    books: [Book!],
    authors: [Author!]
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
