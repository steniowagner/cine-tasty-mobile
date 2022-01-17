import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {DefaultTheme} from 'styled-components/native';

import {TVShowDetailParams} from '@components/screens/shared/media-detail/tv-show-detail/routes/route-params-types';
import {MovieDetailParams} from '@components/screens/shared/media-detail/movie-detail/routes/route-params-types';
import {FamousDetailParams} from '@components/screens/shared/famous-detail/routes/route-params-types';
import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

type SearchStackParams = {
  [Routes.TVShow.DETAILS]: TVShowDetailParams;
  [Routes.Famous.DETAILS]: FamousDetailParams;
  [Routes.Movie.DETAILS]: MovieDetailParams;
  [Routes.Search.SEARCH]: SearchParams;
};

export type SearchParams = {
  i18nQueryByPaginationErrorRef: string;
  i18nSearchBarPlaceholderRef: string;
  i18nQueryByTextErrorRef: string;
  searchType: SchemaTypes.SearchType;
  queryId: Types.CineTastyQuery;
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
