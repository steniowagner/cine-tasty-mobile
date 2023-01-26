import React from 'react';

import {Advise} from '@components';

import {useQuestionsError} from './useQuestionsError';
import * as Styles from '../Questions.styles';

export const QuestionsError = () => {
  const noQuestionsError = useQuestionsError();

  return (
    <Styles.ErrorWrapper testID="network-error-wrapper">
      <Advise
        description={noQuestionsError.texts.description}
        suggestion={noQuestionsError.texts.suggestion}
        title={noQuestionsError.texts.title}
        icon="alert-box"
      />
    </Styles.ErrorWrapper>
  );
};
