import { StackNavigationProp } from '@react-navigation/stack';

import { QueryTrendingFamous_trendingFamous_items } from '@schema-types';
import { Routes } from '@navigation';

export type FamousStackRoutes = {
  [Routes.Famous.TRENDING_FAMOUS]: undefined;
  [Routes.Famous.DETAILS]: QueryTrendingFamous_trendingFamous_items;
  [Routes.Famous.SEARCH]: undefined;
};

/** Trending-Famous-Props */
export type FamousNavigationProp = StackNavigationProp<
  FamousStackRoutes,
  Routes.Famous.TRENDING_FAMOUS
>;
