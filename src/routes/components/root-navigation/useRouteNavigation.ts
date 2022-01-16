import {useCallback, useEffect, useState} from 'react';

import * as storage from '@utils/storage';
import CONSTANTS from '@utils/constants';

type CurrentStack = 'checking-initial-screen' | 'onboarding' | 'tabs';

const useRouteNavigation = () => {
  const [currentStack, setCurrentStack] = useState<CurrentStack>(
    'checking-initial-screen',
  );

  const onFinishShowOnboarding = useCallback(async () => {
    await storage.set(CONSTANTS.KEYS.ONBOARDING_SHOWED, 'true');
    setCurrentStack('tabs');
  }, []);

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
    onFinishShowOnboarding,
    currentStack,
  };
};

export default useRouteNavigation;
