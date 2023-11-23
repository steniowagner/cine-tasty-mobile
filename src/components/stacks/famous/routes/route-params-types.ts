import { StackNavigationProp } from '@react-navigation/stack';

import { Routes } from '@navigation';

import { FamousDetailsProps } from '../../common-screens/famous-details/routes/route-params-types';
import { SearchProps } from '../../common-screens/search/types';
import { ImagesGalleryNavigationProps } from '../../common-screens/images-gallery/routes/route-params-types';
import { TVShowDetailsNavigationProps } from '../../common-screens/media-details/tv-show-details/routes/route-params-types';

export type FamousStackRoutes = {
  [Routes.Famous.TRENDING_FAMOUS]: undefined;
  [Routes.Famous.DETAILS]: FamousDetailsProps;
  [Routes.Famous.SEARCH_FAMOUS]: SearchProps;
  [Routes.Famous.TV_SHOW_DETAILS]: TVShowDetailsNavigationProps;
  [Routes.Famous.MOVIE_DETAILS]: undefined;
  [Routes.Famous.IMAGES_GALLERY]: ImagesGalleryNavigationProps;
};

/** Trending-Famous-Props */
export type FamousNavigationProp = StackNavigationProp<
  FamousStackRoutes,
  Routes.Famous.TRENDING_FAMOUS
>;
