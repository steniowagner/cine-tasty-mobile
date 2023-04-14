import {useMemo} from 'react';

import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';

export const useTrendingMoviesSectionTexts = () => {
  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      nowPlaying: {
        section: translations.translate(
          Translations.Tags.HOME_TRENDING_MOVIES_NOW_PLAYING,
        ),
        viewAll: translations.translate(
          Translations.Tags.HOME_TRENDING_MOVIES_NOW_PLAYING_VIEW_ALL,
        ),
      },
      popular: {
        section: translations.translate(
          Translations.Tags.HOME_TRENDING_MOVIES_POPULAR,
        ),
        viewAll: translations.translate(
          Translations.Tags.HOME_TRENDING_MOVIES_POPULAR_VIEW_ALL,
        ),
      },
      topRated: {
        section: translations.translate(
          Translations.Tags.HOME_TRENDING_MOVIES_TOP_RATED,
        ),
        viewAll: translations.translate(
          Translations.Tags.HOME_TRENDING_MOVIES_TOP_RATED_VIEW_ALL,
        ),
      },
      upcoming: {
        section: translations.translate(
          Translations.Tags.HOME_TRENDING_MOVIES_UPCOMING,
        ),
        viewAll: translations.translate(
          Translations.Tags.HOME_TRENDING_MOVIES_UPCOMING_VIEW_ALL,
        ),
      },
      errorMessage: translations.translate(
        Translations.Tags.HOME_TRENDING_MOVIES_ERROR,
      ),
    }),
    [translations.translate],
  );

  return texts;
};
