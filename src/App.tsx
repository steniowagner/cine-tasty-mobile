import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {
  TMDBImageQualityProvider,
  ThemeContextProvider,
  AlertMessageProvider,
} from '@providers';

import RouteSuspenseWrapper from './components/common/route-suspense-wrapper/RouteSuspenseWrapper';
import Navigation from './routes/Navigation';
import makeClient from './graphql/client';

const client = makeClient();

const App = () => (
  <ThemeContextProvider>
    <AlertMessageProvider>
      <TMDBImageQualityProvider>
        <>
          <ApolloProvider client={client}>
            <RouteSuspenseWrapper>
              <Navigation />
            </RouteSuspenseWrapper>
          </ApolloProvider>
        </>
      </TMDBImageQualityProvider>
    </AlertMessageProvider>
  </ThemeContextProvider>
);

export default App;
