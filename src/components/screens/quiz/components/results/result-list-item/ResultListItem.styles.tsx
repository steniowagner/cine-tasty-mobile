import { StyleSheet, View, Text } from 'react-native';
import styled from 'styled-components';

export const Wrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: white;
`;

export const TextContentWrapper = styled(View)`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  padding-top: ${({ theme }) => theme.metrics.mediumSize}px;
`;

export const IconWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  justify-content: center;
  align-self: center;
  align-items: center;
  margin-top: ${({ theme }) => -theme.metrics.getWidthFromDP('8%')}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('7.5%')}px;
  background-color: white;
`;

export const QuestionText = styled(Text).attrs({
  numberOfLines: 4,
})`
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: rgba(0, 0, 0, 0.8);
  text-align: center;
`;

export const AnswerText = styled(Text)`
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: rgba(0, 0, 0, 0.8);
  text-transform: capitalize;
`;

export const LineDivider = styled(View)`
  width: 100%;
  height: ${StyleSheet.hairlineWidth}px;
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: rgba(0, 0, 0, 0.5);
`;
