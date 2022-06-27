import React from 'react';

import * as SchemaTypes from '@schema-types';

import {RecentSearchesListItem} from './recent-searchers-list-item/RecentSearchesListItem';
import {useRecentSearches} from './useRecentSearches';
import * as Styles from './RecentSearches.styles';

type RecentSearchesProps = {
  searchType: SchemaTypes.SearchType;
};

export const RecentSearches = (props: RecentSearchesProps) => {
  const recentSearches = useRecentSearches({
    shouldSkipGetInitialRecentSearches: false,
    searchType: props.searchType,
  });

  if (!recentSearches.items.length) {
    return null;
  }

  return (
    <Styles.Wrapper testID="recent-searches-list">
      <Styles.RecentText>{recentSearches.texts.searchRecent}</Styles.RecentText>
      {recentSearches.items.map(recentSearch => (
        <RecentSearchesListItem
          onPressItem={() => recentSearches.onPressItem(recentSearch)}
          onPressRemove={() => recentSearches.remove(recentSearch)}
          key={recentSearch.id}
          item={recentSearch}
        />
      ))}
    </Styles.Wrapper>
  );
};
