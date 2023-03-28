import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {FamousStackRoutes} from '@src/components/screens/famous/routes/route-params-types';
import {HomeStackRoutes} from '@src/components/screens/home/routes/route-params-types';
import {checkIsHomeStack} from '@routes/constants';
import {Routes} from '@routes/routes';

type StackParams = FamousStackRoutes & HomeStackRoutes;

type Route = Routes.Famous.DETAILS | Routes.Home.FAMOUS_DETAILS;

export type FamousDetailsNavigationProp = StackNavigationProp<
  StackParams,
  Route
>;

export type FamousDetailsRouteProp = RouteProp<StackParams, Route>;

export type FamousDetailsProps = {
  navigation: FamousDetailsNavigationProp;
  route: FamousDetailsRouteProp;
};

export type FamousDetailsParams = {
  profileImage: string;
  name: string;
  id: number;
};

export const getRouteName = (rootParent: string) =>
  checkIsHomeStack(rootParent)
    ? Routes.Home.FAMOUS_DETAILS
    : Routes.Famous.DETAILS;
