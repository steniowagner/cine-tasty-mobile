import React from 'react';

import FamousList from '@components/common/famous-list/FamousList';
import * as SchemaTypes from '@schema-types';

import useSearchFamous from './useSearchFamous';

type SearchFamousProps = {
  dataset: SchemaTypes.SearchPerson_search_items_BasePerson[];
  onPressTopReloadButton: () => Promise<void>;
  onPressBottomReloadButton: () => void;
  hasPaginationError: boolean;
  onEndReached: () => void;
  isPaginating: boolean;
  isLoading: boolean;
  error: string;
};

const SearchFamous = (props: SearchFamousProps) => {
  const searchFamous = useSearchFamous({dataset: props.dataset});
  return (
    <FamousList
      onPressBottomReloadButton={props.onPressBottomReloadButton}
      beforePressItem={searchFamous.persistToRecentSearches}
      onPressTopReloadButton={props.onPressTopReloadButton}
      hasPaginationError={props.hasPaginationError}
      onEndReached={props.onEndReached}
      isPaginating={props.isPaginating}
      famous={searchFamous.famous}
      isLoading={props.isLoading}
      error={props.error}
    />
  );
};

export default SearchFamous;
