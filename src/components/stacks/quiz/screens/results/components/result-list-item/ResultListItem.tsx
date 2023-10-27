import React from 'react';

import GLOBAL_STYLES from '@styles/constants';
import { SVGIcon } from '@common-components';
import metrics from '@/styles/metrics';

import { useResultListItem } from './use-result-list-item';
import { QuizResult } from '../../use-results';
import * as Styles from './ResultListItem.styles';

type ResultListItemProps = {
  result: QuizResult;
};

export const ResultListItem = (props: ResultListItemProps) => {
  const resultListItem = useResultListItem(props);

  return (
    <Styles.Wrapper
      style={GLOBAL_STYLES.defaultShadow}
      testID="result-list-item-wrapper">
      <Styles.IconWrapper>
        <SVGIcon
          size={metrics.xl * 3}
          color={resultListItem.icon.colorThemeRef}
          id={resultListItem.icon.id}
        />
      </Styles.IconWrapper>
      <Styles.TextContentWrapper>
        <Styles.QuestionText testID="question-text">
          {props.result.question}
        </Styles.QuestionText>
        <Styles.AnswerText testID="correct-answer-text">
          {resultListItem.texts.correctAnswer}
        </Styles.AnswerText>
        <Styles.LineDivider />
        <Styles.AnswerText testID="user-answer-text">
          {resultListItem.texts.userAnswer}
        </Styles.AnswerText>
      </Styles.TextContentWrapper>
    </Styles.Wrapper>
  );
};
