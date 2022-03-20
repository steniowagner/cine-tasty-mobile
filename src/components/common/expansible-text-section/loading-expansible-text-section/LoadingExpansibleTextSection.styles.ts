import {View} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';
import {CONSTANTS} from '@utils';

export const Wrapper = styled(View)`
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

export const loadingPlaceholderStyle = {
  borderRadius: metrics.extraLargeSize / 2,
  marginBottom: metrics.mediumSize,
  height: metrics.largeSize,
  width: '100%',
};
