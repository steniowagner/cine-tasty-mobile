import React from 'react';

import metrics from '@styles/metrics';

import NewsListLoadingPlaceholderItem from './NewsListLoadingPlaceholderItem';
import {imageWrapper} from '../list-item/NewsListItem.styles';
import * as Styles from './NewsLoading.styles';

export const INITIAL_ITEMS_TO_RENDER =
  Math.floor(metrics.height / imageWrapper.height) - 1;

const newsLoadingItems = Array(INITIAL_ITEMS_TO_RENDER)
  .fill(0)
  .map((_, index) => `${index}`);

const NewsLoading = () => (
  <Styles.LoadingList testID="news-loading-list">
    {newsLoadingItems.map((newsLoadingItem, index) => (
      <NewsListLoadingPlaceholderItem index={index} key={newsLoadingItem} />
    ))}
  </Styles.LoadingList>
);

export default NewsLoading;
