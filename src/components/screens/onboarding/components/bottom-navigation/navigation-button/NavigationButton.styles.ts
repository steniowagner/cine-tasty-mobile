import {TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(TouchableOpacity)`
  background-color: #111111;
  border-radius: ${({theme}) => theme.metrics.height}px;
  padding-horizontal: ${({theme}) => theme.metrics.getWidthFromDP('8%')}px;
  padding-vertical: ${({theme}) => theme.metrics.largeSize}px;
  align-items: center;
`;

export const ButtonText = styled(Text)`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Bold;
`;
