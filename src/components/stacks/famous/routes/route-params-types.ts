import { StackNavigationProp } from '@react-navigation/stack';

import { QueryTrendingFamous_trendingFamous_items } from '@schema-types';
import { Routes } from '@navigation';

import { SearchProps } from '../../common-screens/search/types';

export type FamousStackRoutes = {
  [Routes.Famous.TRENDING_FAMOUS]: undefined;
  [Routes.Famous.DETAILS]: Omit<
    QueryTrendingFamous_trendingFamous_items,
    '__typename'
  >;
  [Routes.Famous.SEARCH_FAMOUS]: SearchProps;
  [Routes.Famous.TV_SHOW_DETAILS]: undefined;
  [Routes.Famous.MOVIE_DETAILS]: undefined;
};

/** Trending-Famous-Props */
export type FamousNavigationProp = StackNavigationProp<
  FamousStackRoutes,
  Routes.Famous.TRENDING_FAMOUS
>;
