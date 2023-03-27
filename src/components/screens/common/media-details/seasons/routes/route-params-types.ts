import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {FamousStackRoutes} from '@src/components/screens/famous/routes/route-params-types';
import {HomeStackRoutes} from '@src/components/screens/home/routes/route-params-types';
import {checkIsHomeStack} from '@routes/constants';
import {Routes} from '@routes/routes';

type StackParams = FamousStackRoutes & HomeStackRoutes;

type Route = Routes.Famous.TV_SHOW_SEASONS | Routes.Home.TV_SHOW_SEASONS;

export type SeasonsProps = {
  navigation: StackNavigationProp<StackParams, Route>;
  route: RouteProp<StackParams, Route>;
};

export type SeasonsDetailsParams = {
  numberOfSeasons: number;
  title: string;
  id: string;
};

export const getRouteName = (rootParent: string) =>
  checkIsHomeStack(rootParent)
    ? Routes.Famous.TV_SHOW_SEASONS
    : Routes.Home.TV_SHOW_SEASONS;
