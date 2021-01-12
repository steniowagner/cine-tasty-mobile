import React from 'react';
import { DefaultTheme, withTheme } from 'styled-components';

import useSplashScreen from './useSplashScreen';

type Props = {
  theme: DefaultTheme;
  onLoad: () => void;
};

const SplashScreen = ({ onLoad, theme }: Props) => {
  useSplashScreen({ onLoad, theme });

  return <></>;
};

export default withTheme(SplashScreen);
