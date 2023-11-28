import { useMemo } from 'react';

import { Translations } from '@i18n/tags';
import { useTranslation } from '@hooks';

export const useTVShowTranslations = () => {
  const translation = useTranslation();

  const texts = useMemo(
    () => ({
      creator: translation.translate(Translations.TVShowDetails.CREATOR),
      tvShowTag: translation.translate(Translations.TVShowDetails.TV_SHOW),
      sections: {
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
        crew: translation.translate(Translations.TVShowDetails.CREW),
        cast: translation.translate(Translations.TVShowDetails.CAST),
        similar: translation.translate(Translations.Miscellaneous.SIMILAR),
        videos: translation.translate(Translations.Miscellaneous.VIDEOS),
        seasons: translation.translate(Translations.TVShowDetails.SEASONS),
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
