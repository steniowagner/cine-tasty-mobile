import {useState, useCallback, useMemo} from 'react';

import {useShowLanguageAlert, useTranslations} from '@hooks';
import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';
import metrics from '@styles/metrics';

import {SetupQuestionsStackNavigationProp} from '../../routes/route-params-types';
import {difficulties, categories, types} from './options';

export const INITIAL_NUMBER_QUESTIONS = 10;

type OptionSelectedInfo = {
  optionSelected: Types.QuizFilterOption;
  dataset: Types.QuizFilterOption[];
  headerText: string;
};

type NavigateToCustomModalProps = {
  optionSelected: Types.QuizFilterOption;
  dataset: Types.QuizFilterOption[];
  option: Types.QuizOption;
  headerText: string;
};

type OptionSelectedMapping = {
  optionSelected: Types.QuizFilterOption;
  dataset: Types.QuizFilterOption[];
  headerText: string;
};

type UseSetupQuestionsProps = {
  navigation: SetupQuestionsStackNavigationProp;
};

const useSetupQuestions = (props: UseSetupQuestionsProps) => {
  const [questionType, setQuestionType] = useState<Types.QuestionType>(
    types[0],
  );
  const [questionDifficulty, setQuestionDifficulty] =
    useState<Types.QuestionDifficulty>(difficulties[0]);
  const [questionCategory, setQuestionCategory] =
    useState<Types.QuestionCategory>(categories[0]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(
    INITIAL_NUMBER_QUESTIONS,
  );

  const languageAlert = useShowLanguageAlert();
  const translations = useTranslations();

  const getOptionSelectedInfo = useCallback(
    (option: Types.QuizOption): OptionSelectedInfo => {
      const optionSelectedMapping: Record<
        Types.QuizOption,
        OptionSelectedMapping
      > = {
        category: {
          headerText: translations.translate(
            Translations.Tags.QUIZ_SET_CATEGORY,
          ),
          optionSelected: questionCategory,
          dataset: categories,
        },
        difficulty: {
          headerText: translations.translate(
            Translations.Tags.QUIZ_SET_DIFFICULTY,
          ),
          optionSelected: questionDifficulty,
          dataset: difficulties,
        },
        type: {
          headerText: translations.translate(Translations.Tags.QUIZ_SET_TYPE),
          optionSelected: questionType,
          dataset: types,
        },
      };
      return optionSelectedMapping[option];
    },
    [
      translations.translate,
      questionDifficulty,
      questionCategory,
      questionType,
    ],
  );

  const handleSelectOption = useCallback(
    (indexOptionSelected: number, optionSelected: Types.QuizOption): void => {
      const selectOptionMapping: Record<Types.QuizOption, () => void> = {
        category: () => setQuestionCategory(categories[indexOptionSelected]),
        difficulty: () =>
          setQuestionDifficulty(difficulties[indexOptionSelected]),
        type: () => setQuestionType(types[indexOptionSelected]),
      };
      const properOptionUpdater = selectOptionMapping[optionSelected];
      properOptionUpdater();
    },
    [],
  );

  const lastItemSelected = useCallback(
    (
      dataset: Types.QuizFilterOption[],
      optionSelected: Types.QuizFilterOption,
    ) => {
      const lastIndexOptionSelected = dataset.findIndex(
        datasetItem => datasetItem.id === optionSelected.id,
      );
      return lastIndexOptionSelected;
    },
    [],
  );

  const navigateToCustomModal = useCallback(
    (params: NavigateToCustomModalProps): void => {
      props.navigation.navigate(Routes.CustomModal.CUSTOM_MODAL_STACK, {
        extraData: {
          onPressSelect: (indexOptionSelected: number) => {
            handleSelectOption(indexOptionSelected, params.option);
          },
          dataset: params.dataset,
          lastItemSelected: lastItemSelected(
            params.dataset,
            params.optionSelected,
          ),
        },
        type: Types.CustomizedModalChildrenType.MEDIA_FILTER,
        modalHeight: metrics.getHeightFromDP('68%'),
        headerText: params.headerText,
      });
    },
    [props.navigation, lastItemSelected],
  );

  const handlePressOptionDropdown = useCallback(
    (option: Types.QuizOption): void => {
      const {optionSelected, dataset, headerText} =
        getOptionSelectedInfo(option);

      navigateToCustomModal({
        optionSelected,
        headerText,
        dataset,
        option,
      });
    },
    [getOptionSelectedInfo, navigateToCustomModal],
  );

  const navigateToQuestions = useCallback(() => {
    props.navigation.navigate(Routes.Quiz.QUESTIONS, {
      difficulty: questionDifficulty.value,
      category: questionCategory.value,
      type: questionType.value,
      numberOfQuestions,
    });
  }, [
    props.navigation,
    numberOfQuestions,
    questionDifficulty,
    questionCategory,
    questionType,
  ]);

  const handleShowLanguageAlert = useCallback(() => {
    languageAlert.show({
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
      onPressPositiveAction: navigateToQuestions,
      singleAction: false,
    });
  }, [languageAlert.show, navigateToQuestions]);

  const handlePressStartQuiz = useCallback(() => {
    if (translations.language !== SchemaTypes.ISO6391Language.EN) {
      return handleShowLanguageAlert();
    }
    navigateToQuestions();
  }, [handleShowLanguageAlert, navigateToQuestions, translations.language]);

  const texts = useMemo(
    () => ({
      difficultyDropdown: translations.translate(
        `${Translations.Tags.QUIZ_DIFFICULTY}_${questionDifficulty.id}` as Translations.Tags,
      ),
      categoryDropdown: translations.translate(
        `${Translations.Tags.QUIZ_CATEGORY}_${questionCategory.id}` as Translations.Tags,
      ),
      typeDropdown: translations.translate(
        `${Translations.Tags.QUIZ_TYPE}_${questionType.id}` as Translations.Tags,
      ),
      difficulties: translations.translate(Translations.Tags.QUIZ_DIFFICULTY),
      startQuiz: translations.translate(Translations.Tags.QUIZ_START_BUTTON),
      categories: translations.translate(Translations.Tags.QUIZ_CATEGORY),
      types: translations.translate(Translations.Tags.QUIZ_TYPE),
      numberOfQuestions: translations.translate(
        Translations.Tags.QUIZ_NUMBER_OF_QUESTIONS,
      ),
    }),
    [
      translations.translate,
      questionDifficulty,
      questionCategory,
      questionType,
    ],
  );

  return {
    onPressOptionDropdown: handlePressOptionDropdown,
    onPressStartQuiz: handlePressStartQuiz,
    setNumberOfQuestions,
    numberOfQuestions,
    texts,
  };
};

export default useSetupQuestions;
