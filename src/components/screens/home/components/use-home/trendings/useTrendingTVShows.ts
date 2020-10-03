import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  TrendingTVShows_trendingTvShows as TrendingTVShowsSection,
  TrendingTVShows,
  TrendingTVShow,
} from 'types/schema';
import { HomeSection } from 'types';

import parseTrendingToSimplifiedMedia from './parseTrendingToSimplifiedMedia';

type Props = {
  rawTrendingTVShows: TrendingTVShows;
};

type State = {
  trendingTVShows: HomeSection[];
};

type TrendingItemKey = keyof Omit<TrendingTVShowsSection, '__typename'>;

const useTrendingMovies = ({ rawTrendingTVShows }: Props): State => {
  const [trendingTVShows, setTrendingTVShows] = useState<HomeSection[]>([]);

  const { t } = useTranslation();

  const parseSection = useCallback(
    (trendingItemKey: TrendingItemKey, dataset: TrendingTVShow[]): HomeSection => {
      const sectionMapping: Record<TrendingItemKey, Omit<HomeSection, 'data'>> = {
        onTheAir: {
          sectionTitle: t('translations:home:trendingTvShows:onTheAir'),
          id: 'onTheAir',
        },
        popular: {
          sectionTitle: t('translations:home:trendingTvShows:popular'),
          id: 'popular',
        },
        topRated: {
          sectionTitle: t('translations:home:trendingTvShows:topRated'),
          id: 'topRated',
        },
      };

      if (!sectionMapping[trendingItemKey]) {
        return {
          sectionTitle: '',
          id: 'onTheAir',
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

  const handleTVShowsSections = useCallback(() => {
    const trendingEntries = Object.entries(rawTrendingTVShows.trendingTvShows).filter(
      ([, entryValue]) => typeof entryValue !== 'string',
    );

    const tvShowsSections = trendingEntries.map(([trendingKey, trendingItems]) => parseSection(trendingKey as TrendingItemKey, trendingItems.items));

    setTrendingTVShows(tvShowsSections);
  }, [rawTrendingTVShows]);

  useEffect(() => {
    if (rawTrendingTVShows) {
      handleTVShowsSections();
    }
  }, [rawTrendingTVShows]);

  return {
    trendingTVShows,
  };
};

export default useTrendingMovies;
