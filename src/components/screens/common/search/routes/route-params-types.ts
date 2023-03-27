import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {DefaultTheme} from 'styled-components/native';

import {TVShowDetailParams} from '@src/components/screens/common/media-details/tv-show-detail/routes/route-params-types';
import {MovieDetailsParams} from '@src/components/screens/common/media-details/movie-details/routes/route-params-types';
import {FamousDetailsParams} from '@src/components/screens/common/famous-details/routes/route-params-types';
import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

type SearchStackParams = {
  [Routes.TVShow.DETAILS]: TVShowDetailParams;
  [Routes.Famous.DETAILS]: FamousDetailsParams;
  [Routes.Movie.DETAILS]: MovieDetailsParams;
  [Routes.Search.SEARCH]: SearchParams;
};

export type SearchParams = {
  searchType: SchemaTypes.SearchType;
  queryId: Types.CineTastyQuery;
  searchByTextError: string;
  paginationError: string;
  placeholder: string;
};

/** Search-Stack-Props */
export type SearchNavigationProp = StackNavigationProp<
  SearchStackParams,
  Routes.Search.SEARCH
>;

export type SearchRouteProp = RouteProp<
  SearchStackParams,
  Routes.Search.SEARCH
>;

export type SearchStackProps = {
  navigation: SearchNavigationProp;
  route: SearchRouteProp;
  theme: DefaultTheme;
};
