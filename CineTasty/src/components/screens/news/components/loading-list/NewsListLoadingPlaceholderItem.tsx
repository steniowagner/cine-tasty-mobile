import React from 'react';
import { DefaultTheme, withTheme } from 'styled-components';

import LoadingPlaceholder from 'components/common/loading-placeholder/LoadingPlaceholder';
import metrics from 'styles/metrics';

import {
  TextWrapper as TextPlaceholderWrapper,
  LoadingWrapper,
  imageWrapper,
} from '../list-item/common-styles';

type Props = {
  theme: DefaultTheme;
};

const textPlaceholderStyle = {
  width: '100%',
  height: metrics.getWidthFromDP('8%'),
  borderRadius: metrics.extraSmallSize,
};

const NewsListItemPlaceholder = ({ theme }: Props) => (
  <LoadingWrapper
    testID="news-list-item"
  >
    <LoadingPlaceholder
      colors={theme.colors.loadingColors}
      style={imageWrapper}
    />
    <TextPlaceholderWrapper>
      <LoadingPlaceholder
        colors={theme.colors.loadingColors}
        style={{
          marginBottom: metrics.mediumSize,
          ...textPlaceholderStyle,
        }}
      />
      <LoadingPlaceholder
        colors={theme.colors.loadingColors}
        style={textPlaceholderStyle}
      />
    </TextPlaceholderWrapper>
  </LoadingWrapper>
);

export default withTheme(NewsListItemPlaceholder);
