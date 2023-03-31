import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {HomeStackRoutes} from '@src/components/screens/home/routes/route-params-types';
import * as Types from '@local-types';
import {Routes} from '@routes/routes';

type StackParams = HomeStackRoutes;

type Route = Routes.Home.MEDIA_DETAILS_VIEW_ALL;

export type MediaSectionViewAllNavigationProp = StackNavigationProp<
  StackParams,
  Route
>;

export type MediaSectionViewAllRouteProp = RouteProp<StackParams, Route>;

export type MediaSectionViewAllProps = {
  navigation: MediaSectionViewAllNavigationProp;
  route: MediaSectionViewAllRouteProp;
};

export type MediaSectionViewAllParams = {
  initialDataset: Types.SimplifiedMedia[];
  sectionKey: Types.TrendingMediaItemKey;
  headerTitle: string;
  isMovie: boolean;
};
