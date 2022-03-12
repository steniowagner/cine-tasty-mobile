import React, {useLayoutEffect} from 'react';

// @ts-ignore
import SearchBar from '@components/common/searchbar/SearchBar';
import * as SchemaTypes from '@schema-types';

import {SearchStackProps} from '../../routes/route-params-types';
import SearchFamous from './search-famous/SearchFamous';
import useSearch from './useSearch';

const Search = (props: SearchStackProps) => {
  const search = useSearch({
    searchByTextError: props.route.params.searchByTextError,
    paginationError: props.route.params.paginationError,
    searchType: props.route.params.searchType,
    queryId: props.route.params.queryId,
  });

  useLayoutEffect(() => {
    props.navigation.setOptions({
      header: () => (
        <SearchBar
          onTypeSearchQuery={search.onTypeSearchQuery}
          onPressClose={() => props.navigation.goBack()}
          placeholder={props.route.params.placeholder}
        />
      ),
    });
  }, [
    props.route.params.placeholder,
    search.onTypeSearchQuery,
    props.navigation,
  ]);

  return (
    <>
      {props.route.params.searchType === SchemaTypes.SearchType.PERSON && (
        <SearchFamous
          dataset={
            search.dataset as SchemaTypes.SearchPerson_search_items_BasePerson[]
          }
          onPressBottomReloadButton={search.onPressFooterReloadButton}
          onPressTopReloadButton={search.onPressTopReloadButton}
          hasPaginationError={search.hasPaginationError}
          onEndReached={search.onEndReached}
          isPaginating={search.isPaginating}
          isLoading={search.isLoading}
          error={search.error}
        />
      )}
    </>
  );
};

export default Search;
