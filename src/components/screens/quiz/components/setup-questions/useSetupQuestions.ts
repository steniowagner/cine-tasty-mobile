import { useState, useCallback } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import * as Types from '@local-types';

import { QuizStackParams } from '../../routes/route-params-types';
import { difficulties, categories, types } from './options';

export const INITIAL_NUMBER_QUESTIONS = 10;

type OptionSelectedInfo = {
  currentOptionSelected: Types.QuizFilterOption;
  currentDataset: Types.QuizFilterOption[];
  headerText: string;
};

type NavigateToCustomModalProps = {
  currentOptionSelected: Types.QuizFilterOption;
  currentDataset: Types.QuizFilterOption[];
  headerText: string;
  option: Types.QuizOption;
};

type UseSetupQuestionsProps = {
  navigation: StackNavigationProp<QuizStackParams, 'SETUP_QUESTIONS'>;
};

const useSetupQuestions = ({ navigation }: UseSetupQuestionsProps) => {
  const [questionDifficulty, setQuestionDifficulty] = useState<
    Types.QuestionOption<SchemaTypes.QuestionDifficulty>
  >(difficulties[0]);
  const [questionCategory, setQuestionCategory] = useState<
    Types.QuestionOption<SchemaTypes.QuestionCategory>
  >(categories[0]);
  const [questionType, setQuestionType] = useState<
    Types.QuestionOption<SchemaTypes.QuestionType>
  >(types[0]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(
    INITIAL_NUMBER_QUESTIONS,
  );

  const { t } = useTranslation();

  const getOptionSelectedInfo = useCallback(
    (option: Types.QuizOption): OptionSelectedInfo => {
      let currentOptionSelected: Types.QuizFilterOption;
      let currentDataset: Types.QuizFilterOption[] = [];
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
    (indexOptionSelected: number, optionSelected: Types.QuizOption): void => {
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
    (
      currentDataset: Types.QuizFilterOption[],
      currentOptionSelected: Types.QuizFilterOption,
    ) => {
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
        type: Types.CustomizedModalChildrenType.MEDIA_FILTER,
        headerText,
      });
    },
    [],
  );

  const onPressOptionDropdown = useCallback(
    (option: Types.QuizOption): void => {
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
