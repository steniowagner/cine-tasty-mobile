import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import Metrics from '../../../../../styles/metrics';

export const Wrapper = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

export const TextWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('49%')}px;
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;

export const imageWrapper = {
  width: Metrics.getWidthFromDP('38%'),
  height: Metrics.getWidthFromDP('32%'),
  borderRadius: 8,
};
