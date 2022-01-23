import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';

import NewsListLoadingPlaceholderItem from './NewsListLoadingPlaceholderItem';
import * as NewsListItemStyles from '../list-item/NewsListItem.styles';

export const INITIAL_ITEMS_TO_RENDER =
  Math.floor(metrics.height / NewsListItemStyles.imageWrapper.height) - 1;

const newsLoadingItems = Array(INITIAL_ITEMS_TO_RENDER)
  .fill(0)
  .map((_, index) => `${index}`);

const NewsLoading = () => (
  <LoadingList testID="news-loading-list" scrollEnabled={false} bounces={false}>
    {newsLoadingItems.map((newsLoadingItem, index) => (
      <NewsListLoadingPlaceholderItem index={index} key={newsLoadingItem} />
    ))}
  </LoadingList>
);

const LoadingList = styled(ScrollView)`
  flex: 1;
`;

export default NewsLoading;
