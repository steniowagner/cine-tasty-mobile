/* eslint-disable camelcase */
import React, { useLayoutEffect } from 'react';

import PopupAdvice from '@components/common/popup-advice/PopupAdvice';
// @ts-ignore
import SearchBar from '@components/common/searchbar/SearchBar';
import Advise from '@components/common/advise/Advise';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';

import { SearchStackProps } from '../../routes/route-params-types';
import RecentSearches from '../recent-searches/RecentSearches';
import FamousSearch from '../famous-search/FamousSearch';
import MediaSearch from '../media-search/MediaSearch';
import usePressHandlers from './usePressHandlers';
import useSearch from './use-search/useSearch';

type FamousSearchPress = (item: SchemaTypes.SearchPerson_search_items_BasePerson) => void;
type FamousSearchItems = SchemaTypes.SearchPerson_search_items_BasePerson[];

type TVShowSearchPress = (item: SchemaTypes.SearchTVShow_search_items_BaseTVShow) => void;
type TVShowSearchItems = SchemaTypes.SearchTVShow_search_items_BaseTVShow[];

type MovieSearchPress = (item: SchemaTypes.SearchMovie_search_items_BaseMovie) => void;
type MovieSearchItems = SchemaTypes.SearchMovie_search_items_BaseMovie[];

const Search = ({ navigation, route }: SearchStackProps) => {
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
    queryId: route.params.queryId,
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
      {route.params.searchType === SchemaTypes.SearchType.PERSON && (
        <FamousSearch
          onPressListItem={onPressListItem as FamousSearchPress}
          onPressHeaderReloadButton={onPressHeaderReloadButton}
          onPressFooterReloadButton={onPressFooterReloadButton}
          hasPaginationError={hasPaginationError}
          items={items as FamousSearchItems}
          onEndReached={onEndReached}
          errorMessage={errorMessage}
          isPaginating={isPaginating}
          isLoading={isLoading}
        />
      )}
      {route.params.searchType === SchemaTypes.SearchType.MOVIE && (
        <MediaSearch
          onPressHeaderReloadButton={onPressHeaderReloadButton}
          onPressFooterReloadButton={onPressFooterReloadButton}
          onPressListItem={onPressListItem as MovieSearchPress}
          hasPaginationError={hasPaginationError}
          items={items as MovieSearchItems}
          onEndReached={onEndReached}
          errorMessage={errorMessage}
          isPaginating={isPaginating}
          isLoading={isLoading}
        />
      )}
      {route.params.searchType === SchemaTypes.SearchType.TV && (
        <MediaSearch
          items={items as TVShowSearchItems}
          onPressListItem={onPressListItem as TVShowSearchPress}
          onPressHeaderReloadButton={onPressHeaderReloadButton}
          onPressFooterReloadButton={onPressFooterReloadButton}
          hasPaginationError={hasPaginationError}
          onEndReached={onEndReached}
          errorMessage={errorMessage}
          isPaginating={isPaginating}
          isLoading={isLoading}
        />
      )}
      {shouldShowEmptyListAdvise && (
        <Advise
          description={t(TRANSLATIONS.SEARCH_EMPTY_LIST_DESCRIPTION)}
          suggestion={t(TRANSLATIONS.SEARCH_EMPTY_LIST_SUGGESTION)}
          title={t(TRANSLATIONS.SEARCH_EMPTY_LIST_TITLE)}
          icon="alert-box"
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
