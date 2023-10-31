import { StackNavigationProp } from '@react-navigation/stack';

import { Routes } from '@navigation';

export type FamousStackRoutes = {
  [Routes.Famous.TRENDING_FAMOUS]: undefined;
  [Routes.Famous.DETAILS]: undefined;
  [Routes.Famous.SEARCH]: undefined;
};

/** Trending-Famous-Props */
export type FamousNavigationProp = StackNavigationProp<
  FamousStackRoutes,
  Routes.Famous.TRENDING_FAMOUS
>;
