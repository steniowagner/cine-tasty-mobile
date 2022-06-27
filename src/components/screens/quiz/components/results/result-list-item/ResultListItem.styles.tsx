import {StyleSheet, View, Text} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({theme}) => theme.metrics.getWidthFromDP('7%')}px;
  border-radius: ${({theme}) => theme.metrics.smallSize}px;
  background-color: white;
`;

export const TextContentWrapper = styled(View)`
  width: 100%;
  padding-horizontal: ${({theme}) => theme.metrics.largeSize}px;
  padding-bottom: ${({theme}) => theme.metrics.largeSize}px;
  padding-top: ${({theme}) => theme.metrics.mediumSize}px;
`;

export const IconWrapper = styled(View)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('15%')}px;
  height: ${({theme}) => theme.metrics.getWidthFromDP('15%')}px;
  justify-content: center;
  align-self: center;
  align-items: center;
  margin-top: ${({theme}) => -theme.metrics.getWidthFromDP('8%')}px;
  border-radius: ${({theme}) => theme.metrics.getWidthFromDP('7.5%')}px;
  background-color: white;
`;

export const QuestionText = styled(Text)`
  margin-bottom: ${({theme}) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Black;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.buttonText};
  text-align: center;
`;

export const AnswerText = styled(Text)`
  font-family: CircularStd-Medium;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.buttonText};
  text-transform: capitalize;
`;

export const LineDivider = styled(View)`
  width: 100%;
  height: ${StyleSheet.hairlineWidth}px;
  margin-vertical: ${({theme}) => theme.metrics.largeSize}px;
  background-color: ${({theme}) => theme.colors.darkLayer};
`;
