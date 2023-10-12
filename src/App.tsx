import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  ThemeContextProvider,
  GraphQLClient,
  AlertMessageProvider,
} from '@providers';
import { Navigation } from '@navigation';

export const App = () => (
  <ThemeContextProvider>
    <GestureHandlerRootView style={sheet.gestureHandler}>
      <GraphQLClient>
        <AlertMessageProvider>
          <Navigation />
        </AlertMessageProvider>
      </GraphQLClient>
    </GestureHandlerRootView>
  </ThemeContextProvider>
);

const sheet = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
});
