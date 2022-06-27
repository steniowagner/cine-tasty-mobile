import React, {useCallback, useState} from 'react';

import RootNavigation from './components/root-navigation/RootNavigation';
// import SplashScreen from './components/splash-screen/SplashScreen';

const useNavigation = () => {
  const [isSplashScreenLoaded, setIsSplashScreenLoaded] = useState(true);

  const renderContent = useCallback(() => {
    if (isSplashScreenLoaded) {
      return <RootNavigation />;
    }
    // return <SplashScreen onLoad={() => setIsSplashScreenLoaded(true)} />;
  }, [isSplashScreenLoaded]);

  return {
    renderContent,
  };
};

export default useNavigation;
