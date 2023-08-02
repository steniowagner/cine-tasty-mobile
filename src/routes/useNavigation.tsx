import {useCallback, useState} from 'react';

export const useNavigation = () => {
  const [isSplashScreenLoaded, setIsSplashScreenLoaded] = useState(true);

  const handleOnLoadSplashScreen = useCallback(() => {
    setIsSplashScreenLoaded(true);
  }, []);

  return {
    handleOnLoadSplashScreen,
    isSplashScreenLoaded,
  };
};
