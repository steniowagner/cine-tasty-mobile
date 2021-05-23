import React from 'react';
import { useTranslation } from 'react-i18next';

import Advise from '@components/common/advise/Advise';
import * as TRANSLATIONS from '@i18n/tags';

import * as Styles from './Questions.styles';

const QuestionError = () => {
  const { t } = useTranslation();

  return (
    <Styles.ErrorWrapper
      testID="network-error-wrapper"
    >
      <Advise
        description={t(TRANSLATIONS.ERRORS_NETWORK_ERROR_DESCRIPTION)}
        suggestion={t(TRANSLATIONS.ERRORS_NETWORK_ERROR_SUGGESTION)}
        title={t(TRANSLATIONS.ERRORS_NETWORK_ERROR_TITLE)}
        icon="alert-box"
      />
    </Styles.ErrorWrapper>
  );
};

export default QuestionError;
