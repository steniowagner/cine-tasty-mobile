import { useState } from 'react';

const useRouteNavigation = () => {
  const [shoudlShowOnboarding] = useState<boolean>(true);

  return {
    shoudlShowOnboarding,
  };
};

export default useRouteNavigation;
