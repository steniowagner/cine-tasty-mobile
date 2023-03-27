import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {ImagesGalleryParams} from '@src/components/screens/common/images-gallery/routes/route-params-types';
import {TVShowDetailParams} from '@src/components/screens/common/media-details/tv-show-detail/routes/route-params-types';
import {MovieDetailsParams} from '@src/components/screens/common/media-details/movie-details/routes/route-params-types';
import {SeasonsDetailsParams} from '@src/components/screens/common/media-details/seasons/routes/route-params-types';
import {FamousDetailsParams} from '@src/components/screens/common/famous-details/routes/route-params-types';
import {SearchParams} from '@src/components/screens/common/search/routes/route-params-types';
import {Routes} from '@routes/routes';

import {MediaSectionViewAllParams} from '../components/media-section-view-all/routes/route-params-types';
import {ReviewsParams} from '../../common/reviews/routes/route-params-types';

export type HomeStackRoutes = {
  [Routes.Home.HOME]: undefined;
  [Routes.Home.MEDIA_DETAILS_VIEW_ALL]: MediaSectionViewAllParams;
  [Routes.Home.TV_SHOW_DETAILS_DETAILS]: TVShowDetailParams;
  [Routes.Home.TV_SHOW_SEASONS]: SeasonsDetailsParams;
  [Routes.Home.FAMOUS_DETAILS]: FamousDetailsParams;
  [Routes.Home.MOVIE_DETAILS]: MovieDetailsParams;
  [Routes.Home.IMAGES_GALLERY]: ImagesGalleryParams;
  [Routes.Home.MOVIE_DETAILS]: MovieDetailsParams;
  [Routes.Home.SEARCH]: SearchParams;
  [Routes.Home.MEDIA_REVIEWS]: ReviewsParams;
  [Routes.Settings.SETTINGS]: undefined;
  [Routes.Settings.IMAGES_QUALITY]: undefined;
  [Routes.Settings.OPEN_SOURCE]: undefined;
  [Routes.Settings.LANGUAGE]: undefined;
  [Routes.Settings.THEME]: undefined;
  [Routes.Settings.ABOUT]: undefined;
};

export type HomeStackNavigationProp = StackNavigationProp<
  HomeStackRoutes,
  Routes.Home.HOME
>;

export type HomeStackRouteProp = RouteProp<HomeStackRoutes, Routes.Home.HOME>;

export type HomeStackProps = {
  navigation: HomeStackNavigationProp;
  route: HomeStackRouteProp;
};
