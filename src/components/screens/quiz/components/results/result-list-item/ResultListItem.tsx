import React from 'react';

import * as Types from '@local-types';

import {useResultListItem} from './useResultListItem';
import * as Styles from './ResultListItem.styles';

type ResultListItemProps = {
  result: Types.QuizResult;
};

export const ResultListItem = (props: ResultListItemProps) => {
  const resultListItem = useResultListItem(props);

  return (
    <Styles.Wrapper
      // eslint-disable-next-line react-native/no-inline-styles
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
      testID="result-list-item-wrapper">
      <Styles.IconWrapper>
        <Styles.QuestionResultIcon
          colorThemeRef={resultListItem.icon.colorThemeRef}
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
