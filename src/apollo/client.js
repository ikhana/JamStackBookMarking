import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

  export const client = new ApolloClient({
    uri: 'http://localhost:8888/.netlify/functions/apollo-graphql',
    cache: new InMemoryCache()
  });