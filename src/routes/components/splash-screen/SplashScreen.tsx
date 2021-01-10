import React from 'react';

import useSplashScreen from './useSplashScreen';

type Props = {
  onLoad: () => void;
};

const SplashScreen = ({ onLoad }: Props) => {
  useSplashScreen({ onLoad });

  return <></>;
};

export default SplashScreen;
