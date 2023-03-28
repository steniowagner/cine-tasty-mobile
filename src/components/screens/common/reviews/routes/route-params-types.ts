import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {FamousStackRoutes} from '@src/components/screens/famous/routes/route-params-types';
import {HomeStackRoutes} from '@src/components/screens/home/routes/route-params-types';
import {checkIsHomeStack} from '@routes/constants';
import {Routes} from '@routes/routes';

type StackParams = FamousStackRoutes & HomeStackRoutes;

type Route = Routes.Famous.MEDIA_REVIEWS | Routes.Home.MEDIA_REVIEWS;

export type Review = {
  content: string;
  author: string;
};

export type ReviewsParams = {
  mediaTitle: string;
  reviews: Review[];
};

export type ReviewsProps = {
  navigation: StackNavigationProp<StackParams, Route>;
  route: RouteProp<StackParams, Route>;
};

export const getRouteName = (rootParent: string) =>
  checkIsHomeStack(rootParent)
    ? Routes.Home.MEDIA_REVIEWS
    : Routes.Famous.MEDIA_REVIEWS;
