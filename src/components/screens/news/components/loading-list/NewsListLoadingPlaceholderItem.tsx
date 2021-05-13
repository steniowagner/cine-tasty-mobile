import React from 'react';

import LoadingPlaceholder from '@components/common/loading-placeholder/LoadingPlaceholder';
import metrics from '@styles/metrics';

import * as NewsListItemStyles from '../list-item/NewsListItem.styles';
import * as Styles from './NewsListLoadingPlaceholderItem.styles';

type NewsListItemPlaceholderProps = {
  index: number;
};

const NewsListItemPlaceholder = (props: NewsListItemPlaceholderProps) => (
  <NewsListItemStyles.LoadingWrapper
    testID="news-list-item"
  >
    <LoadingPlaceholder
      style={NewsListItemStyles.imageWrapper}
      indexToDelayAnimation={props.index}
    />
    <NewsListItemStyles.TextWrapper>
      <LoadingPlaceholder
        style={{
          marginBottom: metrics.mediumSize,
          ...Styles.textPlaceholderStyle,
        }}
        indexToDelayAnimation={props.index}
      />
      <LoadingPlaceholder
        style={Styles.textPlaceholderStyle}
      />
    </NewsListItemStyles.TextWrapper>
  </NewsListItemStyles.LoadingWrapper>
);

export default NewsListItemPlaceholder;
