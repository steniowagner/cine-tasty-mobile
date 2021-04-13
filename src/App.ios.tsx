import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { SERVER_URL } from '@env';

import { TMDBImageQualityProvider, ThemeContextProvider } from '@providers';

import RouteSuspenseWrapper from './components/common/RouteSuspenseWrapper';
import Navigation from './routes/Routes';
import makeClient from './graphql/client';

console.log(SERVER_URL);

const client = makeClient();

const App = () => (
  <ThemeContextProvider>
    <TMDBImageQualityProvider>
      <>
        <ApolloProvider
          client={client}
        >
          <RouteSuspenseWrapper>
            <Navigation />
          </RouteSuspenseWrapper>
        </ApolloProvider>
      </>
    </TMDBImageQualityProvider>
  </ThemeContextProvider>
);

export default App;
