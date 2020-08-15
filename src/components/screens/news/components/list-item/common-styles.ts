import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import metrics from 'styles/metrics';

export const Wrapper = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

export const LoadingWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

export const TextWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('54%')}px;
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;

export const imageWrapper = {
  width: metrics.getWidthFromDP('35%'),
  height: metrics.getWidthFromDP('30%'),
  borderRadius: 8,
};
