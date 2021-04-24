import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ThemeContextProvider } from '@providers';

const Stack = createStackNavigator();

const MockedNavigator = ({ component, params = {} }) => (
  <ThemeContextProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          initialParams={params}
          component={component}
          name="MockedScreen"
        />
      </Stack.Navigator>
    </NavigationContainer>
  </ThemeContextProvider>
);

export default MockedNavigator;
