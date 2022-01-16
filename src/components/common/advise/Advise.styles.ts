import { View, Text } from 'react-native';
import styled from 'styled-components';

export const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const IconWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('45%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('45%')}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('27.5%')}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled(Text).attrs({
  numberOfLines: 1,
})`
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
  text-align: center;
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Description = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  text-align: center;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  color: ${({ theme }) => theme.colors.subText};
`;

export const Suggestion = styled(Text).attrs({
  numberOfLines: 2,
})`
  text-align: center;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
  color: ${({ theme }) => theme.colors.text};
`;
