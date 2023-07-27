import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {ImagesGalleryParams} from '@src/components/screens/common/images-gallery/routes/route-params-types';
import {TVShowDetailParams} from '@src/components/screens/common/media-details/tv-show-detail/routes/route-params-types';
import {MovieDetailsParams} from '@src/components/screens/common/media-details/movie-details/routes/route-params-types';
import {SeasonsDetailsParams} from '@src/components/screens/common/media-details/seasons/routes/route-params-types';
import {FamousDetailsParams} from '@src/components/screens/common/famous-details/routes/route-params-types';
import {Routes} from '@routes/routes';

import {MediaSectionViewAllParams} from '../components/media-section-view-all/routes/route-params-types';
import {ReviewsParams} from '../../common/reviews/routes/route-params-types';

export type HomeStackRoutes = {
  [Routes.Home.HOME]: undefined;
  [Routes.Home.MEDIA_DETAILS_VIEW_ALL]: MediaSectionViewAllParams;
  [Routes.Home.TV_SHOW_DETAILS]: TVShowDetailParams;
  [Routes.Home.TV_SHOW_SEASONS]: SeasonsDetailsParams;
  [Routes.Home.FAMOUS_DETAILS]: FamousDetailsParams;
  [Routes.Home.MOVIE_DETAILS]: MovieDetailsParams;
  [Routes.Home.IMAGES_GALLERY]: ImagesGalleryParams;
  [Routes.Home.MOVIE_DETAILS]: MovieDetailsParams;
  [Routes.Home.SEARCH_MOVIE]: undefined;
  [Routes.Home.SEARCH_TV_SHOW]: undefined;
  [Routes.Home.MEDIA_REVIEWS]: ReviewsParams;
  [Routes.Home.SETTINGS_IMAGES_QUALITY]: undefined;
  [Routes.Home.SETTINGS_OPEN_SOURCE]: undefined;
  [Routes.Home.SETTINGS_LANGUAGE]: undefined;
  [Routes.Home.SETTINGS_THEME]: undefined;
  [Routes.Home.SETTINGS_ABOUT]: undefined;
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
