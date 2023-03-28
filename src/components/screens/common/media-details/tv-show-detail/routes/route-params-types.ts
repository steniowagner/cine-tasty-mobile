import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {FamousStackRoutes} from '@src/components/screens/famous/routes/route-params-types';
import {HomeStackRoutes} from '@src/components/screens/home/routes/route-params-types';
import {checkIsHomeStack} from '@routes/constants';
import {Routes} from '@routes/routes';

type StackParams = FamousStackRoutes & HomeStackRoutes;

type Route = Routes.Famous.TV_SHOW_DETAILS | Routes.Home.TV_SHOW_DETAILS;

export type TVShowDetailsNavigationProp = StackNavigationProp<
  StackParams,
  Route
>;

export type TVShowDetailsRouteProp = RouteProp<StackParams, Route>;

export type TVShowDetailsProps = {
  navigation: TVShowDetailsNavigationProp;
  route: TVShowDetailsRouteProp;
};

export type TVShowDetailParams = {
  voteAverage?: number;
  genreIds?: string[];
  posterPath: string;
  voteCount?: number;
  title: string;
  id: number;
};

export const getRouteName = (rootParent: string) =>
  checkIsHomeStack(rootParent)
    ? Routes.Home.TV_SHOW_DETAILS
    : Routes.Famous.TV_SHOW_DETAILS;
