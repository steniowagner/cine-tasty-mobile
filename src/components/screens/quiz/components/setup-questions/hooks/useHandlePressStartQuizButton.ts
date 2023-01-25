import {useCallback} from 'react';

import * as SchemaTypes from '@schema-types';
import {showLanguageAlert} from '@utils';
import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';

type UseHandlePressStartQuizButtonProps = {
  navigateToQuestionsScreen: () => void;
  numberOfQuestions: number;
};

export const useHandlePressStartQuizButton = (
  props: UseHandlePressStartQuizButtonProps,
) => {
  const translations = useTranslations();

  const handleShowLanguageAlert = useCallback(() => {
    showLanguageAlert({
      negativeActionTitle: translations.translate(
        Translations.Tags.LANGUAGE_WARNING_QUIZ_NEGATIVE_ACTION,
      ),
      positiveActionTitle: translations.translate(
        Translations.Tags.LANGUAGE_WARNING_QUIZ_POSITIVE_ACTION,
      ),
      description: translations.translate(
        Translations.Tags.LANGUAGE_WARNING_QUIZ_DESCRIPTION,
      ),
      title: translations.translate(
        Translations.Tags.LANGUAGE_WARNING_QUIZ_TITLE,
      ),
      onPressPositiveAction: props.navigateToQuestionsScreen,
      singleAction: false,
    });
  }, [translations.translate, props.navigateToQuestionsScreen]);

  const handlePressStartQuiz = useCallback(() => {
    if (translations.language !== SchemaTypes.ISO6391Language.EN) {
      return handleShowLanguageAlert();
    }
    props.navigateToQuestionsScreen();
  }, [
    handleShowLanguageAlert,
    props.navigateToQuestionsScreen,
    translations.language,
  ]);

  return {
    onPress: handlePressStartQuiz,
  };
};
