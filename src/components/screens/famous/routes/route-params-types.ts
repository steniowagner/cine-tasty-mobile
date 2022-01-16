import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { MovieDetailParams } from '@components/screens/shared/media-detail/movie-detail/routes/route-params-types';
import { ImagesGalleryRouteProp } from '@components/screens/shared/images-gallery/routes/route-params-types';
import { FamousDetailParams } from '@components/screens/shared/famous-detail/routes/route-params-types';
import { SearchParams } from '@components/screens/shared/search/routes/route-params-types';
import { Routes } from '@routes/routes';

type FamousStackParams = {
  [Routes.ImagesGallery.IMAGES_GALLERY]: ImagesGalleryRouteProp;
  [Routes.Famous.DETAILS]: FamousDetailParams;
  [Routes.Movie.DETAILS]: MovieDetailParams;
  [Routes.Search.SEARCH]: SearchParams;
  [Routes.Famous.FAMOUS]: FamousProps;
};

type FamousProps = {
  headerTitle: string;
};

/** Famous-Stack-Props */
export type FamousNavigationProp = StackNavigationProp<
  FamousStackParams,
  Routes.Famous.FAMOUS
>;
export type FamousRouteProp = RouteProp<FamousStackParams, Routes.Famous.FAMOUS>;

export type FamousStackProps = {
  navigation: FamousNavigationProp;
  route: FamousRouteProp;
};
