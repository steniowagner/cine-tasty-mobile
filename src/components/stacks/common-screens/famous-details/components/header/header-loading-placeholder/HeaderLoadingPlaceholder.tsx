import React from 'react';
import { View } from 'react-native';

import { LoadingPlaceholder } from '@common-components';

import * as Styles from './HeaderLoadingPlaceholder.styles';

export const HeaderLoadingPlaceholder = () => (
  <Styles.LoadingWrapper testID="loading-header-placeholder">
    <View>
      <LoadingPlaceholder style={Styles.styles.loadingItem} />
      <LoadingPlaceholder style={Styles.styles.middleItem} />
      <LoadingPlaceholder style={Styles.styles.loadingItem} />
    </View>
  </Styles.LoadingWrapper>
);
