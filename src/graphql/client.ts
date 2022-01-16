import {ApolloClient, InMemoryCache} from '@apollo/client';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {ApolloLink} from 'apollo-link';

import possibleTypes from '@graphql/possibleTypes.json';
import {SERVER_URL} from '@env';

const errorLink = onError(({graphQLErrors, networkError, operation}) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({message, path}) => {
      console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`);
    });
  }

  if (networkError) {
    console.log(
      `[Network error ${operation.operationName}]: ${networkError.message} - ${networkError}`,
    );
  }
});

const makeClient = () => {
  const cache = new InMemoryCache({
    dataIdFromObject: obj =>
      obj.id
        ? `${obj.__typename}-${obj.id}`
        : `${obj.__typename}-${obj.cursor}`,
    possibleTypes,
  });

  const httpLink = new HttpLink({
    uri: SERVER_URL,
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]) as any,
    cache,
  });

  return client;
};

export default makeClient;
