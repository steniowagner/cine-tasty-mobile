import React from 'react';

import { LoadingPlaceholder } from '@common-components';
import metrics from '@styles/metrics';

import * as NewsListItemStyles from '../news-list-item/NewsListItem.styles';
import { imageWrapper } from '../news-list-item/NewsListItem.styles';
import * as Styles from './NewsLoading.styles';

export const INITIAL_ITEMS_TO_RENDER = Math.floor(
  metrics.height / imageWrapper.height,
);

const newsLoadingItems = Array(INITIAL_ITEMS_TO_RENDER)
  .fill(0)
  .map((_, index) => `${index}`);

export const NewsLoading = () => (
  <Styles.LoadingList testID="news-loading-list">
    {newsLoadingItems.map((newsLoadingItem, index) => (
      <NewsListItemStyles.LoadingWrapper
        key={newsLoadingItem}
        testID="news-loading-list-item">
        <LoadingPlaceholder
          style={NewsListItemStyles.imageWrapper}
          indexToDelayAnimation={index}
        />
        <NewsListItemStyles.TextWrapper>
          <LoadingPlaceholder
            style={{
              marginBottom: metrics.md,
              ...Styles.sheet.placeholder,
            }}
            indexToDelayAnimation={index}
          />
          <LoadingPlaceholder style={Styles.sheet.placeholder} />
        </NewsListItemStyles.TextWrapper>
      </NewsListItemStyles.LoadingWrapper>
    ))}
  </Styles.LoadingList>
);
