import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

  export const client = new ApolloClient({
    uri: 'https://jsbookmarkig.netlify.app/.netlify/functions/apollo-graphql',
    cache: new InMemoryCache()
  });