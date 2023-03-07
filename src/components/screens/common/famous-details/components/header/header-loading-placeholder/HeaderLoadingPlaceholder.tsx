import React from 'react';

import {LoadingPlaceholder} from '@components';

import * as Styles from './HeaderLoadingPlaceholder.styles';

export const HeaderLoadingPlaceholder = () => (
  <Styles.LoadingWrapper testID="loading-header-placeholder">
    <Styles.TextLoadingWrapper>
      <LoadingPlaceholder style={Styles.styles.loadingItem} />
      <LoadingPlaceholder style={Styles.styles.middleItem} />
      <LoadingPlaceholder style={Styles.styles.loadingItem} />
    </Styles.TextLoadingWrapper>
  </Styles.LoadingWrapper>
);
