/* eslint-disable react/display-name */

import React, { useLayoutEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import PopupAdvice from 'components/common/popup-advice/PopupAdvice';
import SearchBar from 'components/common/searchbar/SearchBar';
import { SearchType } from 'types/schema';

import { SearchStackParams } from '../../routes/route-params-types';
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

  switch (route.params.searchType) {
    case SearchType.PERSON:
      return (
        <>
          <FamousSearch
            onPressHeaderReloadButton={onPressHeaderReloadButton}
            onPressFooterReloadButton={onPressFooterReloadButton}
            hasPaginationError={hasPaginationError}
            onEndReached={onEndReached}
            errorMessage={errorMessage}
            isPaginating={isPaginating}
            isLoading={isLoading}
            items={items}
          />
          {!!errorMessage && (
          <PopupAdvice
            text={errorMessage}
          />
          )}
        </>
      );

    default:
      return null;
  }
};

export default Search;
