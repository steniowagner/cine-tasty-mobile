import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';

import {DEFAULT_MARGIN_VERTICAL} from '../Header.styles';

const DEFAULT_STYLE = {
  width: metrics.getWidthFromDP('60%'),
  height: metrics.largeSize,
  borderRadius: metrics.height,
};

export const LoadingWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const TextLoadingWrapper = styled(View)`
  margin-left: ${({theme}) => theme.metrics.mediumSize}px;
`;

export const styles = StyleSheet.create({
  loadingItem: DEFAULT_STYLE,
  middleItem: {
    ...DEFAULT_STYLE,
    marginVertical: DEFAULT_MARGIN_VERTICAL,
  },
});
