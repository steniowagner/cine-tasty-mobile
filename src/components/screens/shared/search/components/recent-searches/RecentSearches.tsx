import React from 'react';

import * as SchemaTypes from '@schema-types';

import RecentSearchListItem from './recent-searchers-list-item/RecentSearchesListItem';
import useRecentSearches from './useRecentSearches';
import * as Styles from './RecentSearches.styles';

type RecentSearchesProps = {
  searchType: SchemaTypes.SearchType;
};

const RecentSearches = (props: RecentSearchesProps) => {
  const recentSearches = useRecentSearches({
    shouldSkipGetInitialRecentSearches: false,
    searchType: props.searchType,
  });
  return (
    <Styles.Wrapper testID="recent-searches-list">
      <Styles.RecentText>{recentSearches.texts.searchRecent}</Styles.RecentText>
      {recentSearches.items.map(recentSearch => (
        <RecentSearchListItem
          onPressItem={() => recentSearches.onPressItem(recentSearch)}
          onPressRemove={() => recentSearches.remove(recentSearch)}
          key={recentSearch.id}
          item={recentSearch}
        />
      ))}
    </Styles.Wrapper>
  );
};

export default RecentSearches;
