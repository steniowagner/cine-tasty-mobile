import React from 'react';
import { FlatList } from 'react-native';

import metrics from '@styles/metrics';

import NewsListLoadingPlaceholderItem from './NewsListLoadingPlaceholderItem';
import * as NewsListItemStyles from '../list-item/NewsListItem.styles';

export const INITIAL_ITEMS_TO_RENDER = Math.floor(metrics.height / NewsListItemStyles.imageWrapper.height) - 1;

const newsLoadingItems = Array(INITIAL_ITEMS_TO_RENDER)
  .fill(0)
  .map((_, index) => `${index}`);

const NewsLoading = () => (
  <FlatList
    style={{
      flex: 1,
    }}
    renderItem={({ index }) => (
      <NewsListLoadingPlaceholderItem
        index={index}
      />
    )}
    keyExtractor={(item) => item}
    testID="news-loading-list"
    data={newsLoadingItems}
    scrollEnabled={false}
  />
);

export default NewsLoading;
