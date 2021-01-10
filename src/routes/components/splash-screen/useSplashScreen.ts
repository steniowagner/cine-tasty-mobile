import { useCallback, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import {
  getItemFromStorage,
  persistItemInStorage,
} from 'utils/async-storage-adapter/AsyncStorageAdapter';
import CONSTANTS from 'utils/constants';
import { ImageQualities } from 'types';

type Props = {
  onLoad: () => void;
};

const useSplashScreen = ({ onLoad }: Props) => {
  const handleAppThemeOptionSelection = useCallback(async () => {
    const selectedThemeOption = await getItemFromStorage<string, undefined>(
      CONSTANTS.KEYS.APP_THEME,
      undefined,
    );

    if (!selectedThemeOption) {
      await persistItemInStorage(CONSTANTS.KEYS.APP_THEME, 'dark');
    }
  }, []);

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

    handleAppThemeOptionSelection();

    onLoad();

    SplashScreen.hide();
  }, []);
};

export default useSplashScreen;
