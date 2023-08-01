import {StackNavigationProp} from '@react-navigation/stack';

import {FamousStackRoutes} from '@src/components/screens/famous/routes/route-params-types';
import {Routes} from '@routes/routes';

type Route = Routes.Famous.DETAILS;

export type SearchFamousNavigationProp = StackNavigationProp<
  FamousStackRoutes,
  Route
>;
