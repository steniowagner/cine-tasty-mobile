import { useState, useCallback } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { QuestionDifficulty, QuestionCategory, QuestionType } from 'types/schema';
import * as TRANSLATIONS from 'i18n/tags';

import {
  CustomizedModalChildrenType,
  QuizFilterOption,
  QuestionOption,
  QuizOption,
} from 'types';

import { QuizStackParams } from '../../routes/route-params-types';
import { difficulties, categories, types } from './options';

export const INITIAL_NUMBER_QUESTIONS = 10;

type State = {
  setNumberOfQuestions: (numberOfQuestions: number) => void;
  questionDifficulty: QuestionOption<QuestionDifficulty>;
  onPressOptionDropdown: (option: QuizOption) => void;
  questionCategory: QuestionOption<QuestionCategory>;
  questionType: QuestionOption<QuestionType>;
  onPressStartQuiz: () => void;
  t: (key: string) => string;
  numberOfQuestions: number;
};

type OptionSelectedInfo = {
  currentOptionSelected: QuizFilterOption;
  currentDataset: QuizFilterOption[];
  headerText: string;
};

type NavigateToCustomModalProps = {
  currentOptionSelected: QuizFilterOption;
  currentDataset: QuizFilterOption[];
  headerText: string;
  option: QuizOption;
};

type Props = {
  navigation: StackNavigationProp<QuizStackParams, 'SETUP_QUESTIONS'>;
};

const useSetupQuestions = ({ navigation }: Props): State => {
  const [questionDifficulty, setQuestionDifficulty] = useState<
    QuestionOption<QuestionDifficulty>
  >(difficulties[0]);
  const [questionCategory, setQuestionCategory] = useState<
    QuestionOption<QuestionCategory>
  >(categories[0]);
  const [questionType, setQuestionType] = useState<QuestionOption<QuestionType>>(
    types[0],
  );
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(
    INITIAL_NUMBER_QUESTIONS,
  );

  const { t } = useTranslation();

  const getOptionSelectedInfo = useCallback(
    (option: QuizOption): OptionSelectedInfo => {
      let currentOptionSelected: QuizFilterOption;
      let currentDataset: QuizFilterOption[] = [];
      let headerText: string = '';

      if (option === 'CATEGORY') {
        headerText = t(TRANSLATIONS.QUIZ_SET_CATEGORY);
        currentOptionSelected = questionCategory;
        currentDataset = categories;
      }

      if (option === 'DIFFICULTY') {
        headerText = t(TRANSLATIONS.QUIZ_SET_DIFFICULTY);
        currentOptionSelected = questionDifficulty;
        currentDataset = difficulties;
      }

      if (option === 'TYPE') {
        headerText = t(TRANSLATIONS.QUIZ_SET_TYPE);
        currentOptionSelected = questionType;
        currentDataset = types;
      }

      return {
        currentOptionSelected,
        currentDataset,
        headerText,
      };
    },
    [questionDifficulty, questionCategory, questionType],
  );

  const onSelectOption = useCallback(
    (indexOptionSelected: number, optionSelected: QuizOption): void => {
      if (optionSelected === 'CATEGORY') {
        setQuestionCategory(categories[indexOptionSelected]);
      }

      if (optionSelected === 'DIFFICULTY') {
        setQuestionDifficulty(difficulties[indexOptionSelected]);
      }

      if (optionSelected === 'TYPE') {
        setQuestionType(types[indexOptionSelected]);
      }
    },
    [],
  );

  const getLastIndexOptionSelected = useCallback(
    (currentDataset: QuizFilterOption[], currentOptionSelected: QuizFilterOption) => {
      const index = currentDataset.findIndex(
        (datasetItem) => datasetItem.id === currentOptionSelected.id,
      );

      return index;
    },
    [],
  );

  const navigateToCustomModal = useCallback(
    ({
      currentOptionSelected,
      currentDataset,
      headerText,
      option,
    }: NavigateToCustomModalProps): void => {
      navigation.navigate('CUSTOM_MODAL', {
        extraData: {
          onPressSelect: (indexOptionSelected: number) => {
            onSelectOption(indexOptionSelected, option);
          },
          lastItemSelected: getLastIndexOptionSelected(
            currentDataset,
            currentOptionSelected,
          ),
          dataset: currentDataset,
        },
        type: CustomizedModalChildrenType.MEDIA_FILTER,
        headerText,
      });
    },
    [],
  );

  const onPressOptionDropdown = useCallback(
    (option: QuizOption): void => {
      const { currentOptionSelected, currentDataset, headerText } = getOptionSelectedInfo(
        option,
      );

      navigateToCustomModal({
        currentOptionSelected,
        currentDataset,
        headerText,
        option,
      });
    },
    [questionDifficulty, questionCategory, questionType],
  );

  const navigateToQuestions = useCallback(() => {
    navigation.navigate('QUESTIONS', {
      difficulty: questionDifficulty.value,
      category: questionCategory.value,
      type: questionType.value,
      numberOfQuestions,
    });
  }, [numberOfQuestions, questionDifficulty, questionCategory, questionType]);

  return {
    onPressStartQuiz: navigateToQuestions,
    onPressOptionDropdown,
    setNumberOfQuestions,
    questionDifficulty,
    numberOfQuestions,
    questionCategory,
    questionType,
    t,
  };
};

export default useSetupQuestions;
