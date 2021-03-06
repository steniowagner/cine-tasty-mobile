import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { TMDBImageQualityProvider, ThemeContextProvider } from 'providers';

import RouteSuspenseWrapper from './components/common/RouteSuspenseWrapper';
import Navigation from './routes/Routes';
import makeClient from './config/client';

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
