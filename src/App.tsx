import React from 'react';
import {ApolloProvider} from '@apollo/client';

import makeGraphQLClient from './graphql/client';
import Test from './Test';

const client = makeGraphQLClient();

const App = () => (
  <ApolloProvider client={client}>
    <Test />
  </ApolloProvider>
);

export default App;

/* import { TMDBImageQualityProvider, ThemeContextProvider } from '@providers';

import RouteSuspenseWrapper from './components/common/route-suspense-wrapper/RouteSuspenseWrapper';
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
      </>
    </TMDBImageQualityProvider>
  </ThemeContextProvider>
);

export default App;
*/
