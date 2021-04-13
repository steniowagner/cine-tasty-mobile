import React, { useCallback } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import LoadingPlaceholder from '@components/common/loading-placeholder/LoadingPlaceholder';
import metrics from '@styles/metrics';

import { DEFAULT_MARGIN_VERTICAL_PERCENTAGE } from './InfoText';

const LoadingWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const TextLoadingWrapper = styled(View)`
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const HeaderLoadingPlaceholder = () => {
  const TextLoadingPlaceholder = useCallback(
    (withMarginVertical: boolean = false) => (
      <LoadingPlaceholder
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
    [],
  );

  return (
    <LoadingWrapper
      testID="loading-header-placeholder"
    >
      <TextLoadingWrapper>
        {TextLoadingPlaceholder()}
        {TextLoadingPlaceholder(true)}
        {TextLoadingPlaceholder()}
      </TextLoadingWrapper>
    </LoadingWrapper>
  );
};

export default HeaderLoadingPlaceholder;
