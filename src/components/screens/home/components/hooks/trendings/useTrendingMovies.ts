import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  TrendingMovies_trendingMovies as TrendingMovieSection,
  TrendingMovies,
  TrendingMovie,
} from 'types/schema';
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
          viewAllTitle: t('translations:home:trendingMovies:nowPlayingViewAllTitle'),
          sectionTitle: t('translations:home:trendingMovies:nowPlaying'),
          id: 'nowPlaying',
        },
        popular: {
          viewAllTitle: t('translations:home:trendingMovies:popularViewAllTitle'),
          sectionTitle: t('translations:home:trendingMovies:popular'),
          id: 'popular',
        },
        topRated: {
          viewAllTitle: t('translations:home:trendingMovies:topRatedViewAllTitle'),
          sectionTitle: t('translations:home:trendingMovies:topRated'),
          id: 'topRated',
        },
        upcoming: {
          viewAllTitle: t('translations:home:trendingMovies:upcomingViewAllTitle'),
          sectionTitle: t('translations:home:trendingMovies:upcoming'),
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
