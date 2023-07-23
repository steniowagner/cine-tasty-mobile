import {useCallback, useEffect, useMemo, useState} from 'react';
import RNRestart from 'react-native-restart';

import {useTMDBImageQualities} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import {useTranslations} from '@hooks';
import {CONSTANTS, storage} from '@utils';
import * as Types from '@local-types';
import {Translations} from '@i18n/tags';

export const qualities: Types.ImageQualities[] = [
  'low',
  'medium',
  'high',
  'veryHigh',
];

export const useImagesQuality = () => {
  const [qualitySelected, setQualitySelected] = useState<
    Types.ImageQualities | undefined
  >(undefined);

  const tmdbImagesQualities = useTMDBImageQualities();
  const translations = useTranslations();

  const onPress = useCallback(async (imageQuality: Types.ImageQualities) => {
    await storage.set(CONSTANTS.KEYS.IMAGES_QUALITY, imageQuality);
    RNRestart.Restart();
  }, []);

  const setImageQualityFromStore = useCallback(async () => {
    const imageQualityFromStore = await storage.get<
      undefined,
      Types.ImageQualities
    >(CONSTANTS.KEYS.IMAGES_QUALITY, undefined);
    console.log(
      'tmdbImagesQualities.: ',
      tmdbImagesQualities.imageQualitySelected,
    );

    setQualitySelected(imageQualityFromStore);
  }, []);

  const options = useMemo(
    () =>
      qualities.map(quality => ({
        title: translations.translate(
          `${Translations.Tags.SETTINGS_IMAGES_QUALITIES}:${quality}` as Translations.Tags,
        ),
        quality,
      })),
    [],
  );

  useEffect(() => {
    setImageQualityFromStore();
  }, []);

  return {
    qualities: options,
    qualitySelected,
    onPress,
  };
};
