import React, { useCallback, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, withTheme } from 'styled-components';

import { useStatusBarStyle } from 'hooks';

import SplashScreen from './components/splash-screen/SplashScreen';
import RootNavigation from './components/RootNavigation';

type Props = {
  theme: DefaultTheme;
};

const Routes = ({ theme }: Props) => {
  const [isSplashScreenLoaded, setIsSplashScreenLoaded] = useState<boolean>(false);
  const { barStyle } = useStatusBarStyle({ theme });

  const renderContent = useCallback(() => {
    if (isSplashScreenLoaded) {
      return <RootNavigation />;
    }

    return (
      <SplashScreen
        onLoad={() => setIsSplashScreenLoaded(true)}
      />
    );
  }, [isSplashScreenLoaded]);

  return (
    <>
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
    </>
  );
};

export default withTheme(Routes);
