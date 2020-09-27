
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components';

import { dark } from 'styles/themes';

const Stack = createStackNavigator();

const MockedNavigator = ({ component, params = {} }) => (
  <ThemeProvider
    theme={dark}
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
