import React, { useEffect } from 'react';

import { RecentSearchesListItem } from './recent-searchers-list-item/RecentSearchesListItem';
import * as Styles from './RecentSearches.styles';
import { SearchItem, SearchType } from '../../types';
import { useRecentSearches } from './use-recent-searches';

type RecentSearchesProps = {
  onPressItem: (item: SearchItem) => void;
  searchType: SearchType;
};

export const RecentSearches = (props: RecentSearchesProps) => {
  const recentSearches = useRecentSearches({
    searchType: props.searchType,
  });

  useEffect(() => {
    recentSearches.load();
  }, []);

  if (!recentSearches.items.length) {
    return null;
  }

  return (
    <Styles.Wrapper testID="recent-searches-list">
      <Styles.RecentText testID="recent-searches-title">
        {recentSearches.texts.recentSearches}
      </Styles.RecentText>
      {recentSearches.items.map(recentSearch => (
        <RecentSearchesListItem
          onPressRemove={() => recentSearches.remove(recentSearch.id ?? -1)}
          onPressItem={() => props.onPressItem(recentSearch)}
          key={recentSearch.id}
          item={recentSearch}
        />
      ))}
    </Styles.Wrapper>
  );
};
