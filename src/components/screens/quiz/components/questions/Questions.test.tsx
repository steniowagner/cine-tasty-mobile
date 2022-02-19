import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  act,
  RenderAPI,
} from '@testing-library/react-native';
import {MockedResponse, MockedProvider} from '@apollo/client/testing';
import {InMemoryCache} from '@apollo/client';

import possibleTypes from '@graphql/possibleTypes.json';
import MockedNavigation from '@mocks/MockedNavigator';
import shuffleDataset from '@utils/shuffleDataset';
import {randomPositiveNumber} from '@mocks/utils';
import * as SchemaTypes from '@schema-types';
import {mockQuiz} from '@mocks/fixtures';
import {Routes} from '@routes/routes';

import Questions from './Questions';

const elements = {
  loading: (api: RenderAPI) => api.queryByTestId('loading-content-indicator'),
  questionsList: (api: RenderAPI) => api.queryByTestId('questions-list'),
  error: (api: RenderAPI) => api.queryByTestId('network-error-wrapper'),
  noQuestionsError: (api: RenderAPI) =>
    api.queryByTestId('no-questions-error-wrapper'),
  restartQuizButton: (api: RenderAPI) =>
    api.queryByTestId('restart-quiz-button'),
  restartQuizIcon: (api: RenderAPI) => api.queryByTestId('icon-restart'),
  questionIndicatorText: (api: RenderAPI) =>
    api.queryAllByTestId('question-indicator-text'),
  questionText: (api: RenderAPI) => api.queryAllByTestId('question-text'),
  trueOptionButton: (api: RenderAPI) =>
    api.queryAllByTestId('true-option-button'),
  falseOptionButton: (api: RenderAPI) =>
    api.queryAllByTestId('false-option-button'),
  multiChoiceOptionButton: (api: RenderAPI) =>
    api.queryAllByTestId('multi-choice-option-button'),
  multiChoiceOptionText: (api: RenderAPI) =>
    api.queryAllByTestId('multi-choice-option-text'),
  nextButton: (api: RenderAPI) => api.queryAllByTestId('select-button'),
  questions: (api: RenderAPI) => api.queryAllByTestId('card-wrapper'),
};

const getNumberOfQuestionsInRange = (
  questions: SchemaTypes.GetQuizQuestions_quiz[],
  currentQuestionIndex: number,
  type: SchemaTypes.QuestionType,
) => {
  let numberOfQuestionsInRange = 0;
  for (let i = 0; i <= currentQuestionIndex; i++) {
    if (questions[i].type.toLowerCase() === type.toLowerCase()) {
      numberOfQuestionsInRange += 1;
    }
  }
  return numberOfQuestionsInRange;
};

const selectSomeBooleanOption = (
  component: RenderAPI,
  currentQuestionIndex: number,
  questions: SchemaTypes.GetQuizQuestions_quiz[],
) => {
  const numberOfQuestionsInRange = getNumberOfQuestionsInRange(
    questions,
    currentQuestionIndex,
    SchemaTypes.QuestionType.BOOLEAN,
  );
  const truePath = numberOfQuestionsInRange % 2 === 0;
  const trueOptionButton =
    elements.trueOptionButton(component)[numberOfQuestionsInRange - 1];
  const falseOptionButton =
    elements.falseOptionButton(component)[numberOfQuestionsInRange - 1];
  const buttonToPress = truePath ? trueOptionButton : falseOptionButton;
  fireEvent.press(buttonToPress);
  return truePath ? 'true' : 'false';
};

const selectSomeMultiChoiceOption = (
  component: RenderAPI,
  currentQuestionIndex: number,
  questions: SchemaTypes.GetQuizQuestions_quiz[],
) => {
  const numberOfQuestionsInRange = getNumberOfQuestionsInRange(
    questions,
    currentQuestionIndex,
    SchemaTypes.QuestionType.MULTIPLE,
  );
  const selectedOption = randomPositiveNumber(3, 0);
  const randomMultiChoiceOption =
    4 * (numberOfQuestionsInRange - 1) + selectedOption;
  fireEvent.press(
    elements.multiChoiceOptionButton(component)[randomMultiChoiceOption],
  );
  return elements.multiChoiceOptionText(component)[randomMultiChoiceOption]
    .children[0];
};

const mixedQuestions = (numberOfQuestions: number) => {
  const multiChoiceQuestionsLength =
    numberOfQuestions % 2 === 0
      ? numberOfQuestions / 2
      : Math.floor(numberOfQuestions / 2);
  const booleaneQuestionsLength =
    numberOfQuestions % 2 === 0
      ? numberOfQuestions / 2
      : numberOfQuestions - Math.floor(numberOfQuestions / 2);
  const multiChoiceQuestions = mockQuiz().multiChoiceQuestions(
    multiChoiceQuestionsLength,
  );
  const booleanQuestions = mockQuiz().booleanQuestions(booleaneQuestionsLength);
  return shuffleDataset<SchemaTypes.GetQuizQuestions_quiz>([
    ...multiChoiceQuestions,
    ...booleanQuestions,
  ]);
};

const renderQuestions = (
  numberOfQuestions: number,
  mockResolvers?: readonly MockedResponse<Record<string, any>>[],
  navigate = jest.fn(),
) => {
  const QuestionsComponent = ({navigation}) => (
    <MockedProvider
      mocks={mockResolvers}
      defaultOptions={{
        watchQuery: {fetchPolicy: 'no-cache'},
        query: {fetchPolicy: 'no-cache'},
      }}
      cache={
        new InMemoryCache({
          possibleTypes,
        })
      }>
      <Questions
        navigation={{...navigation, navigate}}
        route={{
          name: Routes.Quiz.QUESTIONS,
          key: `${Routes.Quiz.QUESTIONS}-key`,
          params: {
            ...mockQuiz().defaultOptions,
            numberOfQuestions,
          },
        }}
      />
    </MockedProvider>
  );
  return <MockedNavigation component={QuestionsComponent} />;
};

describe('<Questions />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  describe('Renders correctly', () => {
    it('should show the loading state when the data is loading', () => {
      const component = render(renderQuestions(randomPositiveNumber(50)));
      expect(elements.loading(component)).not.toBeNull();
      expect(elements.questionsList(component)).toBeNull();
      expect(elements.noQuestionsError(component)).toBeNull();
      expect(elements.error(component)).toBeNull();
    });

    it('should not show the loading state when the data is already loaded', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const resolvers = mockQuiz().resolvers(
        numberOfQuestions,
        mixedQuestions(numberOfQuestions),
      );
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.result,
          },
        ]),
      );
      expect(elements.loading(component)).not.toBeNull();
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loading(component)).toBeNull();
    });

    it('should render the list of questions correctly when has both "Multi-choice" and "True/False" questions', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = mixedQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.result,
          },
        ]),
      );
      expect(elements.questionsList(component)).toBeNull();
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questionsList(component)).not.toBeNull();
      expect(elements.questions(component).length).toEqual(numberOfQuestions);
      for (let i = 0; i < numberOfQuestions; i++) {
        expect(elements.questionText(component)[i].children[0]).toEqual(
          questions[i].question,
        );
        expect(
          elements.questionIndicatorText(component)[i].children.join(''),
        ).toEqual(`${i + 1}/${numberOfQuestions}`);
      }
    });

    it('should render the list of questions correctly when has only "Multi-choice" questions', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = mockQuiz().multiChoiceQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.result,
          },
        ]),
      );
      expect(elements.questionsList(component)).toBeNull();
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questionsList(component)).not.toBeNull();
      expect(elements.questions(component).length).toEqual(numberOfQuestions);
      for (let i = 0; i < numberOfQuestions; i++) {
        expect(elements.questionText(component)[i].children[0]).toEqual(
          questions[i].question,
        );
        expect(
          elements.questionIndicatorText(component)[i].children.join(''),
        ).toEqual(`${i + 1}/${numberOfQuestions}`);
      }
    });

    it('should render the list of questions correctly when has only "True/False" questions', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = mockQuiz().booleanQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.result,
          },
        ]),
      );
      expect(elements.questionsList(component)).toBeNull();
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questionsList(component)).not.toBeNull();
      expect(elements.questions(component).length).toEqual(numberOfQuestions);
      for (let i = 0; i < numberOfQuestions; i++) {
        expect(elements.questionText(component)[i].children[0]).toEqual(
          questions[i].question,
        );
        expect(
          elements.questionIndicatorText(component)[i].children.join(''),
        ).toEqual(`${i + 1}/${numberOfQuestions}`);
      }
    });

    it('should render the header correctly for each question when has both "Multi-choice" and "True/False" questions', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = mixedQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.result,
          },
        ]),
      );
      act(() => {
        jest.runAllTimers();
      });
      for (let i = 0; i < numberOfQuestions; i++) {
        const isBooleanQuestion =
          questions[i].type === SchemaTypes.QuestionType.BOOLEAN.toLowerCase();
        const currentQuestionCategory = questions[i].category
          .split(':')[1]
          .trim();
        expect(component.getByText(currentQuestionCategory)).not.toBeNull();
        if (isBooleanQuestion) {
          selectSomeBooleanOption(component, i, questions);
        } else {
          selectSomeMultiChoiceOption(component, i, questions);
        }
        fireEvent.press(elements.nextButton(component)[i]);
      }
    });

    it('should render the header correctly for each question when has only "Multi-choice" questions', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = mockQuiz().multiChoiceQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.result,
          },
        ]),
      );
      act(() => {
        jest.runAllTimers();
      });
      for (let i = 0; i < numberOfQuestions; i++) {
        const isBooleanQuestion =
          questions[i].type === SchemaTypes.QuestionType.BOOLEAN.toLowerCase();
        const currentQuestionCategory = questions[i].category
          .split(':')[1]
          .trim();
        expect(component.getByText(currentQuestionCategory)).not.toBeNull();
        if (isBooleanQuestion) {
          selectSomeBooleanOption(component, i, questions);
        } else {
          selectSomeMultiChoiceOption(component, i, questions);
        }
        fireEvent.press(elements.nextButton(component)[i]);
      }
    });

    it('should render the header correctly for each question when has only "True/False" questions', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = mockQuiz().booleanQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.result,
          },
        ]),
      );
      act(() => {
        jest.runAllTimers();
      });
      for (let i = 0; i < numberOfQuestions; i++) {
        const isBooleanQuestion =
          questions[i].type === SchemaTypes.QuestionType.BOOLEAN.toLowerCase();
        const currentQuestionCategory = questions[i].category
          .split(':')[1]
          .trim();
        expect(component.getByText(currentQuestionCategory)).not.toBeNull();
        if (isBooleanQuestion) {
          selectSomeBooleanOption(component, i, questions);
        } else {
          selectSomeMultiChoiceOption(component, i, questions);
        }
        fireEvent.press(elements.nextButton(component)[i]);
      }
    });
  });

  describe('Navigate to the next question', () => {
    it('should navigate to the next question when the user selects an answer and press the "NEXT" button', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = mixedQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      let currentQuestionCategory;
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.result,
          },
        ]),
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questionText(component)[0].children[0]).toEqual(
        questions[0].question,
      );
      expect(
        elements.questionIndicatorText(component)[0].children.join(''),
      ).toEqual(`1/${questions.length}`);
      currentQuestionCategory = questions[0].category.split(':')[1].trim();
      expect(component.getByText(currentQuestionCategory)).not.toBeNull();
      const isBooleanQuestion =
        questions[0].type === SchemaTypes.QuestionType.BOOLEAN.toLowerCase();
      if (isBooleanQuestion) {
        selectSomeBooleanOption(component, 0, questions);
      } else {
        selectSomeMultiChoiceOption(component, 0, questions);
      }
      fireEvent.press(elements.nextButton(component)[0]);
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questionText(component)[1].children[0]).toEqual(
        questions[1].question,
      );
      expect(
        elements.questionIndicatorText(component)[1].children.join(''),
      ).toEqual(`2/${questions.length}`);
      currentQuestionCategory = questions[1].category.split(':')[1].trim();
      expect(component.getByText(currentQuestionCategory)).not.toBeNull();
    });

    it('should not navigate to the next question when the user didnt select an answer and didnt press the "NEXT" button', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = mixedQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      let currentQuestionCategory;
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.result,
          },
        ]),
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questionText(component)[0].children[0]).toEqual(
        questions[0].question,
      );
      expect(
        elements.questionIndicatorText(component)[0].children.join(''),
      ).toEqual(`1/${questions.length}`);
      currentQuestionCategory = questions[0].category.split(':')[1].trim();
      expect(component.getByText(currentQuestionCategory)).not.toBeNull();
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questionText(component)[0].children[0]).toEqual(
        questions[0].question,
      );
      expect(
        elements.questionIndicatorText(component)[0].children.join(''),
      ).toEqual(`1/${questions.length}`);
      currentQuestionCategory = questions[0].category.split(':')[1].trim();
      expect(component.getByText(currentQuestionCategory)).not.toBeNull();
    });

    it('should not navigate to the next question when the user selected an answer but didnt press the "NEXT" button', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = mixedQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      let currentQuestionCategory;
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.result,
          },
        ]),
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questionText(component)[0].children[0]).toEqual(
        questions[0].question,
      );
      expect(
        elements.questionIndicatorText(component)[0].children.join(''),
      ).toEqual(`1/${questions.length}`);
      currentQuestionCategory = questions[0].category.split(':')[1].trim();
      expect(component.getByText(currentQuestionCategory)).not.toBeNull();
      const isBooleanQuestion =
        questions[0].type === SchemaTypes.QuestionType.BOOLEAN.toLowerCase();
      if (isBooleanQuestion) {
        selectSomeBooleanOption(component, 0, questions);
      } else {
        selectSomeMultiChoiceOption(component, 0, questions);
      }
      // fireEvent.press(elements.nextButton(component)[0]);
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questionText(component)[0].children[0]).toEqual(
        questions[0].question,
      );
      expect(
        elements.questionIndicatorText(component)[0].children.join(''),
      ).toEqual(`1/${questions.length}`);
      currentQuestionCategory = questions[0].category.split(':')[1].trim();
      expect(component.getByText(currentQuestionCategory)).not.toBeNull();
    });

    it('should not navigate to the next question when the user pressed the "NEXT" button but didnt select an answer', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = mixedQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      let currentQuestionCategory;
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.result,
          },
        ]),
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questionText(component)[0].children[0]).toEqual(
        questions[0].question,
      );
      expect(
        elements.questionIndicatorText(component)[0].children.join(''),
      ).toEqual(`1/${questions.length}`);
      currentQuestionCategory = questions[0].category.split(':')[1].trim();
      expect(component.getByText(currentQuestionCategory)).not.toBeNull();
      fireEvent.press(elements.nextButton(component)[0]);
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questionText(component)[0].children[0]).toEqual(
        questions[0].question,
      );
      expect(
        elements.questionIndicatorText(component)[0].children.join(''),
      ).toEqual(`1/${questions.length}`);
      currentQuestionCategory = questions[0].category.split(':')[1].trim();
      expect(component.getByText(currentQuestionCategory)).not.toBeNull();
    });
  });

  describe('Navigate to the "Results" screen', () => {
    it('should navigate to the "Results" screen whent he user answer the last question', () => {
      const navigate = jest.fn();
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = mixedQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      const component = render(
        renderQuestions(
          numberOfQuestions,
          [
            {
              ...resolvers.request,
              ...resolvers.result,
            },
          ],
          navigate,
        ),
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(navigate).toHaveBeenCalledTimes(0);
      const answers = [];
      for (let i = 0; i < numberOfQuestions; i++) {
        const isBooleanQuestion =
          questions[i].type === SchemaTypes.QuestionType.BOOLEAN.toLowerCase();
        let answer = '';
        if (isBooleanQuestion) {
          answer = selectSomeBooleanOption(component, i, questions);
        } else {
          answer = selectSomeMultiChoiceOption(
            component,
            i,
            questions,
          ) as string;
        }
        answers.push(answer);
        fireEvent.press(elements.nextButton(component)[i]);
      }
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(Routes.Quiz.RESULTS, {
        questions,
        answers,
      });
    });
  });

  describe('Restart Quiz', () => {
    it('should not show the "Restart-questionaire" button when its loading', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = mixedQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.result,
          },
        ]),
      );
      expect(elements.restartQuizButton(component)).toBeNull();
      expect(elements.restartQuizIcon(component)).toBeNull();
    });

    it('should not show the "Restart-questionaire" button on the first question', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = mixedQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.result,
          },
        ]),
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.restartQuizButton(component)).toBeNull();
      expect(elements.restartQuizIcon(component)).toBeNull();
    });

    it('should not show the "Restart-questionaire" button when theres just one "True/False" question', () => {
      const numberOfQuestions = 1;
      const questions = mockQuiz().booleanQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.result,
          },
        ]),
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.restartQuizButton(component)).toBeNull();
      expect(elements.restartQuizIcon(component)).toBeNull();
    });

    it('should not show the "Restart-questionaire" button when theres just one "Multi-choice" question', () => {
      const numberOfQuestions = 1;
      const questions = mockQuiz().multiChoiceQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.result,
          },
        ]),
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.restartQuizButton(component)).toBeNull();
      expect(elements.restartQuizIcon(component)).toBeNull();
    });

    it('should focus on the first question of the quiz when the user presses the "Restart-questionaire" button', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const numberOfquestionsAnswered = randomPositiveNumber(
        numberOfQuestions,
        2,
      );
      const questions = mixedQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.result,
          },
        ]),
      );
      act(() => {
        jest.runAllTimers();
      });
      for (let i = 0; i < numberOfquestionsAnswered; i++) {
        const currentQuestionCategory = questions[i].category
          .split(':')[1]
          .trim();
        expect(component.getByText(currentQuestionCategory)).not.toBeNull();
        const isBooleanQuestion =
          questions[i].type === SchemaTypes.QuestionType.BOOLEAN.toLowerCase();
        if (isBooleanQuestion) {
          selectSomeBooleanOption(component, i, questions);
        } else {
          selectSomeMultiChoiceOption(component, i, questions);
        }
        fireEvent.press(elements.nextButton(component)[i]);
      }
      expect(elements.restartQuizButton(component)).not.toBeNull();
      expect(elements.restartQuizIcon(component)).not.toBeNull();
      fireEvent.press(elements.restartQuizButton(component));
      act(() => {
        jest.runAllTimers();
      });
      const currentQuestionCategory = questions[0].category
        .split(':')[1]
        .trim();
      expect(component.getByText(currentQuestionCategory)).not.toBeNull();
    });
  });

  describe('Error states', () => {
    it('should show the "Error-state" when some Network-error happens', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = mixedQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.responseWithNetworkError,
          },
        ]),
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loading(component)).toBeNull();
      expect(elements.questionsList(component)).toBeNull();
      expect(elements.error(component)).not.toBeNull();
    });

    it('should show the "Error-state" when some GraphQL-error happens', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = mixedQuestions(numberOfQuestions);
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.responseWithGraphQLError,
          },
        ]),
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loading(component)).toBeNull();
      expect(elements.questionsList(component)).toBeNull();
      expect(elements.error(component)).not.toBeNull();
    });

    it('should show the "No-Questions-Found" error when an empty array-of-questions if received', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = [];
      const resolvers = mockQuiz().resolvers(numberOfQuestions, questions);
      const component = render(
        renderQuestions(numberOfQuestions, [
          {
            ...resolvers.request,
            ...resolvers.result,
          },
        ]),
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loading(component)).toBeNull();
      expect(elements.questionsList(component)).toBeNull();
      expect(elements.error(component)).toBeNull();
      expect(elements.noQuestionsError(component)).not.toBeNull();
    });
  });
});
