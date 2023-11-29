import { Routes } from '@/navigation';

import { FamousDetailsProps } from '../../common-screens/famous-details/routes/route-params-types';
import { SearchProps } from '../../common-screens/search/types';
import { ImagesGalleryNavigationProps } from '../../common-screens/images-gallery/routes/route-params-types';
import { TVShowDetailsNavigationProps } from '../../common-screens/media-details/tv-show-details/routes/route-params-types';
import { TVShowSeasonNavigationProps } from '../../common-screens/tv-show-season/routes/route-params-types';

export type HomeStackRoutes = {
  [Routes.Home.SEARCH_MOVIE]: SearchProps;
  [Routes.Home.SEARCH_TV_SHOW]: SearchProps;
  [Routes.Home.TV_SHOW_DETAILS]: TVShowDetailsNavigationProps;
  [Routes.Home.FAMOUS_DETAILS]: FamousDetailsProps;
  [Routes.Home.MOVIE_DETAILS]: undefined;
  [Routes.Home.IMAGES_GALLERY]: ImagesGalleryNavigationProps;
  [Routes.Home.TV_SHOW_SEASON]: TVShowSeasonNavigationProps;
};
