import {RouteProp} from '@react-navigation/native';

import {HomeStackRoutes} from '@src/components/screens/home/routes/route-params-types';
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

type StackParams = HomeStackRoutes;

type Route = Routes.Home.SEARCH_MOVIE | Routes.Home.SEARCH_TV_SHOW;

export type SearchRouteProp = RouteProp<StackParams, Route>;
