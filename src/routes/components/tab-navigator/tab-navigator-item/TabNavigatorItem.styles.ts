import {TouchableOpacity, Platform, Text} from 'react-native';
import styled from 'styled-components/native';

type WrapperButtonProps = {
  width: number;
};

type ItemTextProps = {
  color: string;
};

export const Wrapper = styled(TouchableOpacity)<WrapperButtonProps>`
  width: ${({width}) => width}px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const ItemText = styled(Text)<ItemTextProps>`
  margin-top: ${({theme}) =>
    Platform.OS === 'android' ? theme.metrics.extraSmallSize : 0}px;
  font-family: CircularStd-Medium;
  color: ${({color}) => color};
  font-size: ${({theme}) => theme.metrics.mediumSize * 1.1}px;
`;
