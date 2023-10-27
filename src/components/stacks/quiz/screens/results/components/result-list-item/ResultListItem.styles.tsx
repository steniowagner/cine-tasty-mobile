import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { Typography } from '@/components/common';

export const Wrapper = styled.View`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.lg * 2}px;
  border-radius: ${({ theme }) => theme.metrics.sm}px;
  background-color: white;
`;

export const TextContentWrapper = styled.View`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.lg}px;
  padding-bottom: ${({ theme }) => theme.metrics.lg}px;
  padding-top: ${({ theme }) => theme.metrics.md}px;
`;

export const IconWrapper = styled.View`
  width: ${({ theme }) => theme.metrics.xl * 3}px;
  height: ${({ theme }) => theme.metrics.xl * 3}px;
  justify-content: center;
  align-self: center;
  align-items: center;
  margin-top: ${({ theme }) => -theme.metrics.lg * 2}px;
  border-radius: ${({ theme }) => theme.metrics.lg * 2}px;
  background-color: white;
`;

export const QuestionText = styled(Typography.SmallText).attrs(({ theme }) => ({
  color: theme.colors.buttonText,
  alignment: 'center',
  bold: true,
}))`
  margin-bottom: ${({ theme }) => theme.metrics.xl}px;
`;

export const AnswerText = styled(Typography.ExtraSmallText).attrs(
  ({ theme }) => ({
    color: theme.colors.buttonText,
  }),
)`
  text-transform: capitalize;
`;

export const LineDivider = styled.View`
  width: 100%;
  height: ${StyleSheet.hairlineWidth}px;
  margin-vertical: ${({ theme }) => theme.metrics.lg}px;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;
