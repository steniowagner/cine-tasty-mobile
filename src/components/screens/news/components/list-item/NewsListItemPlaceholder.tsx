import React from 'react';

import ShimmerPlaceHolder from '../../../../common/ShimmerPlaceholder';
import Metrics from '../../../../../styles/metrics';
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
          height: Metrics.getWidthFromDP('15%'),
          marginBottom: Metrics.mediumSize,
        }}
      />
      <ShimmerPlaceHolder
        style={{
          width: '100%',
          height: Metrics.getWidthFromDP('7.5%'),
        }}
      />
    </TextPlaceholderWrapper>
  </Wrapper>
);

export default NewsListItemPlaceholder;
