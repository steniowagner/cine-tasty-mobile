import React from 'react';
import { Platform } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { SERVER_URL } from 'react-native-dotenv';

import { ThemeContextProvider } from './styles/theme-context-provider/ThemeContextProvider';
import AndroidNavigationBar from './components/AndroidNavigationBar';
import Navigation from './routes/Routes';

const client = new ApolloClient({
  uri: SERVER_URL,
});

const App = () => (
  <ThemeContextProvider>
    <>
      <ApolloProvider
        client={client}
      >
        <Navigation />
      </ApolloProvider>
      {Platform.OS === 'android' && <AndroidNavigationBar />}
    </>
  </ThemeContextProvider>
);

export default App;
