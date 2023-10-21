import React, { ComponentType } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes/dark';

const Stack = createStackNavigator();

type MockedNavigatorProps = {
  component: ComponentType<any>;
  extraScreens?: string[];
  params?: any;
};

export const MockedNavigator = (props: MockedNavigatorProps) => (
  <ThemeProvider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          initialParams={props.params || {}}
          component={props.component}
          name="MockedScreen"
        />
        {props.extraScreens?.map(extraScreen => (
          <Stack.Screen
            initialParams={props.params || {}}
            name={extraScreen}
            key={extraScreen}
            component={View}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  </ThemeProvider>
);
