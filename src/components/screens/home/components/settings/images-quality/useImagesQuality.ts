import {useMemo} from 'react';

import {useTMDBImageQualities} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import {useTranslations} from '@hooks';
import * as Types from '@local-types';
import {Translations} from '@i18n/tags';

export const qualities: Types.ImageQualities[] = [
  'low',
  'medium',
  'high',
  'veryHigh',
];

export const useImagesQuality = () => {
  const tmdbImagesQualities = useTMDBImageQualities();
  const translations = useTranslations();

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

  return {
    qualitySelected: tmdbImagesQualities.imageQualitySelected,
    onPress: (imageQuality: Types.ImageQualities) =>
      tmdbImagesQualities.changeQuality(imageQuality),
    qualities: options,
  };
};
