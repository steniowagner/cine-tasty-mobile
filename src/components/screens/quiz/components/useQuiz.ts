import {useTranslations} from '@hooks';
import {useMemo} from 'react';

import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';

import {QuizStackPropsNavigationProp} from '../routes/route-params-types';

type UseQuizProps = {
  navigation: QuizStackPropsNavigationProp;
};

const useQuiz = (props: UseQuizProps) => {
  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      welcome: translations.translate(Translations.Tags.QUIZ_WELCOME),
      description: translations.translate(Translations.Tags.QUIZ_DESCRIPTION),
      challenge: translations.translate(Translations.Tags.QUIZ_CHALLENGE),
      chooseQuestions: translations.translate(
        Translations.Tags.QUIZ_CHOOSE_QUESTIONS,
      ),
    }),
    [translations.translate],
  );

  return {
    onPressChooseQuestions: () =>
      props.navigation.navigate(Routes.Quiz.SETUP_QUESTIONS),
    texts,
  };
};

export default useQuiz;
