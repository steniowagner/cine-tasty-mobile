/* eslint-disable camelcase */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  TrendingTVShows_trendingTvShows as TrendingTVShowsSection,
  TrendingTVShows,
  TrendingTVShow,
} from 'types/schema';
import { HomeSection } from 'types';

import parseTrendingToSimplifiedMedia from './parseTrendingToSimplifiedMedia';

export const ON_THE_AIR_VIEW_ALL_TITLE_i18N_REF = 'translations:home:trendingTvShows:onTheAirViewAllTitle';
export const ON_THE_AIR_SECTION_TITLE_i18N_REF = 'translations:home:trendingTvShows:onTheAir';

export const POPULAR_VIEW_ALL_TITLE_i18N_REF = 'translations:home:trendingTvShows:popularViewAllTitle';
export const POPULAR_SECTION_TITLE_i18N_REF = 'translations:home:trendingTvShows:popular';

export const TOP_RATED_VIEW_ALL_TITLE_i18N_REF = 'translations:home:trendingTvShows:topRatedViewAllTitle';
export const TOP_RATED_SECTION_TITLE_i18N_REF = 'translations:home:trendingTvShows:topRated';

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
          viewAllTitle: t('translations:home:trendingTvShows:onTheAirViewAllTitle'),
          sectionTitle: t('translations:home:trendingTvShows:onTheAir'),
          id: 'onTheAir',
        },
        popular: {
          viewAllTitle: t('translations:home:trendingTvShows:popularViewAllTitle'),
          sectionTitle: t('translations:home:trendingTvShows:popular'),
          id: 'popular',
        },
        topRated: {
          viewAllTitle: t('translations:home:trendingTvShows:topRatedViewAllTitle'),
          sectionTitle: t('translations:home:trendingTvShows:topRated'),
          id: 'topRated',
        },
      };

      if (!sectionMapping[trendingItemKey]) {
        return {
          viewAllTitle: '',
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
