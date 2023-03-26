import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {FamousStackParams} from '@src/components/screens/famous/routes/route-params-types';
import {HomeStackParams} from '@src/components/screens/home/routes/route-params-types';
import {checkIsHomeStack} from '@routes/constants';
import {Routes} from '@routes/routes';

type StackParams = FamousStackParams & HomeStackParams;

type Route = Routes.Famous.MOVIE_DETAILS | Routes.Home.MOVIE_DETAILS;

export type MovieDetailsNavigationProp = StackNavigationProp<
  StackParams,
  Route
>;

export type MovieDetailsRouteProp = RouteProp<StackParams, Route>;

export type MovieDetailsNavigationProps = {
  navigation: MovieDetailsNavigationProp;
  route: MovieDetailsRouteProp;
};

export type MovieDetailsParams = {
  voteAverage?: number;
  genreIds?: string[];
  posterPath: string;
  voteCount?: number;
  title: string;
  id: number;
};

export const getRouteName = (rootParent: string) =>
  checkIsHomeStack(rootParent)
    ? Routes.Famous.MOVIE_DETAILS
    : Routes.Home.MOVIE_DETAILS;
