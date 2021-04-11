/* eslint-disable camelcase */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  TrendingMovies_trendingMovies as TrendingMovieSection,
  TrendingMovies,
  TrendingMovie,
} from 'types/schema';
import * as TRANSLATIONS from 'i18n/tags';
import { HomeSection } from 'types';

import parseTrendingToSimplifiedMedia from './parseTrendingToSimplifiedMedia';

type Props = {
  rawTrendingMovies: TrendingMovies;
};

type State = {
  trendingMovies: HomeSection[];
};

type TrendingItemKey = keyof Omit<TrendingMovieSection, '__typename'>;

const useTrendingMovies = ({ rawTrendingMovies }: Props): State => {
  const [trendingMovies, setTrendingMovies] = useState<HomeSection[]>([]);

  const { t } = useTranslation();

  const parseSection = useCallback(
    (trendingItemKey: TrendingItemKey, dataset: TrendingMovie[]): HomeSection => {
      const sectionMapping: Record<TrendingItemKey, Omit<HomeSection, 'data'>> = {
        nowPlaying: {
          viewAllTitle: t(TRANSLATIONS.HOME_TRENDING_MOVIES_NOW_PLAYING_VIEW_ALL),
          sectionTitle: t(TRANSLATIONS.HOME_TRENDING_MOVIES_NOW_PLAYING),
          id: 'nowPlaying',
        },
        popular: {
          viewAllTitle: t(TRANSLATIONS.HOME_TRENDING_MOVIES_POPULAR_VIEW_ALL),
          sectionTitle: t(TRANSLATIONS.HOME_TRENDING_MOVIES_POPULAR),
          id: 'popular',
        },
        topRated: {
          viewAllTitle: t(TRANSLATIONS.HOME_TRENDING_MOVIES_TOP_RATED_VIEW_ALL),
          sectionTitle: t(TRANSLATIONS.HOME_TRENDING_MOVIES_TOP_RATED),
          id: 'topRated',
        },
        upcoming: {
          viewAllTitle: t(TRANSLATIONS.HOME_TRENDING_MOVIES_UPCOMING_VIEW_ALL),
          sectionTitle: t(TRANSLATIONS.HOME_TRENDING_MOVIES_UPCOMING),
          id: 'upcoming',
        },
      };

      if (!sectionMapping[trendingItemKey]) {
        return {
          viewAllTitle: '',
          sectionTitle: '',
          id: 'nowPlaying',
          data: [],
        };
      }

      return {
        ...sectionMapping[trendingItemKey],
        data: parseTrendingToSimplifiedMedia(dataset),
      };
    },
    [],
  );

  const handleMovieSections = useCallback(() => {
    const trendingEntries = Object.entries(rawTrendingMovies.trendingMovies).filter(
      ([, entryValue]) => typeof entryValue !== 'string',
    );

    const movieSections = trendingEntries.map(([trendingKey, trendingItems]) => parseSection(trendingKey as TrendingItemKey, trendingItems.items));

    setTrendingMovies(movieSections);
  }, [rawTrendingMovies]);

  useEffect(() => {
    if (rawTrendingMovies) {
      handleMovieSections();
    }
  }, [rawTrendingMovies]);

  return {
    trendingMovies,
  };
};

export default useTrendingMovies;
