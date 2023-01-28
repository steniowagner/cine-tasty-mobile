import React from 'react';
import {Alert} from 'react-native';
import {
  fireEvent,
  RenderAPI,
  cleanup,
  render,
  act,
} from '@testing-library/react-native';

import MockedNavigation from '@mocks/MockedNavigator';
import {randomPositiveNumber} from '@mocks/utils';
import {randomArrayElement} from '@mocks/utils';
import * as SchemaTypes from '@schema-types';
import {quizFixtures} from '@mocks/fixtures';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';
import {Results} from './Results';

jest.spyOn(Alert, 'alert');

const answerQuiz = (questions: SchemaTypes.GetQuizQuestions_quiz[]) =>
  questions.map(question => randomArrayElement<string>(question.options));

const renderResults = (
  questions: SchemaTypes.GetQuizQuestions_quiz[],
  answers: string[],
  pop = jest.fn(),
) => {
  const ResultsComponent = ({navigation}) => (
    <Results
      navigation={{...navigation, pop}}
      route={{
        name: Routes.Quiz.RESULTS,
        key: `${Routes.Quiz.RESULTS}-key`,
        params: {
          questions,
          answers,
        },
      }}
    />
  );
  return <MockedNavigation component={ResultsComponent} />;
};

const elements = {
  roundedButton: (api: RenderAPI) => api.queryByTestId('rounded-button'),
  roundedButtonText: (api: RenderAPI) =>
    api.queryByTestId('rounded-button-text'),
  resultsList: (api: RenderAPI) => api.queryByTestId('results-list'),
  resultListItemWrapper: (api: RenderAPI) =>
    api.queryAllByTestId('result-list-item-wrapper'),
  icons: (api: RenderAPI) => api.queryAllByTestId(/icon-/),
  questionText: (api: RenderAPI) => api.queryAllByTestId('question-text'),
};

describe('<Results />', () => {
  afterEach(cleanup);

  describe('Renders correctly', () => {
    it('should render correctly', () => {
      const numberOfQuestions = randomPositiveNumber(10, 1);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const answers = answerQuiz(questions);
      const component = render(renderResults(questions, answers));
      expect(elements.roundedButton(component)).not.toBeNull();
      expect(elements.roundedButtonText(component)).not.toBeNull();
      expect(elements.roundedButtonText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_PLAY_AGAIN,
      );
      expect(elements.resultsList(component)).not.toBeNull();
      expect(elements.resultListItemWrapper(component).length).toEqual(
        questions.length,
      );
    });

    it('should render the "Results-list" in the correct sequence', () => {
      const numberOfQuestions = randomPositiveNumber(10, 1);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const answers = answerQuiz(questions);
      const component = render(renderResults(questions, answers));
      for (let i = 0; i < questions.length; i++) {
        expect(elements.questionText(component)[i].children[0]).toEqual(
          questions[i].question,
        );
      }
    });

    it('should render the "Correct/Incorrect"-icons on the correct sequence on the "Results-list"', () => {
      const numberOfQuestions = randomPositiveNumber(10, 1);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const answers = answerQuiz(questions);
      const component = render(renderResults(questions, answers));
      for (let i = 0; i < questions.length; i++) {
        const isAnswerCorrect = questions[i].correctAnswer === answers[i];
        const currentIconID = elements.icons(component)[i].props.testID;
        if (isAnswerCorrect) {
          expect(currentIconID).toEqual('icon-checkbox-circle');
        } else {
          expect(currentIconID).toEqual('icon-close-circle');
        }
      }
    });
  });

  describe('Header title', () => {
    it('should render the header-title correctly', () => {
      const numberOfQuestions = randomPositiveNumber(10, 1);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const answers = answerQuiz(questions);
      const component = render(renderResults(questions, answers));
      let numberCorrectAnswers = 0;
      for (let i = 0; i < questions.length; i++) {
        const isAnswerCorrect = questions[i].correctAnswer === answers[i];
        if (isAnswerCorrect) {
          numberCorrectAnswers += 1;
        }
      }
      expect(
        component.getByText(
          `${Translations.Tags.QUIZ_SCORES} ${numberCorrectAnswers}/${questions.length}!`,
        ),
      ).not.toBeNull();
    });
  });

  describe('Pressing the "Play Again" button', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should show the "Alert-modal" correctly when the user presses the "Play Again" button', () => {
      const numberOfQuestions = randomPositiveNumber(10, 1);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const answers = answerQuiz(questions);
      const component = render(renderResults(questions, answers));
      expect(Alert.alert).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.roundedButton(component));
      expect(Alert.alert).toHaveBeenCalledTimes(1);
      expect((Alert.alert as jest.Mock).mock.calls[0][0]).toEqual(
        Translations.Tags.QUIZ_PLAY_AGAIN,
      );
      expect((Alert.alert as jest.Mock).mock.calls[0][1]).toEqual(
        Translations.Tags.QUIZ_PLAY_AGAIN_DESCRIPTION,
      );
      expect((Alert.alert as jest.Mock).mock.calls[0][2][0].text).toEqual(
        Translations.Tags.QUIZ_NO,
      );
      expect((Alert.alert as jest.Mock).mock.calls[0][2][0].style).toEqual(
        'cancel',
      );
      expect((Alert.alert as jest.Mock).mock.calls[0][2][1].text).toEqual(
        Translations.Tags.QUIZ_YES,
      );
      expect((Alert.alert as jest.Mock).mock.calls[0][3].cancelable).toEqual(
        false,
      );
    });

    it('should call the "navigation.pop" with the correct parans when the user press the "No" option on the "Alert"', () => {
      const numberOfQuestions = randomPositiveNumber(10, 1);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const answers = answerQuiz(questions);
      const pop = jest.fn();
      const component = render(renderResults(questions, answers, pop));
      fireEvent.press(elements.roundedButton(component));
      expect(pop).toHaveBeenCalledTimes(0);
      act(() => {
        (Alert.alert as jest.Mock).mock.calls[0][2][0].onPress();
      });
      expect(pop).toHaveBeenCalledTimes(1);
      expect(pop).toHaveBeenCalledWith(3);
    });

    it('should call the "navigation.pop" with the correct params when the user presses the "Yes" option on the "Alert"', () => {
      const numberOfQuestions = randomPositiveNumber(10, 1);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const answers = answerQuiz(questions);
      const pop = jest.fn();
      const component = render(renderResults(questions, answers, pop));
      fireEvent.press(elements.roundedButton(component));
      expect(pop).toHaveBeenCalledTimes(0);
      act(() => {
        (Alert.alert as jest.Mock).mock.calls[0][2][1].onPress();
      });
      expect(pop).toHaveBeenCalledTimes(1);
      expect(pop).toHaveBeenCalledWith(2);
    });
  });
});
