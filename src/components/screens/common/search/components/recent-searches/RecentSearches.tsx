import React, {useEffect} from 'react';

import {RecentSearchesListItem} from './recent-searchers-list-item/RecentSearchesListItem';
import {
  UseRecentSearchesProps,
  useRecentSearches,
  RecentSearchItem,
} from './useRecentSearches';
import * as Styles from './RecentSearches.styles';

type RecentSearchesProps = UseRecentSearchesProps & {
  onPressItem: (item: RecentSearchItem) => void;
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
      <Styles.RecentText>
        {recentSearches.texts.recentSearches}
      </Styles.RecentText>
      {recentSearches.items.map(recentSearch => (
        <RecentSearchesListItem
          onPressRemove={() => recentSearches.remove(recentSearch.id)}
          onPressItem={() => props.onPressItem(recentSearch)}
          key={recentSearch.id}
          item={recentSearch}
        />
      ))}
    </Styles.Wrapper>
  );
};
