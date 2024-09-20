import * as ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";

// Create new apollo client
// this is similar to creating context
const client = new ApolloClient({
  // for client side apps, to setup env variables
  // we need to use .env (for dev) .env.production file (for prod)
  // for VITE apps, we need to prefix them VITE_, for react prefix with REACT_APP_
  // as opposed to node, no need to use dotenv package
  // IMP - these env variables are injected at the build time of the app and not at runtime as opposed to in nodejs
  // so this data would be available in the browser, only store config vars liek urls, don't store any secrets
  uri: import.meta.env.VITE_GRAPHQL_URL,
  cache: new InMemoryCache(), // Apollo Client uses this to cache query results after fetching them
});

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
