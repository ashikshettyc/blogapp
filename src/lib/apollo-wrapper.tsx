'use client';

import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

function makeClient() {
  // HTTP Link for GraphQL requests
  // const httpLink = new HttpLink({
  //   uri: process.env.NEXT_PUBLIC_BASE_GQL_URL,
  //   //   uri: "/api/graphql",
  //   fetchOptions: {
  //     cache: 'no-store',
  //     //  mode: "cors"
  //   },
  //   credentials: 'include',
  // });

  const uploadLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_BASE_GQL_URL,
    headers: {
      'Apollo-Require-Preflight': 'true',
    },
    fetchOptions: {
      cache: 'no-store',
    },
  });

  // Create the Apollo Client
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: uploadLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
