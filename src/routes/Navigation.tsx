import React from 'react';
import {DefaultTheme, withTheme} from 'styled-components/native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {StatusBarStyled} from '@components';

import SplashScreen from './components/splash-screen/SplashScreen';
import {useNavigation} from './useNavigation';
import Tabs from './components/Tabs';
import {Routes} from './routes';

const RootStack = createStackNavigator();

type NavigationProps = {
  theme: DefaultTheme;
};

export const Navigation = withTheme((props: NavigationProps) => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBarStyled />
      <NavigationContainer
        theme={{
          dark: false,
          colors: {
            background: props.theme.colors.background,
            card: props.theme.colors.secondary,
            primary: props.theme.colors.text,
            notification: 'transparent',
            border: props.theme.colors.text,
            text: props.theme.colors.text,
          },
        }}>
        {navigation.isSplashScreenLoaded ? (
          <RootStack.Navigator>
            <RootStack.Screen
              options={{headerShown: false}}
              name={Routes.Tabs.TABS}
              component={Tabs}
            />
          </RootStack.Navigator>
        ) : (
          <SplashScreen onLoad={navigation.handleOnLoadSplashScreen} />
        )}
      </NavigationContainer>
    </>
  );
});
