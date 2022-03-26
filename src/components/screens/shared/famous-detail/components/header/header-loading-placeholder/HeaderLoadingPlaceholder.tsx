import React from 'react';

import {LoadingPlaceholder} from '@components/common';
import metrics from '@styles/metrics';

import * as Styles from './HeaderLoadingPlaceholder.styles';
import {DEFAULT_MARGIN_VERTICAL} from '../InfoText';

const HeaderLoadingPlaceholder = () => (
  <Styles.LoadingWrapper testID="loading-header-placeholder">
    <Styles.TextLoadingWrapper>
      <LoadingPlaceholder
        style={{
          width: metrics.getWidthFromDP('60%'),
          borderRadius: metrics.height,
          height: metrics.largeSize,
        }}
      />
      <LoadingPlaceholder
        style={{
          marginVertical: DEFAULT_MARGIN_VERTICAL,
          width: metrics.getWidthFromDP('60%'),
          borderRadius: metrics.height,
          height: metrics.largeSize,
        }}
      />
      <LoadingPlaceholder
        style={{
          width: metrics.getWidthFromDP('60%'),
          borderRadius: metrics.height,
          height: metrics.largeSize,
        }}
      />
    </Styles.TextLoadingWrapper>
  </Styles.LoadingWrapper>
);

export default HeaderLoadingPlaceholder;
