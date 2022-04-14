import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {TVShowDetailParams} from '@src/components/screens/common/media-detail/tv-show-detail/routes/route-params-types';
import {MovieDetailParams} from '@src/components/screens/common/media-detail/movie-detail/routes/route-params-types';
import {ImagesGalleryRouteProp} from '@src/components/screens/common/images-gallery/routes/route-params-types';
import {FamousDetailsParams} from '@src/components/screens/common/famous-details/routes/route-params-types';
import {SearchParams} from '@src/components/screens/common/search/routes/route-params-types';
import {Routes} from '@routes/routes';

type FamousStackParams = {
  [Routes.ImagesGallery.IMAGES_GALLERY]: ImagesGalleryRouteProp;
  [Routes.Famous.DETAILS]: FamousDetailsParams;
  [Routes.TVShow.DETAILS]: TVShowDetailParams;
  [Routes.Movie.DETAILS]: MovieDetailParams;
  [Routes.Search.SEARCH_STACK]: SearchParams;
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
export type FamousRouteProp = RouteProp<
  FamousStackParams,
  Routes.Famous.FAMOUS
>;

export type FamousStackProps = {
  navigation: FamousNavigationProp;
  route: FamousRouteProp;
};
