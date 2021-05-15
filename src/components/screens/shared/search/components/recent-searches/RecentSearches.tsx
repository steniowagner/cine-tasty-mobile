import React from 'react';
import { FlatList } from 'react-native';

import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import * as Types from '@local-types';
import metrics from '@styles/metrics';

import RecentSearchListItem from './recent-searchers-list-item/RecentSearchesListItem';
import useRecentSearches from './useRecentSearches';
import * as Styles from './RecentSearches.styles';

type RecentSearchesProps = {
  onPressItem: (recentSearchItem: Types.RecentSearchItem) => void;
  searchType: SchemaTypes.SearchType;
};

const RecentSearches = (props: RecentSearchesProps) => {
  const recentSearches = useRecentSearches({
    shouldSkipGetInitialRecentSearches: false,
    searchType: props.searchType,
  });

  return (
    <FlatList
      style={{
        height: '100%',
        position: 'absolute',
      }}
      contentContainerStyle={{
        paddingHorizontal: metrics.mediumSize,
        paddingTop: metrics.largeSize,
      }}
      ListHeaderComponent={() => recentSearches.data.length > 0 && (
      <Styles.RecentText>
        {recentSearches.t(TRANSLATIONS.SEARCH_RECENT)}
      </Styles.RecentText>
      )}
      renderItem={({ item }) => (
        <RecentSearchListItem
          onPressRemove={() => recentSearches.onRemoveItem(item)}
          onPressItem={() => props.onPressItem(item)}
          item={item}
        />
      )}
      keyExtractor={({ id }) => `${id}`}
      testID="recent-searches-list"
      data={recentSearches.data}
    />
  );
};

export default RecentSearches;
