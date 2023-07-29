import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {HomeStackRoutes} from '@src/components/screens/home/routes/route-params-types';
import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

export type SearchMediaParams = {
  searchType: SchemaTypes.SearchType;
  queryId: Types.CineTastyQuery;
  searchByTextError: string;
  paginationError: string;
  placeholder: string;
};

type Routes = Routes.Home.SEARCH_MOVIE | Routes.Home.SEARCH_TV_SHOW;

export type SearchMediaRouteProp = RouteProp<HomeStackRoutes, Routes>;

export type SearchMediaNavigationProp = StackNavigationProp<
  HomeStackRoutes,
  Routes
>;
