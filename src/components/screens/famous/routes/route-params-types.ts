import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {TVShowDetailParams} from '@src/components/screens/common/media-details/tv-show-detail/routes/route-params-types';
import {MovieDetailsParams} from '@src/components/screens/common/media-details/movie-details/routes/route-params-types';
import {ImagesGalleryParams} from '@src/components/screens/common/images-gallery/routes/route-params-types';
import {FamousDetailsParams} from '@src/components/screens/common/famous-details/routes/route-params-types';
import {SearchParams} from '@src/components/screens/common/search/routes/route-params-types';
import {ReviewsParams} from '@src/components/screens/common/reviews/routes/route-params-types';
import {SeasonsDetailsParams} from '@src/components/screens/common/media-details/seasons/routes/route-params-types';
import {Routes} from '@routes/routes';

export type FamousStackRoutes = {
  [Routes.Famous.FAMOUS]: FamousProps;
  [Routes.Famous.DETAILS]: FamousDetailsParams;
  [Routes.Famous.IMAGES_GALLERY]: ImagesGalleryParams;
  [Routes.Famous.TV_SHOW_DETAILS_DETAILS]: TVShowDetailParams;
  [Routes.Famous.MOVIE_DETAILS]: MovieDetailsParams;
  [Routes.Famous.TV_SHOW_SEASONS]: SeasonsDetailsParams;
  [Routes.Famous.SEARCH]: SearchParams;
  [Routes.Famous.MEDIA_REVIEWS]: ReviewsParams;
};

type FamousProps = {
  headerTitle: string;
};

export type FamousNavigationProp = StackNavigationProp<
  FamousStackRoutes,
  Routes.Famous.FAMOUS
>;

export type FamousStackProps = {
  navigation: FamousNavigationProp;
  route: RouteProp<FamousStackRoutes, Routes.Famous.FAMOUS>;
};
