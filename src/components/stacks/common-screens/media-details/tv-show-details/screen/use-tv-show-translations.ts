import { useMemo } from 'react';

import { Translations } from '@i18n/tags';
import { useTranslation } from '@hooks';

export const useTVShowTranslations = () => {
  const translation = useTranslation();

  const texts = useMemo(
    () => ({
      tvShowTag: translation.translate(Translations.TVShowDetails.TV_SHOW),
      sections: {
        overview: translation.translate(Translations.TVShowDetails.OVERVIEW),
        info: {
          originalTitle: translation.translate(
            Translations.TVShowDetails.ORIGINAL_TITLE,
          ),
          originalLanguage: translation.translate(
            Translations.TVShowDetails.ORIGINAL_LANGUAGE,
          ),
          numberOfEpisodes: translation.translate(
            Translations.TVShowDetails.NUMBER_OF_EPISODES,
          ),
          numberOfSeasons: translation.translate(
            Translations.TVShowDetails.NUMBER_OF_SEASONS,
          ),
          episodeRuntime: translation.translate(
            Translations.TVShowDetails.EPISODE_RUNTIME,
          ),
          originalCountry: translation.translate(
            Translations.TVShowDetails.ORIGINAL_COUNTRY,
          ),
          firstAirDate: translation.translate(
            Translations.TVShowDetails.FIRST_AIR_DATE,
          ),
          lastAirDate: translation.translate(
            Translations.TVShowDetails.LAST_AIR_DATE,
          ),
        },
        similar: translation.translate(
          Translations.TVShowDetails.FIRST_AIR_DATE,
        ),
      },
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

  return texts;
};
