import React from 'react';
import { FlatList } from 'react-native';

import metrics from 'styles/metrics';

import NewsListLoadingPlaceholderItem from '../list-item/NewsListLoadingPlaceholderItem';
import { imageWrapper } from '../list-item/common-styles';

export const INITIAL_ITEMS_TO_RENDER = Math.floor(metrics.height / imageWrapper.height) - 1;

const newsLoadingItems = Array(INITIAL_ITEMS_TO_RENDER)
  .fill(0)
  .map((item, index) => `${index}`);

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
