import React from 'react';

import { ThemeContextProvider } from './styles/theme-context-provider/ThemeContextProvider';
import Navigation from './routes/Routes';

const App = () => (
  <ThemeContextProvider>
    <Navigation />
  </ThemeContextProvider>
);

export default App;
