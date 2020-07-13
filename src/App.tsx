import React from 'react';
import { Platform } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';

import RouteSuspenseWrapper from './components/common/RouteSuspenseWrapper';

import { ThemeContextProvider } from './styles/theme-context-provider/ThemeContextProvider';
import AndroidNavigationBar from './components/utils/AndroidNavigationBar.android';
import Navigation from './routes/Routes';
import makeClient from './config/client';

const client = makeClient();

const App = () => (
  <ThemeContextProvider>
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
  </ThemeContextProvider>
);

export default App;
