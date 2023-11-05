import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

import { Routes } from '@navigation';

import { FamousStackRoutes } from '../../famous/routes/route-params-types';
import { HomeStackRoutes } from '../../home/routes/route-params-types';

export enum SearchType {
  MOVIE = 'MOVIE',
  FAMOUS = 'FAMOUS',
  TV = 'TV',
}

export type SearchItem = {
  title?: string | null;
  image?: string | null;
  id?: number | null;
};

type SearchStack = FamousStackRoutes & HomeStackRoutes;

type SearchEntryRoutes =
  | Routes.Famous.SEARCH_FAMOUS
  | Routes.Home.SEARCH_MOVIE
  | Routes.Home.SEARCH_TV_SHOW;

export type SearchNavigationProps = StackScreenProps<
  SearchStack,
  SearchEntryRoutes
>;

export type SearchNavigationProp = StackNavigationProp<
  SearchStack,
  SearchEntryRoutes
>;

export type SearchProps = {
  type: SearchType;
};
