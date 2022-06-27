import {DefaultTheme, withTheme} from 'styled-components/native';

import useSplashScreen from './useSplashScreen';

type SplashScreenProps = {
  theme: DefaultTheme;
  onLoad: () => void;
};

const SplashScreen = ({onLoad, theme}: SplashScreenProps) => {
  useSplashScreen({onLoad, theme});

  return null;
};

export default withTheme(SplashScreen);
