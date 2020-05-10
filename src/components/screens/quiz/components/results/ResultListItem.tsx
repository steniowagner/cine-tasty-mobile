import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Icon from 'components/common/Icon';
import metrics from 'styles/metrics';
import { QuizResult } from 'types';

const Wrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: white;
`;

const TextContentWrapper = styled(View)`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  padding-top: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const IconWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('18%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('18%')}px;
  justify-content: center;
  align-self: center;
  align-items: center;
  margin-top: ${({ theme }) => -theme.metrics.getWidthFromDP('8%')}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('9%')}px;
  background-color: white;
`;

const QuestionText = styled(Text).attrs({
  numberOfLines: 4,
})`
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: rgba(0, 0, 0, 0.8);
  text-align: center;
`;

const AnswerText = styled(Text)`
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: rgba(0, 0, 0, 0.8);
`;

const LineDivider = styled(View)`
  width: 100%;
  height: ${StyleSheet.hairlineWidth}px;
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: rgba(0, 0, 0, 0.5);
`;

type Props = {
  result: QuizResult;
};

export const incorrectAnswerConfig = { color: '#D5233B', icon: 'close-circle' };
export const correctAnswerConfig = { color: '#32BE70', icon: 'check-circle' };

const ResultListItem = ({ result }: Props) => {
  const { color, icon } = result.isCorrect ? correctAnswerConfig : incorrectAnswerConfig;

  const { t } = useTranslation();

  return (
    <Wrapper
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }}
    >
      <IconWrapper>
        <Icon
          size={metrics.getWidthFromDP('14%')}
          color={color}
          name={icon}
        />
      </IconWrapper>
      <TextContentWrapper>
        <QuestionText>{result.question}</QuestionText>
        <AnswerText>{`${t('translations:quiz:answer')}: ${result.answer}`}</AnswerText>
        <LineDivider />
        <AnswerText>
          {`${t('translations:quiz:yourAnswer')}: ${result.userAnswer}`}
        </AnswerText>
      </TextContentWrapper>
    </Wrapper>
  );
};

export default ResultListItem;
