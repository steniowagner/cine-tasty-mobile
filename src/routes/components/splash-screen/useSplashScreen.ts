import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

type Props = {
  onLoad: () => void;
};

const useSplashScreen = ({ onLoad }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      onLoad();
      SplashScreen.hide();
    }, 3000);
  }, []);
};

export default useSplashScreen;
