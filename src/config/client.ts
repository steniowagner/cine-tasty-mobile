import { InMemoryCache } from 'apollo-cache-inmemory';
import { SERVER_URL } from 'react-native-dotenv';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, path }) => console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`));
  }

  if (networkError) {
    console.log(
      `[Network error ${operation.operationName}]: ${networkError.message} - ${networkError}`,
    );
  }
});

const makeClient = () => {
  const cache = new InMemoryCache();

  const httpLink = new HttpLink({
    uri: SERVER_URL,
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache,
  });

  return client;
};

export default makeClient;
