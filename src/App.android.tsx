import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { TMDBImageQualityProvider, ThemeContextProvider } from '@providers';

import RouteSuspenseWrapper from './components/common/route-suspense-wrapper/RouteSuspenseWrapper';
import AndroidNavigationBar from './components/utils/AndroidNavigationBar.android';
import Navigation from './routes/Navigation';
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
