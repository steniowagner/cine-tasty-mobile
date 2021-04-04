import { ActivityIndicator, Animated, View } from 'react-native';
import styled from 'styled-components';

export const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
`;

export const CustomActivityIndicator = styled(ActivityIndicator).attrs(({ theme }) => ({
  color: theme.colors.text,
  size: 'large',
}))``;

export const ImageOffWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  justify-content: center;
  align-items: center;
`;

export const FallbackImageWrapper = styled(Animated.View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('60%')}px;
  justify-content: center;
  align-items: center;
`;
