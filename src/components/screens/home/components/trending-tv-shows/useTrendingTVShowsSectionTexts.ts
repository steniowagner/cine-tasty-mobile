import {useMemo} from 'react';

import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';

export const useTrendingTVShowsSectionTexts = () => {
  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      onTheAir: {
        section: translations.translate(
          Translations.Tags.HOME_TRENDING_TV_SHOWS_ON_THE_AIR,
        ),
        viewAll: translations.translate(
          Translations.Tags.HOME_TRENDING_TV_SHOWS_ON_THE_AIR_VIEW_ALL,
        ),
      },
      airingToday: {
        section: translations.translate(
          Translations.Tags.HOME_TRENDING_TV_SHOWS_AIRING_TODAY,
        ),
        viewAll: translations.translate(
          Translations.Tags.HOME_TRENDING_TV_SHOWS_AIRING_TODAY_VIEW_ALL,
        ),
      },
      popular: {
        section: translations.translate(
          Translations.Tags.HOME_TRENDING_TV_SHOWS_POPULAR,
        ),
        viewAll: translations.translate(
          Translations.Tags.HOME_TRENDING_TV_SHOWS_POPULAR_VIEW_ALL,
        ),
      },
      topRated: {
        section: translations.translate(
          Translations.Tags.HOME_TRENDING_TV_SHOWS_TOP_RATED,
        ),
        viewAll: translations.translate(
          Translations.Tags.HOME_TRENDING_TV_SHOWS_TOP_RATED_VIEW_ALL,
        ),
      },
      errorMessage: translations.translate(
        Translations.Tags.HOME_TRENDING_TV_SHOWS_ERROR,
      ),
    }),
    [translations.translate],
  );

  return texts;
};
