import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import SVGIcon from 'components/common/svg-icon/SVGIcon';
import * as TRANSLATIONS from 'i18n/tags';
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
  width: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  justify-content: center;
  align-self: center;
  align-items: center;
  margin-top: ${({ theme }) => -theme.metrics.getWidthFromDP('8%')}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('7.5%')}px;
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
  text-transform: capitalize;
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

const ResultListItem = ({ result }: Props) => {
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
        <SVGIcon
          id={result.isCorrect ? 'checkbox-circle' : 'close-circle'}
          colorThemeRef={result.isCorrect ? 'green' : 'red'}
          size={metrics.getWidthFromDP('14%')}
        />
      </IconWrapper>
      <TextContentWrapper>
        <QuestionText>{result.question}</QuestionText>
        <AnswerText>{`${t(TRANSLATIONS.QUIZ_ANSWER)}: ${result.answer}`}</AnswerText>
        <LineDivider />
        <AnswerText>
          {`${t(TRANSLATIONS.QUIZ_YOUR_ANSWER)}: ${result.userAnswer}`}
        </AnswerText>
      </TextContentWrapper>
    </Wrapper>
  );
};

export default ResultListItem;
