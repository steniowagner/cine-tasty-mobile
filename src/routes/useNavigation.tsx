import React, { useCallback, useState } from 'react';
import { DefaultTheme } from 'styled-components';

import { useStatusBarStyle } from '@hooks';

import SplashScreen from './components/splash-screen/SplashScreen';
import RootNavigation from './components/RootNavigation';

type UseNavigationProps = {
  theme: DefaultTheme;
};

const useNavigation = ({ theme }: UseNavigationProps) => {
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

  return {
    renderContent,
    barStyle,
  };
};

export default useNavigation;
