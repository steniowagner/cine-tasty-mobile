import React from 'react';

import LoadingPlaceholder from '@components/common/loading-placeholder/LoadingPlaceholder';
import metrics from '@styles/metrics';

import * as NewsListItemStyles from '../list-item/NewsListItem.styles';
import * as Styles from './NewsListLoadingPlaceholderItem.styles';

type NewsListItemPlaceholderProps = {
  index: number;
};

const NewsListItemPlaceholder = ({ index }: NewsListItemPlaceholderProps) => (
  <NewsListItemStyles.LoadingWrapper
    testID="news-list-item"
  >
    <LoadingPlaceholder
      style={NewsListItemStyles.imageWrapper}
      indexToDelayAnimation={index}
    />
    <NewsListItemStyles.TextWrapper>
      <LoadingPlaceholder
        style={{
          marginBottom: metrics.mediumSize,
          ...Styles.textPlaceholderStyle,
        }}
        indexToDelayAnimation={index}
      />
      <LoadingPlaceholder
        style={Styles.textPlaceholderStyle}
      />
    </NewsListItemStyles.TextWrapper>
  </NewsListItemStyles.LoadingWrapper>
);

export default NewsListItemPlaceholder;
