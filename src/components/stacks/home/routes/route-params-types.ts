import { Routes } from '@/navigation';

import { SearchProps } from '../../common-screens/search/types';

export type HomeStackRoutes = {
  [Routes.Home.SEARCH_MOVIE]: SearchProps;
  [Routes.Home.SEARCH_TV_SHOW]: SearchProps;
  [Routes.Home.TV_SHOW_DETAILS]: undefined;
  [Routes.Home.FAMOUS_DETAILS]: undefined;
  [Routes.Home.MOVIE_DETAILS]: undefined;
};
