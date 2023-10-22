import { useCallback, useMemo } from 'react';

import { Translations } from '@i18n/tags';
import { useTranslation } from '@hooks';
import { Routes } from '@/navigation';

import { QuizPropsNavigationProp } from '../../routes/route-params-types';

type UseQuizProps = {
  navigation: QuizPropsNavigationProp;
};

export const useQuizScreen = (props: UseQuizProps) => {
  const translation = useTranslation();

  const texts = useMemo(
    () => ({
      welcome: translation.translate(Translations.Quiz.QUIZ_WELCOME),
      description: translation.translate(Translations.Quiz.QUIZ_DESCRIPTION),
      challenge: translation.translate(Translations.Quiz.QUIZ_CHALLENGE),
      chooseQuestions: translation.translate(
        Translations.Quiz.QUIZ_CHOOSE_QUESTIONS,
      ),
    }),
    [translation.translate],
  );

  const handleNavigateSetupQuestions = useCallback(() => {
    props.navigation.navigate(Routes.Quiz.SETUP_QUESTIONS);
  }, [props.navigation]);

  return {
    onPressChooseQuestions: handleNavigateSetupQuestions,
    texts,
  };
};
