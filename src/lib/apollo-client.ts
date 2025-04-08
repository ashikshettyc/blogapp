// ./ApolloClient
import { HttpLink } from "@apollo/client";
import {  ApolloClient, InMemoryCache, } from "@apollo/experimental-nextjs-app-support";


// export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
//   return new ApolloClient({
//     cache: new InMemoryCache({ addTypename: false }),
//     link: new HttpLink({
//       uri: process.env.NEXT_PUBLIC_BASE_GQL_URL,
//     }),
//   });
// });



export const {query, mutate} = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_BASE_GQL_URL,
    fetchOptions: { cache: "no-store",  }, 
  }),
  cache: new InMemoryCache({ addTypename: false }),
  defaultOptions: {
    query: { fetchPolicy: "no-cache" },  mutate: {
      errorPolicy: 'all', // Return both data and errors if any
    },
  },
})