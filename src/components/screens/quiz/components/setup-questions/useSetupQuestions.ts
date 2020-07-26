import { useState, useCallback } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { QuestionDifficulty, QuestionCategory, QuestionType } from 'types/schema';
import { QuestionOption, QuizOption } from 'types';

import { QuizStackParams } from '../../routes/route-params-types';
import { difficulties, categories, types } from './options';

export const INITIAL_NUMBER_QUESTIONS = 10;

type State = {
  setNumberOfQuestions: (numberOfQuestions: number) => void;
  questionDifficulty: QuestionOption<QuestionDifficulty>;
  onSelectOption: (indexOptionSelected: number) => void;
  onPressOptionDropdown: (option: QuizOption) => void;
  questionCategory: QuestionOption<QuestionCategory>;
  questionType: QuestionOption<QuestionType>;
  indexLastOptionSelected: number;
  onPressStartQuiz: () => void;
  t: (key: string) => string;
  onPressSelect: () => void;
  numberOfQuestions: number;
  onCloseModal: () => void;
  modalMessage: string;
  isModalOpen: boolean;
  options: any[];
};

type Option = QuestionOption<QuestionDifficulty | QuestionCategory | QuestionType>;

type Options = Option[];

type OptionSelectedInfo = {
  currentOptionSelected: Option;
  currentDataset: Options;
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
  const [indexLastOptionSelected, setIndexLastOptionSelected] = useState<number>(0);
  const [currentOption, setCurrentOption] = useState<QuizOption | null>(null);
  const [optionsSelected, setOptionsSelected] = useState<Options>([]);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(
    INITIAL_NUMBER_QUESTIONS,
  );

  const { t } = useTranslation();

  const getOptionSelectedInfo = useCallback(
    (option: QuizOption): OptionSelectedInfo => {
      let currentOptionSelected: Option;
      let currentDataset: Options = [];

      if (option === 'CATEGORY') {
        currentOptionSelected = questionCategory;
        currentDataset = categories;
      }

      if (option === 'DIFFICULTY') {
        currentOptionSelected = questionDifficulty;
        currentDataset = difficulties;
      }

      if (option === 'TYPE') {
        currentOptionSelected = questionType;
        currentDataset = types;
      }

      return {
        currentOptionSelected,
        currentDataset,
      };
    },
    [optionsSelected],
  );

  const handleSetCurrentSelectedOptionIndex = useCallback(
    (option: QuizOption): void => {
      const { currentOptionSelected, currentDataset } = getOptionSelectedInfo(option);

      const index = currentDataset.findIndex(
        (datasetItem) => datasetItem.id === currentOptionSelected.id,
      );

      setIndexLastOptionSelected(index);
    },
    [optionsSelected],
  );

  const setOptions = useCallback(
    (option: QuizOption): void => {
      handleSetCurrentSelectedOptionIndex(option);

      setCurrentOption(option);

      if (option === 'CATEGORY') {
        setModalMessage(t('translations:quiz:setCategory'));
        setOptionsSelected(categories);
      }

      if (option === 'DIFFICULTY') {
        setModalMessage(t('translations:quiz:setDifficulty'));
        setOptionsSelected(difficulties);
      }

      if (option === 'TYPE') {
        setModalMessage(t('translations:quiz:setType'));
        setOptionsSelected(types);
      }
    },
    [optionsSelected],
  );

  const onPressSelect = useCallback((): void => {
    if (currentOption === 'CATEGORY') {
      setQuestionCategory(categories[indexLastOptionSelected]);
    }

    if (currentOption === 'DIFFICULTY') {
      setQuestionDifficulty(difficulties[indexLastOptionSelected]);
    }

    if (currentOption === 'TYPE') {
      setQuestionType(types[indexLastOptionSelected]);
    }

    setOptionsSelected([]);
  }, [indexLastOptionSelected, currentOption]);

  const onPressStartQuiz = useCallback(() => {
    navigation.navigate('QUESTIONS', {
      difficulty: questionDifficulty.value,
      category: questionCategory.value,
      type: questionType.value,
      numberOfQuestions,
    });
  }, [numberOfQuestions, questionDifficulty, questionCategory, questionType]);

  return {
    onSelectOption: setIndexLastOptionSelected,
    onCloseModal: () => setOptionsSelected([]),
    isModalOpen: !!optionsSelected.length,
    onPressOptionDropdown: setOptions,
    options: optionsSelected,
    indexLastOptionSelected,
    setNumberOfQuestions,
    questionDifficulty,
    numberOfQuestions,
    onPressStartQuiz,
    questionCategory,
    onPressSelect,
    questionType,
    modalMessage,
    t,
  };
};

export default useSetupQuestions;
