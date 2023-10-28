import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { Routes } from '@navigation';

export type FamousStackRoutes = {
  [Routes.Famous.FAMOUS]: undefined;
};

/** Famous-Props */
export type FamousNavigationProp = StackNavigationProp<
  FamousStackRoutes,
  Routes.Famous.FAMOUS
>;
export type FamousRouteProp = RouteProp<
  FamousStackRoutes,
  Routes.Famous.FAMOUS
>;
export type FamousProps = StackScreenProps<
  FamousStackRoutes,
  Routes.Famous.FAMOUS
>;
