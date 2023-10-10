import React from 'react';
import { useTheme } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Tabs } from './components/Tabs';
import { Routes } from './routes';

const RootStack = createStackNavigator();

export const Navigation = () => {
  const theme = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          background: theme.colors.background,
          card: theme.colors.secondary,
          primary: theme.colors.text,
          notification: 'transparent',
          border: theme.colors.text,
          text: theme.colors.text,
        },
      }}>
      <RootStack.Navigator>
        <RootStack.Screen
          options={{ headerShown: false }}
          name={Routes.Tabs.TABS}
          component={Tabs}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
