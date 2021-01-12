import { useCallback, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { DefaultTheme } from 'styled-components';

import {
  getItemFromStorage,
  persistItemInStorage,
} from 'utils/async-storage-adapter/AsyncStorageAdapter';
import CONSTANTS from 'utils/constants';
import { ImageQualities } from 'types';
import { useThemeProvider } from 'providers/theme/Theme';

type Props = {
  theme: DefaultTheme;
  onLoad: () => void;
};

const useSplashScreen = ({ onLoad, theme }: Props) => {
  const { handleInitialThemeSelection } = useThemeProvider();

  const handleImageSizeOptionSelection = useCallback(async () => {
    const selectedImageSizesOption = await getItemFromStorage<ImageQualities, undefined>(
      CONSTANTS.KEYS.IMAGES_QUALITY,
      undefined,
    );

    if (!selectedImageSizesOption) {
      await persistItemInStorage(CONSTANTS.KEYS.IMAGES_QUALITY, 'medium');
    }
  }, []);

  useEffect(() => {
    handleImageSizeOptionSelection();

    handleInitialThemeSelection();
  }, []);

  useEffect(() => {
    if (theme && theme.id) {
      onLoad();

      SplashScreen.hide();
    }
  }, [theme]);
};

export default useSplashScreen;
