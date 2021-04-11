import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';

import {
  persistItemInStorage,
  getItemFromStorage,
} from 'utils/async-storage-adapter/AsyncStorageAdapter';
import * as TRANSLATIONS from 'i18n/tags';
import CONSTANTS from 'utils/constants';
import { ImageQualities } from 'types';

export const qualities: ImageQualities[] = ['low', 'medium', 'high', 'veryHigh'];

type Quality = {
  quality: ImageQualities;
  title: string;
};

type State = {
  onPress: (quality: ImageQualities) => void;
  qualitySelected: ImageQualities;
  qualities: Quality[];
};

const useImagesQuality = (): State => {
  const [qualitySelected, setQualitySelected] = useState<ImageQualities | undefined>(
    undefined,
  );

  const { t } = useTranslation();

  const onPress = useCallback((imageQuality: ImageQualities) => {
    persistItemInStorage(CONSTANTS.KEYS.IMAGES_QUALITY, imageQuality);

    RNRestart.Restart();
  }, []);

  const setImageQualityFromStore = useCallback(async () => {
    const imageQualityFromStore = await getItemFromStorage<undefined, ImageQualities>(
      CONSTANTS.KEYS.IMAGES_QUALITY,
      undefined,
    );

    setQualitySelected(imageQualityFromStore);
  }, []);

  useEffect(() => {
    setImageQualityFromStore();
  }, []);

  return {
    qualities: qualities.map((imageQuality) => ({
      title: t(`${TRANSLATIONS.IMAGE_QUALITIES}:${imageQuality}`),
      quality: imageQuality,
    })),
    qualitySelected,
    onPress,
  };
};

export default useImagesQuality;
