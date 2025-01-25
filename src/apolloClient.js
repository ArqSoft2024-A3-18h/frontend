// src/apolloClient.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL, // URL de tu servidor GraphQL
  cache: new InMemoryCache(),
});

export default client;
