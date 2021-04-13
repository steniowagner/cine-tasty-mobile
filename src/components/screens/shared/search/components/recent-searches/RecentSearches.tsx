import React from 'react';
import { FlatList, Text } from 'react-native';
import styled from 'styled-components';

import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import * as Types from '@local-types';
import metrics from '@styles/metrics';

import RecentSearchListItem from './RecentSearchesListItem';
import useRecentSearches from './useRecentSearches';

const RecentText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Bold;
`;

type Props = {
  onPressItem: (recentSearchItem: Types.RecentSearchItem) => void;
  searchType: SchemaTypes.SearchType;
};

const RecentSearches = ({ onPressItem, searchType }: Props) => {
  const { onRemoveItem, recentSearches, t } = useRecentSearches({
    shouldSkipGetInitialRecentSearches: false,
    searchType,
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
      ListHeaderComponent={() => recentSearches.length > 0 && (
      <RecentText>{t(TRANSLATIONS.SEARCH_RECENT)}</RecentText>
      )}
      renderItem={({ item }) => (
        <RecentSearchListItem
          onPressRemove={() => onRemoveItem(item)}
          onPressItem={() => onPressItem(item)}
          item={item}
        />
      )}
      keyExtractor={({ id }) => `${id}`}
      testID="recent-searches-list"
      data={recentSearches}
    />
  );
};

export default RecentSearches;
