import React from 'react';

import {Advise} from '@components/common';

import useNoQuestionsError from './useNoQuestionsError';

import * as Styles from '../Questions.styles';

const NoQuestionError = () => {
  const noQuestionsError = useNoQuestionsError();
  return (
    <Styles.ErrorWrapper testID="no-questions-error-wrapper">
      <Advise
        description={noQuestionsError.texts.description}
        suggestion={noQuestionsError.texts.suggestion}
        title={noQuestionsError.texts.title}
        icon="playlist-remove"
      />
    </Styles.ErrorWrapper>
  );
};

export default NoQuestionError;
