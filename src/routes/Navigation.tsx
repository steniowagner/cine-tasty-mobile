import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, withTheme } from 'styled-components';
import { AppearanceProvider } from 'react-native-appearance';

import useNavigation from './useNavigation';

type RoutesProps = {
  theme: DefaultTheme;
};

const Routes = ({ theme }: RoutesProps) => {
  const { renderContent, barStyle } = useNavigation({ theme });

  return (
    <AppearanceProvider>
      <StatusBar
        backgroundColor={theme.colors.secondary}
        barStyle={barStyle}
        animated
      />
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
        }}
      >
        {renderContent()}
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default withTheme(Routes);
