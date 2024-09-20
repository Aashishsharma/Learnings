import "./App.css";
import { useQuery, gql } from "@apollo/client";

// React component which makes gql API call using useQuery hook
function DisplayBooks() {
  // useQuery needs 1 arg, the gqlQuery
  // this hooks is pretty much similar to useQuery from tanstack
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.books.map(({ id, title, author }) => (
    <div key={id}>
      <h3>{title}</h3>
      <b>About this Author:</b> {author}
      <hr></hr>
    </div>
  ));
}

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;
function App() {
  return (
    <>
      Books Data
      <DisplayBooks />
    </>
  );
}

export default App;
