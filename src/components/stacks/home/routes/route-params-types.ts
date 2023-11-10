import { Routes } from '@/navigation';

import { FamousDetailsProps } from '../../common-screens/famous-details/routes/route-params-types';
import { SearchProps } from '../../common-screens/search/types';

export type HomeStackRoutes = {
  [Routes.Home.SEARCH_MOVIE]: SearchProps;
  [Routes.Home.SEARCH_TV_SHOW]: SearchProps;
  [Routes.Home.TV_SHOW_DETAILS]: undefined;
  [Routes.Home.FAMOUS_DETAILS]: FamousDetailsProps;
  [Routes.Home.MOVIE_DETAILS]: undefined;
  [Routes.Home.IMAGES_GALLERY]: undefined;
};
