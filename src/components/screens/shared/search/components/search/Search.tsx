import React, { useLayoutEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import PopupAdvice from 'components/common/popup-advice/PopupAdvice';
// @ts-ignore
import SearchBar from 'components/common/searchbar/SearchBar';
import Advise from 'components/common/advise/Advise';
import {
  SearchPerson_search_items_BasePerson as SearchPersonResult,
  SearchMovie_search_items_BaseMovie as SearchMovieResult,
  SearchType,
} from 'types/schema';

import { SearchStackParams } from '../../routes/route-params-types';
import RecentSearches from '../recent-searches/RecentSearches';
import FamousSearch from '../famous-search/FamousSearch';
import MediaSearch from '../media-search/MediaSearch';
import usePressHandlers from './usePressHandlers';
import useSearch from './use-search/useSearch';

type SearchScreenNavigationProp = StackNavigationProp<SearchStackParams, 'SEARCH'>;

type SearchScreenRouteProp = RouteProp<SearchStackParams, 'SEARCH'>;

type Props = {
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
};

const Search = ({ navigation, route }: Props) => {
  const {
    onPressFooterReloadButton,
    shouldShowEmptyListAdvise,
    onPressHeaderReloadButton,
    shouldShowRecentSearches,
    hasPaginationError,
    onTypeSearchQuery,
    onEndReached,
    isPaginating,
    errorMessage,
    isLoading,
    items,
    t,
  } = useSearch({
    i18nQueryByPaginationErrorRef: route.params.i18nQueryByPaginationErrorRef,
    i18nQueryByTextErrorRef: route.params.i18nQueryByTextErrorRef,
    searchType: route.params.searchType,
    query: route.params.query,
  });

  const { onPressRecentSearchItem, onPressListItem } = usePressHandlers({
    searchType: route.params.searchType,
    navigation,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      header: () => (
        <SearchBar
          placeholder={t(route.params.i18nSearchBarPlaceholderRef)}
          onPressClose={() => navigation.goBack()}
          onTypeSearchQuery={onTypeSearchQuery}
        />
      ),
    });
  }, [onTypeSearchQuery]);

  return (
    <>
      {shouldShowEmptyListAdvise && (
        <Advise
          description={t('translations:news:emptyList:description')}
          suggestion={t('translations:news:emptyList:suggestion')}
          title={t('translations:news:emptyList:title')}
          icon="alert-box"
        />
      )}
      {route.params.searchType === SearchType.PERSON && (
        <FamousSearch
          onPressHeaderReloadButton={onPressHeaderReloadButton}
          onPressFooterReloadButton={onPressFooterReloadButton}
          hasPaginationError={hasPaginationError}
          items={items as SearchPersonResult[]}
          onPressListItem={onPressListItem}
          onEndReached={onEndReached}
          errorMessage={errorMessage}
          isPaginating={isPaginating}
          isLoading={isLoading}
        />
      )}
      {route.params.searchType === SearchType.MOVIE && (
        <MediaSearch
          onPressHeaderReloadButton={onPressHeaderReloadButton}
          onPressFooterReloadButton={onPressFooterReloadButton}
          hasPaginationError={hasPaginationError}
          items={items as SearchMovieResult[]}
          onPressListItem={onPressListItem}
          onEndReached={onEndReached}
          errorMessage={errorMessage}
          isPaginating={isPaginating}
          isLoading={isLoading}
        />
      )}
      {shouldShowRecentSearches && (
        <RecentSearches
          onPressItem={onPressRecentSearchItem}
          searchType={route.params.searchType}
        />
      )}
      {!!errorMessage && (
      <PopupAdvice
        text={errorMessage}
      />
      )}
    </>
  );
};

export default Search;
