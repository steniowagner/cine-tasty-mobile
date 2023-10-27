import styled from 'styled-components/native';

import { Typography } from '@common-components';
import metrics from '@styles/metrics';

export const DEFAULT_BORDER_RADIUS = metrics.sm;
export const DEFAULT_CARD_WIDTH = metrics.getWidthFromDP('90');

export const Wrapper = styled.View`
  width: ${({ theme }) => theme.metrics.width}px;
  justify-content: center;
  align-items: center;
`;

export const CardWrapper = styled.View`
  width: ${DEFAULT_CARD_WIDTH}px;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  background-color: white;
`;

export const TextWrapper = styled.View`
  align-items: center;
  padding: ${({ theme }) => theme.metrics.xl}px;
`;

export const QuestionsIndicatorText = styled(Typography.ExtraSmallText).attrs(
  ({ theme }) => ({
    color: theme.colors.buttonText,
    alignment: 'center',
    bold: true,
  }),
)``;

export const QuestionText = styled(Typography.ExtraSmallText).attrs(
  ({ theme }) => ({
    color: theme.colors.buttonText,
    alignment: 'center',
    bold: true,
  }),
)`
  margin-top: ${({ theme }) => theme.metrics.sm}px;
`;
