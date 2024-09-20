import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation ADD_BOOK($input: BookInput!) {
    bookData: addBook(input: $input)
  }
`;
