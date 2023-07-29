import React, {useEffect} from 'react';

import {FamousList} from '@components';

import {SearchBar} from '../components/searchbar/SearchBar';
import {useSearchFamous} from './useSearchFamous';

export const SearchFamous = () => {
  const searchFamous = useSearchFamous();

  useEffect(() => {
    searchFamous.navigation.setOptions({
      header: () => (
        <SearchBar
          onTypeSearchQuery={searchFamous.onTypeSearchQuery}
          onPressClose={searchFamous.onPressClose}
          placeholder={searchFamous.placeholder}
        />
      ),
    });
  }, [searchFamous.onTypeSearchQuery]);

  return (
    <FamousList
      onPressBottomReloadButton={searchFamous.onPressBottomReloadButton}
      beforePressItem={searchFamous.beforePressItem}
      onPressTopReloadButton={searchFamous.onPressTopReloadButton}
      hasPaginationError={searchFamous.hasPaginationError}
      onEndReached={searchFamous.onEndReached}
      isPaginating={searchFamous.isPaginating}
      famous={searchFamous.famous}
      isLoading={searchFamous.isLoading}
      error={searchFamous.error}
    />
  );
};
