/* eslint-disable react/display-name */

import React, { useLayoutEffect, useCallback, useMemo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import PopupAdvice from 'components/common/popup-advice/PopupAdvice';
import SearchBar from 'components/common/searchbar/SearchBar';
import { SearchType } from 'types/schema';
import { SearchItem } from 'types';

import useRecentSearches from '../recent-searches/useRecentSearches';
import { SearchStackParams } from '../../routes/route-params-types';
import RecentSearches from '../recent-searches/RecentSearches';
import FamousSearch from '../famous-search/FamousSearch';
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

  const { persistItemToRecentSearches } = useRecentSearches({
    shouldSkipGetInitialRecentSearches: true,
    searchType: route.params.searchType,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <SearchBar
          placeholder={t(route.params.i18nSearchBarPlaceholderRef)}
          onPressClose={() => navigation.goBack()}
          onTypeSearchQuery={onTypeSearchQuery}
        />
      ),
    });
  }, [onTypeSearchQuery]);

  const isSearchingFamous = useMemo(() => route.params.searchType === SearchType.PERSON, [
    route.params.searchType,
  ]);

  const onNavigateToFamousDetailScreen = useCallback((item: SearchItem) => {
    console.log('NAVIGATE TO FAMOUS-DETAIL CARRYING: ', item.id, item.title, item.image);
  }, []);

  const onPressListItem = useCallback(async (item: SearchItem) => {
    persistItemToRecentSearches(item);

    if (isSearchingFamous) {
      onNavigateToFamousDetailScreen(item);
    }
  }, []);

  return (
    <>
      {isSearchingFamous && (
        <FamousSearch
          onPressHeaderReloadButton={onPressHeaderReloadButton}
          onPressFooterReloadButton={onPressFooterReloadButton}
          hasPaginationError={hasPaginationError}
          onPressListItem={onPressListItem}
          onEndReached={onEndReached}
          errorMessage={errorMessage}
          isPaginating={isPaginating}
          isLoading={isLoading}
          items={items}
        />
      )}
      {shouldShowRecentSearches && (
        <RecentSearches
          onPressItem={onNavigateToFamousDetailScreen}
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
