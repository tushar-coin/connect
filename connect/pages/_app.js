import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "@/styles/global.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Your GraphQL API endpoint
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  const title = "connect";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
