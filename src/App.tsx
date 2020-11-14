import React from 'react';
import { Platform } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';

import RouteSuspenseWrapper from './components/common/RouteSuspenseWrapper';
import AndroidNavigationBar from './components/utils/AndroidNavigationBar.android';
import Navigation from './routes/Routes';
import makeClient from './config/client';

const client = makeClient();

const App = () => (
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
);

export default App;
