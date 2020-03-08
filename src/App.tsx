import React from 'react';
import { Platform } from 'react-native';

import { ThemeContextProvider } from './styles/theme-context-provider/ThemeContextProvider';
import AndroidNavigationBar from './components/AndroidNavigationBar';
import Navigation from './routes/Routes';

const App = () => (
  <ThemeContextProvider>
    <>
      <Navigation />
      {Platform.OS === 'android' && <AndroidNavigationBar />}
    </>
  </ThemeContextProvider>
);

export default App;
