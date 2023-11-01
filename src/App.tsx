import React from 'react';

import {
  ThemeContextProvider,
  GraphQLClient,
  AlertMessageProvider,
  TMDBImageQualitiesProvider,
} from '@providers';
import { Navigation } from '@navigation';

export const App = () => (
  <ThemeContextProvider>
    <GraphQLClient>
      <AlertMessageProvider>
        <TMDBImageQualitiesProvider>
          <Navigation />
        </TMDBImageQualitiesProvider>
      </AlertMessageProvider>
    </GraphQLClient>
  </ThemeContextProvider>
);
