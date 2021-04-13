/* eslint-disable camelcase */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import { HomeSection } from '@local-types';

import parseTrendingToSimplifiedMedia from './parseTrendingToSimplifiedMedia';

type Props = {
  rawTrendingTVShows: SchemaTypes.TrendingTVShows;
};

type State = {
  trendingTVShows: HomeSection[];
};

type TrendingItemKey = keyof Omit<
  SchemaTypes.TrendingTVShows_trendingTvShows,
  '__typename'
>;

const useTrendingMovies = ({ rawTrendingTVShows }: Props): State => {
  const [trendingTVShows, setTrendingTVShows] = useState<HomeSection[]>([]);

  const { t } = useTranslation();

  const parseSection = useCallback(
    (
      trendingItemKey: TrendingItemKey,
      dataset: SchemaTypes.TrendingTVShow[],
    ): HomeSection => {
      const sectionMapping: Record<TrendingItemKey, Omit<HomeSection, 'data'>> = {
        onTheAir: {
          viewAllTitle: t(TRANSLATIONS.HOME_TRENDING_TV_SHOWS_ON_THE_AIR_VIEW_ALL),
          sectionTitle: t(TRANSLATIONS.HOME_TRENDING_TV_SHOWS_ON_THE_AIR),
          id: 'onTheAir',
        },
        airingToday: {
          viewAllTitle: t(TRANSLATIONS.HOME_TRENDING_TV_SHOWS_AIRING_TODAY_VIEW_ALL),
          sectionTitle: t(TRANSLATIONS.HOME_TRENDING_TV_SHOWS_AIRING_TODAY),
          id: 'airingToday',
        },
        popular: {
          viewAllTitle: t(TRANSLATIONS.HOME_TRENDING_TV_SHOWS_POPULAR_VIEW_ALL),
          sectionTitle: t(TRANSLATIONS.HOME_TRENDING_TV_SHOWS_POPULAR),
          id: 'popular',
        },
        topRated: {
          viewAllTitle: t(TRANSLATIONS.HOME_TRENDING_TV_SHOWS_TOP_RATED_VIEW_ALL),
          sectionTitle: t(TRANSLATIONS.HOME_TRENDING_TV_SHOWS_TOP_RATED),
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
