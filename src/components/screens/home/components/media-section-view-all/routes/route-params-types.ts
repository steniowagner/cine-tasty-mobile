import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import * as Types from '@local-types';
import {Routes} from '@routes/routes';

import {HomeStackRoutes} from '../../../routes/route-params-types';

export type MediaSectionViewAllStackNavigationProp = StackNavigationProp<
  HomeStackRoutes,
  Routes.Home.MEDIA_DETAILS_VIEW_ALL
>;

export type MediaSectionViewAllStackRouteProp = RouteProp<
  HomeStackRoutes,
  Routes.Home.MEDIA_DETAILS_VIEW_ALL
>;

export type MediaSectionViewAllProps = {
  navigation: MediaSectionViewAllStackNavigationProp;
  route: MediaSectionViewAllStackRouteProp;
};

export type MediaSectionViewAllParams = {
  initialDataset: Types.SimplifiedMedia[];
  sectionKey: Types.TrendingMediaItemKey;
  headerTitle: string;
  isMovie: boolean;
};
