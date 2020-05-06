import React from 'react';

import ShimmerPlaceHolder from 'components/common/ShimmerPlaceholder';
import metrics from 'styles/metrics';

import {
  TextWrapper as TextPlaceholderWrapper,
  imageWrapper,
  Wrapper,
} from './common-styles';

const NewsListItemPlaceholder = () => (
  <Wrapper>
    <ShimmerPlaceHolder
      style={imageWrapper}
    />
    <TextPlaceholderWrapper>
      <ShimmerPlaceHolder
        style={{
          width: '100%',
          height: metrics.getWidthFromDP('15%'),
          marginBottom: metrics.mediumSize,
        }}
      />
      <ShimmerPlaceHolder
        style={{
          width: '100%',
          height: metrics.getWidthFromDP('7.5%'),
        }}
      />
    </TextPlaceholderWrapper>
  </Wrapper>
);

export default NewsListItemPlaceholder;
