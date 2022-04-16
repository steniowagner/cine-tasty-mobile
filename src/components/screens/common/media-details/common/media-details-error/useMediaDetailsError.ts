import {useMemo} from 'react';

import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';

export const useMediaDetailsError = () => {
  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      description: translations.translate(
        Translations.Tags.MEDIA_DETAIL_ERROR_DESCRIPTION,
      ),
      suggestion: translations.translate(
        Translations.Tags.MEDIA_DETAIL_ERROR_SUGGESTION,
      ),
      title: translations.translate(Translations.Tags.MEDIA_DETAIL_ERROR_TITLE),
    }),
    [translations.translate],
  );

  return {
    texts,
  };
};
