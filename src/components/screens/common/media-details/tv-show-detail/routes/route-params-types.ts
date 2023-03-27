import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {FamousStackParams} from '@src/components/screens/famous/routes/route-params-types';
import {HomeStackParams} from '@src/components/screens/home/routes/route-params-types';
import {checkIsHomeStack} from '@routes/constants';
import {Routes} from '@routes/routes';

type StackParams = FamousStackParams & HomeStackParams;

type Route =
  | Routes.Famous.TV_SHOW_DETAILS_DETAILS
  | Routes.Home.TV_SHOW_DETAILS_DETAILS;

export type TVShowDetailsProps = {
  navigation: StackNavigationProp<StackParams, Route>;
  route: RouteProp<StackParams, Route>;
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
    ? Routes.Home.TV_SHOW_DETAILS_DETAILS
    : Routes.Famous.TV_SHOW_DETAILS_DETAILS;
