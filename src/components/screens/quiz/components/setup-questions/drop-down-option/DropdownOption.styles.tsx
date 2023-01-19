import {TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';

export const ICON_SIZE = metrics.getWidthFromDP('7%');

export const InnerContentWrapper = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({theme}) => theme.metrics.mediumSize}px;
  border-radius: ${({theme}) => theme.metrics.smallSize}px;
  background-color: ${({theme}) => theme.colors.inputBackground};
`;

export const OptionText = styled(Text)`
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Medium;
  color: ${({theme}) => theme.colors.text};
`;
