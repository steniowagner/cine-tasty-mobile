import React from 'react';
import { gql } from '@apollo/client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

type RenderHookWrapperProps = { children: React.ReactNode };

export const RenderHookWrapper = (props: RenderHookWrapperProps) => (
  <ApolloProvider
    client={
      new ApolloClient({
        cache: new InMemoryCache(),
      })
    }>
    {props.children}
  </ApolloProvider>
);

export const testQuery = gql`
  query TestQuery {
    testQuery {
      someField
    }
  }
`;
