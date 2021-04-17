import {
  TouchableOpacity, Animated, View, Text,
} from 'react-native';
import styled from 'styled-components';

type WrapperStyleProps = {
  opacity: number;
  width: number;
};

type DynamicWidthStyleProps = {
  width: number;
};

export const Wrapper = styled(View)<WrapperStyleProps>`
  width: ${({ width }) => width}px;
  border-radius: ${({ theme }) => theme.metrics.height}px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  opacity: ${({ opacity }) => opacity};
`;

export const SwitcherIndicator = styled(Animated.View)<DynamicWidthStyleProps>`
  width: ${({ width }) => width}px;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.height}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: ${({ theme }) => `${theme.metrics.extraSmallSize}px solid ${theme.colors.secondary}`};
  position: absolute;
`;

export const OptionText = styled(Text)`
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
`;

export const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const OptionButton = styled(TouchableOpacity)<DynamicWidthStyleProps>`
  width: ${({ width }) => width}px;
  justify-content: center;
  align-items: center;
`;
