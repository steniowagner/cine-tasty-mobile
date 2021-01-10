import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';

import { TMDBImageQualityProvider } from 'providers/tmdb-image-quality/TMDBImageQuality';
import theme from 'styles/theme';

import AndroidNavigationBar from './components/utils/AndroidNavigationBar.android';
import RouteSuspenseWrapper from './components/common/RouteSuspenseWrapper';
import Navigation from './routes/Routes';
import makeClient from './config/client';

const client = makeClient();

const App = () => (
  <TMDBImageQualityProvider>
    <ThemeProvider
      theme={theme}
    >
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
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

export default App;
