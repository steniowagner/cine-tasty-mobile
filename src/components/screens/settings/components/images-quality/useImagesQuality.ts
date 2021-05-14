import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';

import {
  persistItemInStorage,
  getItemFromStorage,
} from '@utils/async-storage-adapter/AsyncStorageAdapter';
import * as TRANSLATIONS from '@i18n/tags';
import CONSTANTS from '@utils/constants';
import * as Types from '@local-types';

export const qualities: Types.ImageQualities[] = ['low', 'medium', 'high', 'veryHigh'];

const useImagesQuality = () => {
  const [qualitySelected, setQualitySelected] = useState<
    Types.ImageQualities | undefined
  >(undefined);

  const { t } = useTranslation();

  const onPress = useCallback((imageQuality: Types.ImageQualities) => {
    persistItemInStorage(CONSTANTS.KEYS.IMAGES_QUALITY, imageQuality);

    RNRestart.Restart();
  }, []);

  const setImageQualityFromStore = useCallback(async () => {
    const imageQualityFromStore = await getItemFromStorage<
      undefined,
      Types.ImageQualities
    >(CONSTANTS.KEYS.IMAGES_QUALITY, undefined);

    setQualitySelected(imageQualityFromStore);
  }, []);

  useEffect(() => {
    setImageQualityFromStore();
  }, []);

  const imagesQuality = useMemo(
    () => qualities.map((imageQuality) => ({
      title: t(`${TRANSLATIONS.IMAGE_QUALITIES}:${imageQuality}`),
      quality: imageQuality,
    })),
    [],
  );

  return {
    qualities: imagesQuality,
    qualitySelected,
    onPress,
  };
};

export default useImagesQuality;
