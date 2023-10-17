import React from 'react';

import {
  ThemeContextProvider,
  GraphQLClient,
  AlertMessageProvider,
} from '@providers';
import { Navigation } from '@navigation';

export const App = () => (
  <ThemeContextProvider>
    <GraphQLClient>
      <AlertMessageProvider>
        <Navigation />
      </AlertMessageProvider>
    </GraphQLClient>
  </ThemeContextProvider>
);
