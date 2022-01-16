import React from 'react';
import { useTranslation } from 'react-i18next';

import Advise from '@components/common/advise/Advise';
import * as TRANSLATIONS from '@i18n/tags';

import * as Styles from './Questions.styles';

const NoQuestionError = () => {
  const { t } = useTranslation();

  return (
    <Styles.ErrorWrapper
      testID="no-questions-error-wrapper"
    >
      <Advise
        description={t(TRANSLATIONS.QUIZ_NO_QUESTIONS_ADVISE_DESCRIPTION)}
        suggestion={t(TRANSLATIONS.QUIZ_NO_QUESTIONS_ADVISE_SUGGESTION)}
        title={t(TRANSLATIONS.QUIZ_NO_QUESTIONS_ADVISE_TITLE)}
        icon="playlist-remove"
      />
    </Styles.ErrorWrapper>
  );
};

export default NoQuestionError;
