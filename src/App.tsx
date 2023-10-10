import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeContextProvider } from '@providers';
import { Navigation } from '@navigation';

export const App = () => (
  <ThemeContextProvider>
    <GestureHandlerRootView style={sheet.gestureHandler}>
      <Navigation />
    </GestureHandlerRootView>
  </ThemeContextProvider>
);

const sheet = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
});
