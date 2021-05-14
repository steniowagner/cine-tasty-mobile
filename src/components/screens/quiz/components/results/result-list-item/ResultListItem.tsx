import React from 'react';
import { useTranslation } from 'react-i18next';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';
import * as Types from '@local-types';

import * as Styles from './ResultListItem.styles';

type ResultListItemProps = {
  result: Types.QuizResult;
};

const ResultListItem = (props: ResultListItemProps) => {
  const { t } = useTranslation();

  return (
    <Styles.Wrapper
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
      <Styles.IconWrapper>
        <SVGIcon
          id={props.result.isCorrect ? 'checkbox-circle' : 'close-circle'}
          colorThemeRef={props.result.isCorrect ? 'green' : 'red'}
          size={metrics.getWidthFromDP('14%')}
        />
      </Styles.IconWrapper>
      <Styles.TextContentWrapper>
        <Styles.QuestionText>{props.result.question}</Styles.QuestionText>
        <Styles.AnswerText>
          {`${t(TRANSLATIONS.QUIZ_ANSWER)}: ${props.result.answer}`}
        </Styles.AnswerText>
        <Styles.LineDivider />
        <Styles.AnswerText>
          {`${t(TRANSLATIONS.QUIZ_YOUR_ANSWER)}: ${props.result.userAnswer}`}
        </Styles.AnswerText>
      </Styles.TextContentWrapper>
    </Styles.Wrapper>
  );
};

export default ResultListItem;
