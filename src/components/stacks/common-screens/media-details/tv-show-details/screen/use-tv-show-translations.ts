import { useMemo } from 'react';

import { useTranslation } from '@hooks';
import { Translations } from '@i18n/tags';

export const useTVShowTranslations = () => {
  const translation = useTranslation();

  const texts = useMemo(
    () => ({
      tvShowTag: translation.translate(Translations.TVShowDetails.TV_SHOW),
      advice: {
        description: translation.translate(
          Translations.Error.ERROR_ADVICE_DESCRIPTION,
        ),
        suggestion: translation.translate(
          Translations.Error.ERROR_ADVICE_SUGGESTION,
        ),
        title: translation.translate(Translations.Error.ERROR_ADVICE_TITLE),
      },
    }),
    [translation.translate],
  );

  return {
    texts,
  };
};
