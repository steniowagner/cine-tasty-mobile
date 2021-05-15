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

const Search = (props: SearchStackProps) => {
  const search = useSearch({
    i18nQueryByPaginationErrorRef: props.route.params.i18nQueryByPaginationErrorRef,
    i18nQueryByTextErrorRef: props.route.params.i18nQueryByTextErrorRef,
    searchType: props.route.params.searchType,
    queryId: props.route.params.queryId,
  });

  const pressHandlers = usePressHandlers({
    searchType: props.route.params.searchType,
    navigation: props.navigation,
  });

  useLayoutEffect(() => {
    props.navigation.setOptions({
      // eslint-disable-next-line react/display-name
      header: () => (
        <SearchBar
          placeholder={search.t(props.route.params.i18nSearchBarPlaceholderRef)}
          onPressClose={() => props.navigation.goBack()}
          onTypeSearchQuery={search.onTypeSearchQuery}
        />
      ),
    });
  }, [search.onTypeSearchQuery]);

  return (
    <>
      {props.route.params.searchType === SchemaTypes.SearchType.PERSON && (
        <FamousSearch
          onPressListItem={pressHandlers.onPressListItem as FamousSearchPress}
          onPressHeaderReloadButton={search.onPressHeaderReloadButton}
          onPressFooterReloadButton={search.onPressFooterReloadButton}
          hasPaginationError={search.hasPaginationError}
          items={search.items as FamousSearchItems}
          onEndReached={search.onEndReached}
          errorMessage={search.errorMessage}
          isPaginating={search.isPaginating}
          isLoading={search.isLoading}
        />
      )}
      {props.route.params.searchType === SchemaTypes.SearchType.MOVIE && (
        <MediaSearch
          onPressHeaderReloadButton={search.onPressHeaderReloadButton}
          onPressFooterReloadButton={search.onPressFooterReloadButton}
          onPressListItem={pressHandlers.onPressListItem as MovieSearchPress}
          hasPaginationError={search.hasPaginationError}
          items={search.items as MovieSearchItems}
          onEndReached={search.onEndReached}
          errorMessage={search.errorMessage}
          isPaginating={search.isPaginating}
          isLoading={search.isLoading}
        />
      )}
      {props.route.params.searchType === SchemaTypes.SearchType.TV && (
        <MediaSearch
          items={search.items as TVShowSearchItems}
          onPressListItem={pressHandlers.onPressListItem as TVShowSearchPress}
          onPressHeaderReloadButton={search.onPressHeaderReloadButton}
          onPressFooterReloadButton={search.onPressFooterReloadButton}
          hasPaginationError={search.hasPaginationError}
          onEndReached={search.onEndReached}
          errorMessage={search.errorMessage}
          isPaginating={search.isPaginating}
          isLoading={search.isLoading}
        />
      )}
      {search.shouldShowEmptyListAdvise && (
        <Advise
          description={search.t(TRANSLATIONS.SEARCH_EMPTY_LIST_DESCRIPTION)}
          suggestion={search.t(TRANSLATIONS.SEARCH_EMPTY_LIST_SUGGESTION)}
          title={search.t(TRANSLATIONS.SEARCH_EMPTY_LIST_TITLE)}
          icon="alert-box"
        />
      )}
      {search.shouldShowRecentSearches && (
        <RecentSearches
          onPressItem={pressHandlers.onPressRecentSearchItem}
          searchType={props.route.params.searchType}
        />
      )}
      {!!search.errorMessage && (
      <PopupAdvice
        text={search.errorMessage}
      />
      )}
    </>
  );
};

export default Search;
