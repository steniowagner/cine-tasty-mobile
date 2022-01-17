import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {TVShowDetailParams} from '@components/screens/shared/media-detail/tv-show-detail/routes/route-params-types';
import {MovieDetailParams} from '@components/screens/shared/media-detail/movie-detail/routes/route-params-types';
import {SearchParams} from '@components/screens/shared/search/routes/route-params-types';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

type HomeStackParams = {
  [Routes.Home.HOME]: undefined;
  [Routes.Home.MEDIA_DETAILS_VIEW_ALL]: MediaSectionViewAllProps;
  [Routes.TVShow.DETAILS]: TVShowDetailParams;
  [Routes.Movie.DETAILS]: MovieDetailParams;
  [Routes.Search.SEARCH_STACK]: SearchParams;
  [Routes.Settings.SETTINGS]: undefined;
  [Routes.Settings.IMAGES_QUALITY]: undefined;
  [Routes.Settings.OPEN_SOURCE]: undefined;
  [Routes.Settings.LANGUAGE]: undefined;
  [Routes.Settings.THEME]: undefined;
  [Routes.Settings.ABOUT]: undefined;
};

type MediaSectionViewAllProps = {
  initialDataset: Types.SimplifiedMedia[];
  sectionKey: Types.TrendingMediaItemKey;
  headerTitle: string;
  isMovie: boolean;
};

/** Home-Stack-Props */
export type HomeStackNavigationProp = StackNavigationProp<
  HomeStackParams,
  Routes.Home.HOME
>;
export type HomeStackRouteProp = RouteProp<HomeStackParams, Routes.Home.HOME>;

export type HomeStackProps = {
  navigation: HomeStackNavigationProp;
  route: HomeStackRouteProp;
};

/** MedialSectionViewAll-Stack-Props */
export type MediaSectionViewAllStackNavigationProp = StackNavigationProp<
  HomeStackParams,
  Routes.Home.MEDIA_DETAILS_VIEW_ALL
>;
export type MediaSectionViewAllStackRouteProp = RouteProp<
  HomeStackParams,
  Routes.Home.MEDIA_DETAILS_VIEW_ALL
>;

export type MediaSectionViewAllStackProps = {
  navigation: MediaSectionViewAllStackNavigationProp;
  route: MediaSectionViewAllStackRouteProp;
};
