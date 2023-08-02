import {useCallback, useEffect, useState} from 'react';

import {CONSTANTS, storage} from '@utils';

type CurrentStack = 'checking-initial-screen' | 'onboarding' | 'tabs';

const useRouteNavigation = () => {
  const [currentStack, setCurrentStack] = useState<CurrentStack>(
    'checking-initial-screen',
  );

  const handleInitialScreenSelection = useCallback(async () => {
    const isOnboardingAlreadyShown = await storage.get<boolean, boolean>(
      CONSTANTS.KEYS.ONBOARDING_SHOWED,
      false,
    );

    const properNextScreen = isOnboardingAlreadyShown ? 'tabs' : 'onboarding';

    setCurrentStack(properNextScreen);
  }, []);

  useEffect(() => {
    handleInitialScreenSelection();
  }, []);

  return {
    currentStack,
  };
};

export default useRouteNavigation;
