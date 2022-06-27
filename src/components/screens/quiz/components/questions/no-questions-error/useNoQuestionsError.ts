import {useMemo} from 'react';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

const useNoQuestionsError = () => {
  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      description: translations.translate(
        Translations.Tags.QUIZ_NO_QUESTIONS_ADVISE_DESCRIPTION,
      ),
      suggestion: translations.translate(
        Translations.Tags.QUIZ_NO_QUESTIONS_ADVISE_SUGGESTION,
      ),
      title: translations.translate(
        Translations.Tags.QUIZ_NO_QUESTIONS_ADVISE_TITLE,
      ),
    }),
    [translations.translate],
  );

  return {
    texts,
  };
};

export default useNoQuestionsError;
