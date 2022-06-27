import {TouchableOpacity, Text, View} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(TouchableOpacity)`
  flex-direction: row;
  margin-top: ${({theme}) => theme.metrics.mediumSize}px;
  margin-right: ${({theme}) => theme.metrics.mediumSize}px;

  border-radius: ${({theme}) => theme.metrics.height}px;
  padding-horizontal: ${({theme}) => theme.metrics.largeSize}px;
  padding-vertical: ${({theme}) => theme.metrics.smallSize}px;
  background-color: ${({theme}) => theme.colors.primary};
  align-items: center;
  align-self: flex-start;
`;

export const DefaultText = styled(Text)`
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.buttonText};
  font-family: CircularStd-Bold;
`;

export const GapSpace = styled(View)`
  width: ${({theme}) => theme.metrics.extraSmallSize}px;
  height: 1px;
`;
