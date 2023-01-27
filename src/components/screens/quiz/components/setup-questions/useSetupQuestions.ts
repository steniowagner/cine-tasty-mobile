import {useState, useMemo, useCallback} from 'react';

import * as SchemaTypes from '@schema-types';
import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';

import {SetupQuestionsStackNavigationProp} from '../../routes/route-params-types';
import {useHandlePressStartQuizButton} from './hooks/useHandlePressStartQuizButton';
import {useOptionsSelected} from './provider/OptionsSelectedProvider';

export const INITIAL_NUMBER_QUESTIONS = 10;

type UseSetupQuestionsProps = {
  navigation: SetupQuestionsStackNavigationProp;
};

export const useSetupQuestions = (props: UseSetupQuestionsProps) => {
  const [isModalOptionsListOpen, setIsModalOptionsListOpen] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(
    INITIAL_NUMBER_QUESTIONS,
  );

  const translations = useTranslations();

  const optionsSelected = useOptionsSelected();

  const navigateToQuestionsScreen = useCallback(() => {
    props.navigation.navigate(Routes.Quiz.QUESTIONS, {
      difficulty: optionsSelected.selectedOptions.difficulty
        .value as SchemaTypes.QuestionDifficulty,
      category: optionsSelected.selectedOptions.category
        .value as SchemaTypes.QuestionCategory,
      type: optionsSelected.selectedOptions.type
        .value as SchemaTypes.QuestionType,
      numberOfQuestions,
    });
  }, [props.navigation, numberOfQuestions, optionsSelected.selectedOptions]);

  const handlePressStartQuizButton = useHandlePressStartQuizButton({
    navigateToQuestionsScreen,
    numberOfQuestions,
  });

  const texts = useMemo(
    () => ({
      startQuiz: translations.translate(Translations.Tags.QUIZ_START_BUTTON),
      numberOfQuestions: translations.translate(
        Translations.Tags.QUIZ_NUMBER_OF_QUESTIONS,
      ),
    }),
    [translations.translate],
  );

  return {
    onOpenSetupQuestionsModal: () => setIsModalOptionsListOpen(true),
    onCloseSetupQuestionsModal: () => setIsModalOptionsListOpen(false),
    onPressStartQuiz: handlePressStartQuizButton.onPress,
    setNumberOfQuestions,
    numberOfQuestions,
    texts,
    isModalOptionsListOpen,
  };
};
