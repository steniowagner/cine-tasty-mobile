import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { QuizOption } from 'types';

import { difficulties, categories, types } from './options';

const INITIAL_NUMBER_QUESTIONS = 10;

type State = {
  setNumberOfQuestions: (numberOfQuestions: number) => void;
  onSelectOption: (indexOptionSelected: number) => void;
  onPressOptionDropdown: (option: QuizOption) => void;
  indexLastOptionSelected: number;
  questionDifficulty: string;
  t: (key: string) => string;
  onPressSelect: () => void;
  numberOfQuestions: number;
  onCloseModal: () => void;
  questionCategory: string;
  modalMessage: string;
  questionType: string;
  isModalOpen: boolean;
  options: any[];
};

const useSetupQuestions = (): State => {
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(
    INITIAL_NUMBER_QUESTIONS,
  );
  const [questionDifficulty, setQuestionDifficulty] = useState<string>(difficulties[0]);
  const [questionCategory, setQuestionCategory] = useState<string>(categories[0]);
  const [currentOption, setCurrentOption] = useState<QuizOption | null>(null);
  const [indexLastOptionSelected, setIndexLastOptionSelected] = useState(0);
  const [questionType, setQuestionType] = useState<string>(types[0]);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [optionsSelected, setOptionsSelected] = useState([]);

  const { t } = useTranslation();

  const getOptionSelectedInfo = (option: QuizOption): any => {
    let currentOptionSelected: any;
    let currentDataset = [];

    if (option === 'CATEGORY') {
      currentDataset = categories;
      currentOptionSelected = questionCategory;
    }

    if (option === 'DIFFICULTY') {
      currentDataset = difficulties;
      currentOptionSelected = questionDifficulty;
    }

    if (option === 'TYPE') {
      currentDataset = types;
      currentOptionSelected = questionType;
    }

    return {
      currentOptionSelected,
      currentDataset,
    };
  };

  const handleSetCurrentSelectedOptionIndex = (option: QuizOption): void => {
    const { currentOptionSelected, currentDataset } = getOptionSelectedInfo(option);

    const index = currentDataset.findIndex(
      (datasetItem: any) => datasetItem === currentOptionSelected,
    );

    setIndexLastOptionSelected(index);
  };

  const setOptions = (option: QuizOption): void => {
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
  };

  const onPressSelect = (): void => {
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
  };

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
    questionCategory,
    onPressSelect,
    questionType,
    modalMessage,
    t,
  };
};

export default useSetupQuestions;
