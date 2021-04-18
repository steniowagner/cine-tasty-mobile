/* eslint-disable no-underscore-dangle */

import React from 'react';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema, IMocks } from 'graphql-tools';
import { printSchema, buildClientSchema } from 'graphql/utilities';

import introspectionQueryResultData from '../fragmentTypes.json';
import introspectionResult from '../schema.json';

type AutoMockedProviderProps = {
  mockResolvers?: IMocks;
  children: JSX.Element;
};

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const AutoMockedProvider = ({ children, mockResolvers }: AutoMockedProviderProps) => {
  const schemaSDL = printSchema(
    buildClientSchema({ __schema: introspectionResult.__schema as any }),
  );

  const schema = makeExecutableSchema({
    typeDefs: schemaSDL,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  });

  addMockFunctionsToSchema({ schema, mocks: mockResolvers });

  const client = new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher }),
    link: new SchemaLink({ schema }),
  });

  return (
    <ApolloProvider
      client={client}
    >
      {children}
    </ApolloProvider>
  );
};

export default AutoMockedProvider;
