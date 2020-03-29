/* eslint-disable no-underscore-dangle */

import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema, IMocks } from 'graphql-tools';
import { printSchema, buildClientSchema } from 'graphql/utilities';

import introspectionResult from '../../schema.json';

type Props = {
  mockResolvers?: IMocks;
  children: JSX.Element;
};

const AutoMockedProvider = ({ children, mockResolvers }: Props) => {
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
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
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
