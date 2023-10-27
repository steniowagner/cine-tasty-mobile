import React from 'react';
import {
  RenderAPI,
  act,
  fireEvent,
  render,
} from '@testing-library/react-native';

import { QueryQuestions_quiz, QuizQuestionType } from '@schema-types';
import { Routes } from '@navigation';
import { Translations } from '@/i18n/tags';

import { MockedNavigator } from '../../../../../../__mocks__';
import { ResultsProps } from '../../routes/route-params-types';
import { Results } from './Results';
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert');

// the first option will be always the correct
const multiChoiceOptions = Array(4)
  .fill('')
  .map((_, index) => `OPTION-${index}`);

// the "True" option will always be the correct
const booleanOptions = ['True', 'False'];

const multiChoiceQuestion = () => {
  return {
    question: 'MULTI-CHOICE-QUESTION',
    type: QuizQuestionType.MULTIPLE.toLowerCase(),
    category: 'MULTI-CHOICE',
    __typename: 'QuizQuestion',
    options: multiChoiceOptions,
    correctAnswer: multiChoiceOptions[0],
  } as QueryQuestions_quiz;
};

const booleanQuesiton = () =>
  ({
    question: 'BOOLEAN-QUESTION',
    type: QuizQuestionType.BOOLEAN.toLowerCase(),
    category: 'BOOLEAN',
    __typename: 'QuizQuestion',
    options: booleanOptions,
    correctAnswer: booleanOptions[0],
  } as QueryQuestions_quiz);

const renderResults = (answers: string[], pop = jest.fn()) => {
  const ResultsComponent = (props: ResultsProps) => (
    <Results
      {...props}
      navigation={{ ...props.navigation, pop }}
      route={{
        name: Routes.Quiz.RESULTS,
        key: `${Routes.Quiz.RESULTS}-key`,
        params: {
          questions: [multiChoiceQuestion(), booleanQuesiton()],
          answers,
        },
      }}
    />
  );
  return <MockedNavigator component={ResultsComponent} />;
};

describe('Stacks/Quiz/Screens/Results', () => {
  const elements = {
    roundedButton: (api: RenderAPI) => api.getByTestId('rounded-button'),
    roundedButtonText: (api: RenderAPI) =>
      api.getByTestId('rounded-button-text'),
    resultsList: (api: RenderAPI) => api.getByTestId('results-list'),
    resultListItemWrapper: (api: RenderAPI) =>
      api.getAllByTestId('result-list-item-wrapper'),
    headerTitle: (api: RenderAPI) => api.getByTestId('header-title'),
  };

  describe('Rendering', () => {
    it('should render correctly', () => {
      const component = render(
        renderResults([multiChoiceOptions[0], booleanOptions[1]]),
      );
      expect(elements.roundedButton(component)).not.toBeNull();
      expect(elements.roundedButtonText(component)).not.toBeNull();
      expect(elements.roundedButtonText(component).children[0]).toEqual(
        Translations.Quiz.QUIZ_PLAY_AGAIN,
      );
      expect(elements.resultsList(component)).not.toBeNull();
      expect(elements.resultListItemWrapper(component).length).toEqual(2);
    });
  });

  describe('Header title', () => {
    it('should render the "header-title" correctly when "scored 0/2"', () => {
      const component = render(
        renderResults([multiChoiceOptions[1], booleanOptions[1]]),
      );
      expect(elements.headerTitle(component).children[0]).toEqual(
        `${Translations.Quiz.QUIZ_SCORES} 0/2!`,
      );
    });

    it('should render the "header-title" correctly when "scored 1/2" (multi-choice-correct)', () => {
      const component = render(
        renderResults([multiChoiceOptions[0], booleanOptions[1]]),
      );
      expect(elements.headerTitle(component).children[0]).toEqual(
        `${Translations.Quiz.QUIZ_SCORES} 1/2!`,
      );
    });

    it('should render the "header-title" correctly when "scored 1/2" (boolean-correct)', () => {
      const component = render(
        renderResults([multiChoiceOptions[1], booleanOptions[0]]),
      );
      expect(elements.headerTitle(component).children[0]).toEqual(
        `${Translations.Quiz.QUIZ_SCORES} 1/2!`,
      );
    });

    it('should render the "header-title" correctly when "scored 2/2" (boolean-correct)', () => {
      const component = render(
        renderResults([multiChoiceOptions[0], booleanOptions[0]]),
      );
      expect(elements.headerTitle(component).children[0]).toEqual(
        `${Translations.Quiz.QUIZ_SCORES} 2/2!`,
      );
    });
  });

  describe('Pressing CTA', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should show the "Alert-modal" correctly when the user presses the "Play Again" button', () => {
      const component = render(
        renderResults([multiChoiceOptions[0], booleanOptions[0]]),
      );
      expect(Alert.alert).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.roundedButton(component));
      expect(Alert.alert).toHaveBeenCalledTimes(1);
      expect((Alert.alert as jest.Mock).mock.calls[0][0]).toEqual(
        Translations.Quiz.QUIZ_PLAY_AGAIN,
      );
      expect((Alert.alert as jest.Mock).mock.calls[0][1]).toEqual(
        Translations.Quiz.QUIZ_PLAY_AGAIN_DESCRIPTION,
      );
      expect((Alert.alert as jest.Mock).mock.calls[0][2][0].text).toEqual(
        Translations.Quiz.QUIZ_NO,
      );
      expect((Alert.alert as jest.Mock).mock.calls[0][2][0].style).toEqual(
        'cancel',
      );
      expect((Alert.alert as jest.Mock).mock.calls[0][2][1].text).toEqual(
        Translations.Quiz.QUIZ_YES,
      );
      expect((Alert.alert as jest.Mock).mock.calls[0][3].cancelable).toEqual(
        false,
      );
    });

    it('should call the "navigation.pop" correctly when press the "No-option" in the "Alert"', () => {
      const pop = jest.fn();
      const component = render(
        renderResults([multiChoiceOptions[0], booleanOptions[0]], pop),
      );
      fireEvent.press(elements.roundedButton(component));
      expect(pop).toBeCalledTimes(0);
      act(() => {
        (Alert.alert as jest.Mock).mock.calls[0][2][0].onPress();
      });
      expect(pop).toBeCalledTimes(1);
      expect(pop).toHaveBeenCalledWith(3);
    });

    it('should call the "navigation.pop" correctly when presses the "Yes-option" option in the "Alert"', () => {
      const pop = jest.fn();
      const component = render(
        renderResults([multiChoiceOptions[0], booleanOptions[0]], pop),
      );
      fireEvent.press(elements.roundedButton(component));
      expect(pop).toBeCalledTimes(0);
      act(() => {
        (Alert.alert as jest.Mock).mock.calls[0][2][1].onPress();
      });
      expect(pop).toBeCalledTimes(1);
      expect(pop).toHaveBeenCalledWith(2);
    });
  });
});
