// src/apolloClient.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL, // URL del servidor GraphQL
  cache: new InMemoryCache(),
});

export default client;
