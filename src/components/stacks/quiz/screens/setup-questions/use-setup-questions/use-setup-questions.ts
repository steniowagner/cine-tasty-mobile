import { useCallback, useEffect, useMemo, useState } from 'react';

import { Translations } from '@/i18n/tags';
import { Routes } from '@navigation';
import { useTranslation } from '@/hooks';
import {
  QuizQuestionCategory,
  QuizQuestionDifficulty,
  QuizQuestionType,
} from '@schema-types';

import { SetupQuestionsNavigationProp } from '../../../routes/route-params-types';
import { categories, difficulties, types } from './options';
import { SetupQuestionOption, OptionValue } from './types';

type QuestionsConfig = {
  category: QuizQuestionCategory;
  difficulty: QuizQuestionDifficulty;
  type: QuizQuestionType;
};

export type SetupQuestionsOptions = keyof QuestionsConfig;

type UseSetupQuestionsParams = {
  navigation: SetupQuestionsNavigationProp;
};

export const useSetupQuestions = (params: UseSetupQuestionsParams) => {
  const [questionsConfig, setQuestionsConfig] = useState<QuestionsConfig>({
    category: QuizQuestionCategory.MIXED,
    difficulty: QuizQuestionDifficulty.MIXED,
    type: QuizQuestionType.MIXED,
  });
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [isSetupQuestionsModalOpen, setIsSetupQuestionsModalOpen] =
    useState(false);
  const [sectionSelected, setSectionSelected] = useState<
    SetupQuestionsOptions | undefined
  >();

  const translation = useTranslation();

  const options = useMemo(() => {
    const optionDatasetMapping: Record<
      keyof QuestionsConfig,
      SetupQuestionOption[]
    > = {
      category: categories,
      difficulty: difficulties,
      type: types,
    };
    if (!sectionSelected || !optionDatasetMapping[sectionSelected]) {
      return [];
    }
    return optionDatasetMapping[sectionSelected];
  }, [sectionSelected, translation.translate]);

  const texts = useMemo(() => {
    const modalTitleSectionMapping: Record<SetupQuestionsOptions, string> = {
      difficulty: translation.translate(Translations.Quiz.QUIZ_SET_DIFFICULTY),
      category: translation.translate(Translations.Quiz.QUIZ_SET_CATEGORY),
      type: translation.translate(Translations.Quiz.QUIZ_SET_TYPE),
    };
    return {
      sections: {
        difficulty: translation.translate(Translations.Quiz.QUIZ_DIFFICULTY),
        type: translation.translate(Translations.Quiz.QUIZ_TYPE),
        category: translation.translate(Translations.Quiz.QUIZ_CATEGORY),
        numberOfQuestions: translation.translate(
          Translations.Quiz.QUIZ_NUMBER_OF_QUESTIONS,
        ),
      },
      startQuiz: translation.translate(Translations.Quiz.QUIZ_START_BUTTON),
      modalTitle: sectionSelected
        ? modalTitleSectionMapping[sectionSelected]
        : '',
    };
  }, [translation.translate, sectionSelected]);

  const optionsDatasetForSectionSelected = useMemo<
    Record<SetupQuestionsOptions, string>
  >(() => {
    const category = categories.find(
      ({ value }) => value === questionsConfig.category,
    );
    const difficulty = difficulties.find(
      ({ value }) => value === questionsConfig.difficulty,
    );
    const type = types.find(({ value }) => value === questionsConfig.type);
    return {
      category: translation.translate(category!.translationTag),
      difficulty: translation.translate(difficulty!.translationTag),
      type: translation.translate(type!.translationTag),
    };
  }, [translation.translate, questionsConfig]);

  const optionForSectionSelected = useMemo<OptionValue | undefined>(
    () => (sectionSelected ? questionsConfig[sectionSelected] : undefined),
    [questionsConfig, sectionSelected],
  );

  const handleCloseSetupQuestionsModal = useCallback(() => {
    setIsSetupQuestionsModalOpen(false);
    setSectionSelected(undefined);
  }, []);

  const handleConfirmSelectedOption = useCallback(
    (value: OptionValue) => {
      handleCloseSetupQuestionsModal();
      if (!sectionSelected) {
        return;
      }
      setQuestionsConfig(previousQuestionConfig => ({
        ...previousQuestionConfig,
        [sectionSelected]: value,
      }));
    },
    [sectionSelected, handleCloseSetupQuestionsModal],
  );

  const handleSelectSection = useCallback((section: SetupQuestionsOptions) => {
    setSectionSelected(section);
  }, []);

  const handleStartQuiz = useCallback(() => {
    params.navigation.navigate(Routes.Quiz.QUESTIONS, {
      ...questionsConfig,
      numberOfQuestions,
    });
  }, [params.navigation, numberOfQuestions, questionsConfig]);

  useEffect(() => {
    if (sectionSelected) {
      setIsSetupQuestionsModalOpen(true);
    }
  }, [sectionSelected]);

  return {
    onCloseSetupQuestionsModal: handleCloseSetupQuestionsModal,
    onPressConfirmSelectedOption: handleConfirmSelectedOption,
    optionForSectionSelected,
    onPressStartQuiz: handleStartQuiz,
    onPressSectionOption: handleSelectSection,
    isSetupQuestionsModalOpen,
    optionsDatasetForSectionSelected,
    questionsConfig,
    numberOfQuestions,
    setNumberOfQuestions,
    texts,
    options,
  };
};
