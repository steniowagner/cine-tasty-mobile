import React from 'react';
import { Platform } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';

import { TMDBImageQualityProvider } from 'providers/tmdb-image-quality/TMDBImageQuality';
import theme from 'styles/theme';

import RouteSuspenseWrapper from './components/common/RouteSuspenseWrapper';
import AndroidNavigationBar from './components/utils/AndroidNavigationBar.android';
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
        {Platform.OS === 'android' && <AndroidNavigationBar />}
      </>
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

export default App;
