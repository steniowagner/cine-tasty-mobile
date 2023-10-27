import styled from 'styled-components/native';

import { LoadingPlaceholder } from '@common-components';

import { DEFAULT_BORDER_RADIUS as CTA_BORDER_RADIUS } from './components/question-wrapper/QuestionWrapper.styles';
import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_CARD_WIDTH,
} from './components/question-wrapper/QuestionWrapper.styles';

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoadingWrapper = styled.View`
  width: ${DEFAULT_CARD_WIDTH}px;
  height: ${DEFAULT_CARD_WIDTH}px;
  align-items: center;
  padding-top: ${({ theme }) => theme.metrics.xl}px;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  background-color: rgba(74, 74, 74, 0.1);
`;

export const LongLineLoading = styled(LoadingPlaceholder)`
  width: 90%;
  height: ${({ theme }) => theme.metrics.lg}px;
  border-radius: ${({ theme }) => theme.borderRadius.round}px;
  margin-bottom: ${({ theme }) => theme.metrics.md}px;
`;

export const ShortLineLoading = styled(LoadingPlaceholder)`
  width: 60%;
  height: ${({ theme }) => theme.metrics.lg}px;
  border-radius: ${({ theme }) => theme.borderRadius.round}px;
  margin-bottom: ${({ theme }) => theme.metrics.md}px;
`;

export const VeryShortLineLoading = styled(LoadingPlaceholder)`
  width: 20%;
  height: ${({ theme }) => theme.metrics.lg}px;
  border-radius: ${({ theme }) => theme.borderRadius.round}px;
  margin-bottom: ${({ theme }) => theme.metrics.xl}px;
`;

export const CTALoading = styled(LoadingPlaceholder)`
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('20')}px;
  border-bottom-right-radius: ${CTA_BORDER_RADIUS}px;
  border-bottom-left-radius: ${CTA_BORDER_RADIUS}px;
`;

export const ErrorWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
