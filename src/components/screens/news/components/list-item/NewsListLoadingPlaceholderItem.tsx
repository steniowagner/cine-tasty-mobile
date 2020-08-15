import React from 'react';
import { DefaultTheme, withTheme } from 'styled-components';

import LoadingPlaceholder from 'components/common/loading-placeholder/LoadingPlaceholder';
import metrics from 'styles/metrics';

import {
  TextWrapper as TextPlaceholderWrapper,
  LoadingWrapper,
  imageWrapper,
} from './common-styles';

type Props = {
  theme: DefaultTheme;
  index: number;
};

const textPlaceholderStyle = {
  width: '100%',
  height: metrics.getWidthFromDP('8%'),
  borderRadius: metrics.extraSmallSize,
};

const NewsListItemPlaceholder = ({ index, theme }: Props) => (
  <LoadingWrapper
    testID="news-list-item"
  >
    <LoadingPlaceholder
      colors={theme.colors.loadingColors}
      indexToDelayAnimation={index}
      style={imageWrapper}
    />
    <TextPlaceholderWrapper>
      <LoadingPlaceholder
        colors={theme.colors.loadingColors}
        style={{
          marginBottom: metrics.mediumSize,
          ...textPlaceholderStyle,
        }}
        indexToDelayAnimation={index}
      />
      <LoadingPlaceholder
        colors={theme.colors.loadingColors}
        style={textPlaceholderStyle}
        indexToDelayAnimation={index}
      />
    </TextPlaceholderWrapper>
  </LoadingWrapper>
);

export default withTheme(NewsListItemPlaceholder);
