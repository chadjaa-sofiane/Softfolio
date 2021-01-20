import React from "react";
import App from "./App";
import { ApolloClient, ApolloProvider, ApolloLink } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { cache } from "./cache";

const httpLink = createUploadLink({
  uri: "https://soft-folio.herokuapp.com/graphql",
});

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `bearer ${localStorage.getItem("token") || null}`,
    },
  });
  return forward(operation);
});
const link = middlewareLink.concat(httpLink);
const client = new ApolloClient({
  link,
  cache,
});


export default(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
