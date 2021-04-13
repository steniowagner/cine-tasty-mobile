/* eslint-disable camelcase */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import * as Types from '@local-types';

import parseTrendingToSimplifiedMedia from './parseTrendingToSimplifiedMedia';

type Props = {
  rawTrendingMovies: SchemaTypes.TrendingMovies;
};

type TrendingItemKey = keyof Omit<
  SchemaTypes.TrendingMovies_trendingMovies,
  '__typename'
>;

const useTrendingMovies = ({ rawTrendingMovies }: Props) => {
  const [trendingMovies, setTrendingMovies] = useState<Types.HomeSection[]>([]);

  const { t } = useTranslation();

  const parseSection = useCallback(
    (
      trendingItemKey: TrendingItemKey,
      dataset: SchemaTypes.TrendingMovie[],
    ): Types.HomeSection => {
      const sectionMapping: Record<TrendingItemKey, Omit<Types.HomeSection, 'data'>> = {
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
