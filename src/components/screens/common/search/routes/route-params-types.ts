import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {HomeStackRoutes} from '@src/components/screens/home/routes/route-params-types';
import {FamousStackRoutes} from '@src/components/screens/famous/routes/route-params-types';

import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

export type SearchParams = {
  searchType: SchemaTypes.SearchType;
  queryId: Types.CineTastyQuery;
  searchByTextError: string;
  paginationError: string;
  placeholder: string;
};

type StackParams = HomeStackRoutes & FamousStackRoutes;

type Route =
  | Routes.Home.SEARCH_MOVIE
  | Routes.Home.SEARCH_TV_SHOW
  | Routes.Famous.DETAILS;

export type SearchRouteProp = RouteProp<StackParams, Route>;

export type SearchNavigationProp = StackNavigationProp<StackParams, Route>;
