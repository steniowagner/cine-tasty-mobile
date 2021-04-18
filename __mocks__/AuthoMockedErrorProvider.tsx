import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, Observable } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { GraphQLError } from 'graphql';

type MockedErrorProviderProps = {
  errors: Readonly<GraphQLError[]>;
  children: JSX.Element;
};

const MockedErrorProvider = ({ errors, children }: MockedErrorProviderProps) => {
  const link = new ApolloLink(
    () => new Observable((observer) => {
      observer.next({
        errors,
      });
      observer.complete();
    }),
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });

  return (
    <ApolloProvider
      client={client}
    >
      {children}
    </ApolloProvider>
  );
};

export default MockedErrorProvider;
