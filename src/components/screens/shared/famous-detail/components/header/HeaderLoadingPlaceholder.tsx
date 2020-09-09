import React, { useCallback } from 'react';
import { View } from 'react-native';
import styled, { DefaultTheme, withTheme } from 'styled-components';

import LoadingPlaceholder from 'components/common/loading-placeholder/LoadingPlaceholder';
import metrics from 'styles/metrics';

import { DEFAULT_MARGIN_VERTICAL_PERCENTAGE } from './InfoText';
import {
  DEFAULT_BORDER_RADIUSIMAGE_SIZE_PERCENTAGE,
  DEFAULT_IMAGE_SIZE_PERCENTAGE,
} from './profile-image/ProfileImage';

const LoadingWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const TextLoadingWrapper = styled(View)`
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;

type Props = {
  theme: DefaultTheme;
};

const HeaderLoadingPlaceholder = ({ theme }: Props) => {
  const TextLoadingPlaceholder = useCallback(
    (index: number, withMarginVertical: boolean = false) => (
      <LoadingPlaceholder
        colors={theme.colors.loadingColors}
        indexToDelayAnimation={index}
        style={{
          marginVertical: withMarginVertical
            ? metrics.getWidthFromDP(DEFAULT_MARGIN_VERTICAL_PERCENTAGE)
            : 0,
          width: metrics.getWidthFromDP('60%'),
          borderRadius: metrics.height,
          height: metrics.largeSize,
        }}
      />
    ),
    [theme],
  );

  return (
    <LoadingWrapper
      testID="loading-header-placeholder"
    >
      <LoadingPlaceholder
        colors={theme.colors.loadingColors}
        indexToDelayAnimation={0}
        style={{
          width: metrics.getWidthFromDP(DEFAULT_IMAGE_SIZE_PERCENTAGE),
          height: metrics.getWidthFromDP(DEFAULT_IMAGE_SIZE_PERCENTAGE),
          borderRadius: metrics.getWidthFromDP(
            DEFAULT_BORDER_RADIUSIMAGE_SIZE_PERCENTAGE,
          ),
        }}
      />
      <TextLoadingWrapper>
        {TextLoadingPlaceholder(1)}
        {TextLoadingPlaceholder(2, true)}
        {TextLoadingPlaceholder(3)}
      </TextLoadingWrapper>
    </LoadingWrapper>
  );
};

export default withTheme(HeaderLoadingPlaceholder);
