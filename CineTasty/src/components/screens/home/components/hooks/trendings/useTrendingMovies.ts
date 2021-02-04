/* eslint-disable camelcase */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  TrendingMovies_trendingMovies as TrendingMovieSection,
  TrendingMovies,
  TrendingMovie,
} from 'types/schema';
import { HomeSection } from 'types';

import parseTrendingToSimplifiedMedia from './parseTrendingToSimplifiedMedia';

export const NOW_PLAYING_VIEW_ALL_TITLE_i18N_REF = 'translations:home:trendingMovies:nowPlayingViewAllTitle';
export const NOW_PLAYING_SECTION_TITLE_i18N_REF = 'translations:home:trendingMovies:nowPlaying';

export const POPULAR_VIEW_ALL_TITLE_i18N_REF = 'translations:home:trendingMovies:popularViewAllTitle';
export const POPULAR_SECTION_TITLE_i18N_REF = 'translations:home:trendingMovies:popular';

export const TOP_RATED_VIEW_ALL_TITLE_i18N_REF = 'translations:home:trendingMovies:topRatedViewAllTitle';
export const TOP_RATED_SECTION_TITLE_i18N_REF = 'translations:home:trendingMovies:topRated';

export const UPCOMING_VIEW_ALL_TITLE_i18N_REF = 'translations:home:trendingMovies:upcomingViewAllTitle';
export const UPCOMING_SECTION_TITLE_i18N_REF = 'translations:home:trendingMovies:upcoming';

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
          viewAllTitle: t(NOW_PLAYING_VIEW_ALL_TITLE_i18N_REF),
          sectionTitle: t(NOW_PLAYING_SECTION_TITLE_i18N_REF),
          id: 'nowPlaying',
        },
        popular: {
          viewAllTitle: t(POPULAR_VIEW_ALL_TITLE_i18N_REF),
          sectionTitle: t(POPULAR_SECTION_TITLE_i18N_REF),
          id: 'popular',
        },
        topRated: {
          viewAllTitle: t(TOP_RATED_VIEW_ALL_TITLE_i18N_REF),
          sectionTitle: t(TOP_RATED_SECTION_TITLE_i18N_REF),
          id: 'topRated',
        },
        upcoming: {
          viewAllTitle: t(UPCOMING_VIEW_ALL_TITLE_i18N_REF),
          sectionTitle: t(UPCOMING_SECTION_TITLE_i18N_REF),
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
