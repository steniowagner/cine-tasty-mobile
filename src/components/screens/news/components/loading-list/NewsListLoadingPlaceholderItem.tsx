import React from 'react';

import LoadingPlaceholder from '@components/common/loading-placeholder/LoadingPlaceholder';
import metrics from '@styles/metrics';

import {
  TextWrapper as TextPlaceholderWrapper,
  LoadingWrapper,
  imageWrapper,
} from '../list-item/common-styles';

const textPlaceholderStyle = {
  width: '100%',
  height: metrics.getWidthFromDP('8%'),
  borderRadius: metrics.extraSmallSize,
};

type Props = {
  index: number;
};

const NewsListItemPlaceholder = ({ index }: Props) => (
  <LoadingWrapper
    testID="news-list-item"
  >
    <LoadingPlaceholder
      style={imageWrapper}
      indexToDelayAnimation={index}
    />
    <TextPlaceholderWrapper>
      <LoadingPlaceholder
        style={{
          marginBottom: metrics.mediumSize,
          ...textPlaceholderStyle,
        }}
        indexToDelayAnimation={index}
      />
      <LoadingPlaceholder
        style={textPlaceholderStyle}
      />
    </TextPlaceholderWrapper>
  </LoadingWrapper>
);

export default NewsListItemPlaceholder;
