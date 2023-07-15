import {TouchableOpacity, Text, View} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';

export const ICON_WIDTH_PERCENTAGE = '6%';

export const iconStyles = {
  marginHorizontal: metrics.mediumSize,
};

export const Wrapper = styled(TouchableOpacity)`
  width: 100%;
  height: ${({theme}) => theme.metrics.getWidthFromDP('16%')}px;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled(Text)`
  font-family: CircularStd-Medium;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.modalTextContent};
`;

export const LineDivider = styled(View)`
  margin-left: ${({theme}) =>
    2 * theme.metrics.mediumSize +
    theme.metrics.getWidthFromDP(ICON_WIDTH_PERCENTAGE)}px;
  height: ${({theme}) => theme.metrics.getWidthFromDP('0.1%')}px;
  background-color: ${({theme}) => theme.colors.modalTextContent};
`;
