import { StackNavigationProp } from '@react-navigation/stack';

import { Routes } from '@navigation';

import { FamousDetailsProps } from '../../common-screens/famous-details/routes/route-params-types';
import { SearchProps } from '../../common-screens/search/types';

export type FamousStackRoutes = {
  [Routes.Famous.TRENDING_FAMOUS]: undefined;
  [Routes.Famous.DETAILS]: FamousDetailsProps;
  [Routes.Famous.SEARCH_FAMOUS]: SearchProps;
  [Routes.Famous.TV_SHOW_DETAILS]: undefined;
  [Routes.Famous.MOVIE_DETAILS]: undefined;
  [Routes.Famous.IMAGES_GALLERY]: undefined;
};

/** Trending-Famous-Props */
export type FamousNavigationProp = StackNavigationProp<
  FamousStackRoutes,
  Routes.Famous.TRENDING_FAMOUS
>;
