import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import metrics from '@styles/metrics';

import LoadingPlaceholder from '../loading-placeholder/LoadingPlaceholder';
import {
  MEDIA_IMAGE_DEFAULT_BORDER_RADIUS,
  MEDIA_IMAGE_DEFAULT_MARGIN_BOTTOM,
  MEDIA_IMAGE_DEFAULT_HEIGHT,
  MEDIA_IMAGE_DEFAULT_WIDTH,
  WRAPPER_DEFAULT_WIDTH,
  WRAPPER_DEFAULT_HEIGHT,
} from './SimplifiedMediaListItem';

type WrapperStyleProps = {
  isFirst?: boolean;
};

const Wrapper = styled(View)<WrapperStyleProps>`
  width: ${({ theme }) => theme.metrics.getWidthFromDP(WRAPPER_DEFAULT_WIDTH)}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP(WRAPPER_DEFAULT_HEIGHT)}px;
  margin-right: ${({ theme }) => theme.metrics.largeSize}px;
  margin-left: ${({ isFirst, theme }) => {
    if (isFirst) {
      return theme.metrics.largeSize;
    }

    return 0;
  }}px;
`;

type Props = {
  indexToDelayAnimation: number;
  isFirst: boolean;
};

const SimplifiedMediaListItemLoadingPlaceholder = ({
  indexToDelayAnimation,
  isFirst,
}: Props) => (
  <Wrapper
    isFirst={isFirst}
  >
    <LoadingPlaceholder
      style={{
        width: MEDIA_IMAGE_DEFAULT_WIDTH,
        height: MEDIA_IMAGE_DEFAULT_HEIGHT,
        borderRadius: metrics.getWidthFromDP(MEDIA_IMAGE_DEFAULT_BORDER_RADIUS),
        marginBottom: metrics.getWidthFromDP(MEDIA_IMAGE_DEFAULT_MARGIN_BOTTOM),
      }}
      indexToDelayAnimation={indexToDelayAnimation}
    />
    <LoadingPlaceholder
      style={{
        width: '80%',
        height: metrics.mediumSize,
        borderRadius: metrics.height,
      }}
      indexToDelayAnimation={indexToDelayAnimation}
    />
    <LoadingPlaceholder
      style={{
        width: '50%',
        height: metrics.mediumSize,
        marginTop: metrics.smallSize,
        borderRadius: metrics.height,
      }}
      indexToDelayAnimation={indexToDelayAnimation}
    />
  </Wrapper>
);

export default SimplifiedMediaListItemLoadingPlaceholder;
