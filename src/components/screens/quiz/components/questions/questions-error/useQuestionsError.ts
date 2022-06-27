import {useMemo} from 'react';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

const useQuestionsError = () => {
  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      description: translations.translate(
        Translations.Tags.ERRORS_NETWORK_ERROR_DESCRIPTION,
      ),
      suggestion: translations.translate(
        Translations.Tags.ERRORS_NETWORK_ERROR_SUGGESTION,
      ),
      title: translations.translate(
        Translations.Tags.ERRORS_NETWORK_ERROR_TITLE,
      ),
    }),
    [translations.translate],
  );

  return {
    texts,
  };
};

export default useQuestionsError;
