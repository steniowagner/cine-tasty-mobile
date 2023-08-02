import {useCallback, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {DefaultTheme} from 'styled-components/native';

import {useThemeProvider} from '@src/providers/theme/Theme';
import {CONSTANTS, storage} from '@utils';
import * as Types from '@local-types';

type UseSplashScreenProps = {
  theme: DefaultTheme;
  onLoad: () => void;
};

const useSplashScreen = ({onLoad, theme}: UseSplashScreenProps) => {
  const {initializeTheme} = useThemeProvider();

  const handleImageSizeOptionSelection = useCallback(async () => {
    const selectedImageSizesOption = await storage.get<
      Types.ImageQualities,
      undefined
    >(CONSTANTS.KEYS.IMAGES_QUALITY, undefined);

    if (!selectedImageSizesOption) {
      await storage.set(CONSTANTS.KEYS.IMAGES_QUALITY, 'medium');
    }
  }, []);

  useEffect(() => {
    handleImageSizeOptionSelection();

    initializeTheme();
  }, []);

  useEffect(() => {
    if (theme && theme.id) {
      onLoad();

      SplashScreen.hide();
    }
  }, [theme]);
};

export default useSplashScreen;
