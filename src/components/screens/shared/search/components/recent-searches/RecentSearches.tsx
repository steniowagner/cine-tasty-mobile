import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

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

const RecentSearches = ({onPressItem, searchType}: RecentSearchesProps) => {
  const {onRemoveItem, recentSearches, t} = useRecentSearches({
    shouldSkipGetInitialRecentSearches: false,
    searchType,
  });

  return (
    <RecentSearchesList
      contentContainerStyle={{
        paddingHorizontal: metrics.mediumSize,
        paddingTop: metrics.largeSize,
      }}
      ListHeaderComponent={() =>
        recentSearches.length > 0 && (
          <Styles.RecentText>{t(TRANSLATIONS.SEARCH_RECENT)}</Styles.RecentText>
        )
      }
      renderItem={({item}) => (
        <RecentSearchListItem
          onPressRemove={() => onRemoveItem(item)}
          onPressItem={() => onPressItem(item)}
          item={item}
        />
      )}
      keyExtractor={({id}) => `${id}`}
      testID="recent-searches-list"
      data={recentSearches}
    />
  );
};

const RecentSearchesList = styled(FlatList)`
  height: 100%;
  position: absolute;
`;

export default RecentSearches;
