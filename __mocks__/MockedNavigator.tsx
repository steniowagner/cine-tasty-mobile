
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MockedNavigator = ({ component, params = {} }) => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        initialParams={params}
        component={component}
        name="MockedScreen"
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MockedNavigator;