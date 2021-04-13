import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { TMDBImageQualityProvider, ThemeContextProvider } from '@providers';

import AndroidNavigationBar from './components/utils/AndroidNavigationBar.android';
import RouteSuspenseWrapper from './components/common/RouteSuspenseWrapper';
import Navigation from './routes/Routes';
import makeClient from './graphql/client';

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
        <AndroidNavigationBar />
      </>
    </TMDBImageQualityProvider>
  </ThemeContextProvider>
);

export default App;
