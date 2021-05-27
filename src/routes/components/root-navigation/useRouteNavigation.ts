import { useCallback, useState } from 'react';

const useRouteNavigation = () => {
  const [shoudlShowOnboarding, setShoudlShowOnboarding] = useState<boolean>(true);

  const onFinishShowOnboarding = useCallback(() => {
    setShoudlShowOnboarding(false);
  }, []);

  return {
    onFinishShowOnboarding,
    shoudlShowOnboarding,
  };
};

export default useRouteNavigation;
