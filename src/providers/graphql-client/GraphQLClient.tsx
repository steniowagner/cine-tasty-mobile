import React, { useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
} from '@apollo/client';

type GraphQLClientProps = {
  children: React.ReactNode;
};

export const GraphQLClient = (props: GraphQLClientProps) => {
  const client = useMemo(() => {
    const httpLink = new HttpLink({
      uri: process.env.SERVER_URL,
    });
    return new ApolloClient({
      link: ApolloLink.from([httpLink]),
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
