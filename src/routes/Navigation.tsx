import React from 'react';
import {DefaultTheme, withTheme} from 'styled-components/native';
import {NavigationContainer} from '@react-navigation/native';

import {StatusBarStyled} from '@components';

import useNavigation from './useNavigation';

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
        {navigation.renderContent()}
      </NavigationContainer>
    </>
  );
});
