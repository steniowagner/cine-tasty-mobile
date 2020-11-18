import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';

const Stack = createStackNavigator();

const MockedNavigator = ({ component, params = {} }) => (
  <ThemeProvider
    theme={theme}
  >
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          initialParams={params}
          component={component}
          name="MockedScreen"
        />
      </Stack.Navigator>
    </NavigationContainer>
  </ThemeProvider>
);

export default MockedNavigator;
