import React, { useCallback } from 'react';

import LoadingPlaceholder from '@components/common/loading-placeholder/LoadingPlaceholder';
import metrics from '@styles/metrics';

import { DEFAULT_MARGIN_VERTICAL } from '../InfoText';
import * as Styles from './HeaderLoadingPlaceholder.styles';

const HeaderLoadingPlaceholder = () => {
  const TextLoadingPlaceholder = useCallback(
    (withMarginVertical: boolean = false) => (
      <LoadingPlaceholder
        style={{
          marginVertical: withMarginVertical ? DEFAULT_MARGIN_VERTICAL : 0,
          width: metrics.getWidthFromDP('60%'),
          borderRadius: metrics.height,
          height: metrics.largeSize,
        }}
      />
    ),
    [],
  );

  return (
    <Styles.LoadingWrapper
      testID="loading-header-placeholder"
    >
      <Styles.TextLoadingWrapper>
        {TextLoadingPlaceholder()}
        {TextLoadingPlaceholder(true)}
        {TextLoadingPlaceholder()}
      </Styles.TextLoadingWrapper>
    </Styles.LoadingWrapper>
  );
};

export default HeaderLoadingPlaceholder;
