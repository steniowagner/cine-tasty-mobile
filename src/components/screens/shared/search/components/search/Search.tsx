/* eslint-disable react/display-name */

import React, { useLayoutEffect, useCallback, useMemo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import PopupAdvice from 'components/common/popup-advice/PopupAdvice';
// @ts-ignore
import SearchBar from 'components/common/searchbar/SearchBar';
import Advise from 'components/common/advise/Advise';
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
    navigation.navigate('FAMOUS_DETAIL', {
      id: item.id,
    });
  }, []);

  const onPressListItem = useCallback(async (item: SearchItem) => {
    persistItemToRecentSearches(item);

    if (isSearchingFamous) {
      onNavigateToFamousDetailScreen(item);
    }
  }, []);

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
