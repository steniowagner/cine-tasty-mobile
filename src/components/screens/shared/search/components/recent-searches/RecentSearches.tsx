import React from 'react';
import { FlatList, Text } from 'react-native';
import styled from 'styled-components';

import { SearchType } from 'types/schema';
import metrics from 'styles/metrics';

import RecentSearchListItem from './RecentSearchesListItem';
import useRecentSearches from './useRecentSearches';

const RecentText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Bold;
`;

type Props = {
  onPressItem: (id: number) => void;
  searchType: SearchType;
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
      <RecentText>{t('translations:search:recent')}</RecentText>
      )}
      renderItem={({ item }) => (
        <RecentSearchListItem
          onPressRemove={() => onRemoveItem(item)}
          onPressItem={() => onPressItem(item.id)}
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
