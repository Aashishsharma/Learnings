import "./App.css";
import { useMutation, useQuery } from "@apollo/client";
import { GET_BOOKS } from "./graphql/queries";
import { ADD_BOOK } from "./graphql/mutations";

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

const AddBooks = () => {
  const [addBook, { data, loading, error }] = useMutation(ADD_BOOK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const addBookHandler = () => {
    addBook({
      variables: {
        input: {
          author: "ABC",
          price: 200,
          title: "TEST",
        },
      },
    });
  };

  return (
    <div>
      <button onClick={addBookHandler}>AddBook</button>
      <p>Response from server - {data?.bookData}</p>
    </div>
  );
};

function App() {
  return (
    <>
      Books Data
      <DisplayBooks />
      <AddBooks />
    </>
  );
}

export default App;
