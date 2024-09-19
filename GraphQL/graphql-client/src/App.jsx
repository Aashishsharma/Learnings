import "./App.css";
import { useQuery, gql } from "@apollo/client";

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.books.map(({ id, title, author }) => (
    <div key={id}>
      <h3>{title}</h3>
      <br />
      <b>About this Author:</b>
      <p>{author}</p>
      <br />
    </div>
  ));
}

const GET_LOCATIONS = gql`
  query GetLocations {
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
      Vite app 123
      <DisplayLocations />
    </>
  );
}

export default App;
