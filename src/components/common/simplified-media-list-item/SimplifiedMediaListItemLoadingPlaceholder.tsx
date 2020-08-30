import React from 'react';
import { View } from 'react-native';
import styled, { DefaultTheme, withTheme } from 'styled-components';

import metrics from 'styles/metrics';

import LoadingPlaceholder from '../loading-placeholder/LoadingPlaceholder';
import {
  MEDIA_IMAGE_DEFAULT_BORDER_RADIUS,
  MEDIA_IMAGE_DEFAULT_MARGIN_BOTTOM,
  MEDIA_IMAGE_DEFAULT_HEIGHT,
  MEDIA_IMAGE_DEFAULT_WIDTH,
  WRAPPER_DEFAULT_WIDTH,
  WRAPPER_DEFAULT_HEIGHT,
} from './SimplifiedMediaListItem';

const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP(WRAPPER_DEFAULT_WIDTH)}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP(WRAPPER_DEFAULT_HEIGHT)}px;
`;

type Props = {
  indexToDelayAnimation: number;
  theme: DefaultTheme;
};

const SimplifiedMediaListItemLoadingPlaceholder = ({
  indexToDelayAnimation,
  theme,
}: Props) => (
  <Wrapper>
    <LoadingPlaceholder
      style={{
        width: MEDIA_IMAGE_DEFAULT_WIDTH,
        height: MEDIA_IMAGE_DEFAULT_HEIGHT,
        borderRadius: metrics.getWidthFromDP(MEDIA_IMAGE_DEFAULT_BORDER_RADIUS),
        marginBottom: metrics.getWidthFromDP(MEDIA_IMAGE_DEFAULT_MARGIN_BOTTOM),
      }}
      colors={theme.colors.loadingColors}
      indexToDelayAnimation={indexToDelayAnimation}
    />
    <LoadingPlaceholder
      style={{
        width: '80%',
        height: metrics.mediumSize,
        borderRadius: metrics.height,
      }}
      colors={theme.colors.loadingColors}
      indexToDelayAnimation={indexToDelayAnimation}
    />
    <LoadingPlaceholder
      style={{
        width: '50%',
        height: metrics.mediumSize,
        marginTop: metrics.smallSize,
        borderRadius: metrics.height,
      }}
      colors={theme.colors.loadingColors}
      indexToDelayAnimation={indexToDelayAnimation}
    />
  </Wrapper>
);

export default withTheme(SimplifiedMediaListItemLoadingPlaceholder);
