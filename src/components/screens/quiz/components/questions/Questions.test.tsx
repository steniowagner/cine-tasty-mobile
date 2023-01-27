import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  act,
  RenderAPI,
  within,
} from '@testing-library/react-native';
import {MockedResponse, MockedProvider} from '@apollo/client/testing';
import {InMemoryCache} from '@apollo/client';

import possibleTypes from '@graphql/possibleTypes.json';
import MockedNavigation from '@mocks/MockedNavigator';
import {randomPositiveNumber} from '@mocks/utils';
import * as SchemaTypes from '@schema-types';
import {quizFixtures} from '@mocks/fixtures';
import {Routes} from '@routes/routes';
import {dark as theme} from '@styles/themes/dark';

import {Questions} from './Questions';
import {ReactTestInstance} from 'react-test-renderer';

type AnswerQuestionsWithinRangeParams = {
  elements: Record<string, any>;
  component: RenderAPI;
  range: number;
  questions: SchemaTypes.GetQuizQuestions_quiz[];
  answers: string[];
};

type CheckQuestionRenderedCorrectlyParams = {
  elements: Record<string, any>;
  component: RenderAPI;
  questionIndex: number;
  question: SchemaTypes.GetQuizQuestions_quiz;
  numberOfQuestions: number;
};

type AnswerQuestionParams = {
  component: RenderAPI;
  elements: Record<string, any>;
  answer: string;
  question: SchemaTypes.GetQuizQuestions_quiz;
  indexQuestion: number;
};

const selectSomeBooleanOption = (answer: string, question: any) => {
  fireEvent.press(question.queryByTestId(`${answer}-option-button`));
};

const selectSomeMultiChoiceOption = (answer: string, question: any) => {
  const indexAnswerSelected = answer.split('_')[1];
  const answerSelected = question.queryAllByTestId(
    'multi-choice-option-button',
  )[indexAnswerSelected];
  fireEvent.press(answerSelected);
};

const answerQuestion = (params: AnswerQuestionParams) => {
  const question = within(
    params.elements.questions(params.component)[params.indexQuestion],
  );
  const isBooleanQuestion =
    params.question.type === SchemaTypes.QuestionType.BOOLEAN.toLowerCase();
  const answer = isBooleanQuestion
    ? selectSomeBooleanOption
    : selectSomeMultiChoiceOption;
  answer(params.answer, question);
};

const answerQuestionsWithinRange = (
  params: AnswerQuestionsWithinRangeParams,
) => {
  for (let i = 0; i < params.range; i++) {
    answerQuestion({
      elements: params.elements,
      component: params.component,
      answer: params.answers[i],
      question: params.questions[i],
      indexQuestion: i,
    });
    fireEvent.press(params.elements.nextButton(params.component)[i]);
  }
};

const checkIsNotShowinRestartButton = (
  elements: Record<string, any>,
  component: RenderAPI,
) => {
  expect(elements.restartQuizButton(component)).toBeNull();
  expect(elements.restartQuizIcon(component)).toBeNull();
};

const checkIsBooleanQuestion = (question: ReactTestInstance) => {
  expect(within(question).getByTestId('true-option-button')).not.toBeNull();
  expect(within(question).getByTestId('false-option-button')).not.toBeNull();
  expect(
    within(question).queryAllByTestId('multi-choice-option-button'),
  ).toEqual([]);
};

const checkIsMultiChoiceQuestion = (question: ReactTestInstance) => {
  expect(
    within(question).queryAllByTestId('multi-choice-option-button').length,
  ).toBeGreaterThan(0);
  expect(within(question).queryByTestId('true-option-button')).toBeNull();
  expect(within(question).queryByTestId('false-option-button')).toBeNull();
};

const checkIsQuestionCorrectTextContent = (
  params: CheckQuestionRenderedCorrectlyParams,
) => {
  expect(
    params.elements.questionText(params.component)[params.questionIndex]
      .children[0],
  ).toEqual(params.question.question);
  expect(
    params.elements
      .questionIndicatorText(params.component)
      [params.questionIndex].children.join(''),
  ).toEqual(`${params.questionIndex + 1}/${params.numberOfQuestions}`);
};

const checkIsQuestionRenderedCorrectly = (
  params: CheckQuestionRenderedCorrectlyParams,
) => {
  const question = params.elements.questions(params.component)[
    params.questionIndex
  ];
  const isBooleanQuestion =
    params.question.type === SchemaTypes.QuestionType.BOOLEAN.toLowerCase();
  const checkIsCorrectTypeQuestion = isBooleanQuestion
    ? checkIsBooleanQuestion
    : checkIsMultiChoiceQuestion;
  checkIsCorrectTypeQuestion(question);
  checkIsQuestionCorrectTextContent(params);
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
            ...quizFixtures().defaultOptions,
            numberOfQuestions,
          },
        }}
      />
    </MockedProvider>
  );
  return <MockedNavigation component={QuestionsComponent} />;
};

describe('<Questions />', () => {
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
    questionFocused: (api: RenderAPI) => api.queryByTestId('quesiton-focused'),
    questions: (api: RenderAPI) => api.queryAllByTestId(/question-item-/),
    header: (api: RenderAPI) => api.getByRole('header'),
  };

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
      const resolvers = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        quizFixtures().mixedQuestions(numberOfQuestions),
      );
      const component = render(renderQuestions(numberOfQuestions, resolvers));
      expect(elements.loading(component)).not.toBeNull();
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loading(component)).toBeNull();
    });

    it('should render the correct number of questions', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const resolvers = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questionsList(component)).not.toBeNull();
      expect(elements.questions(component).length).toEqual(numberOfQuestions);
    });

    it('should render the list of questions correctly when has both "Multi-choice" and "True/False" questions', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const resolvers = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolvers));
      act(() => {
        jest.runAllTimers();
      });
      for (let i = 0; i < numberOfQuestions; i++) {
        checkIsQuestionRenderedCorrectly({
          elements,
          component,
          questionIndex: i,
          question: questions[i],
          numberOfQuestions,
        });
      }
    });

    it('should render the list of questions correctly when has only "Multi-choice" questions', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = quizFixtures().multiChoiceQuestions(numberOfQuestions);
      const resolvers = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolvers));
      act(() => {
        jest.runAllTimers();
      });
      for (let i = 0; i < numberOfQuestions; i++) {
        checkIsQuestionRenderedCorrectly({
          elements,
          component,
          questionIndex: i,
          question: questions[i],
          numberOfQuestions,
        });
      }
    });

    it('should render the list of questions correctly when has only "True/False" questions', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = quizFixtures().booleanQuestions(numberOfQuestions);
      const resolvers = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolvers));
      act(() => {
        jest.runAllTimers();
      });
      for (let i = 0; i < numberOfQuestions; i++) {
        checkIsQuestionRenderedCorrectly({
          elements,
          component,
          questionIndex: i,
          question: questions[i],
          numberOfQuestions,
        });
      }
    });
  });

  describe('Showing the correct header-title', () => {
    it('should render the header correctly for each question when the category of the questions is "MIXED', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const answers = quizFixtures().makeQuestionsAnswers(questions);
      const resolvers = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolvers));
      act(() => {
        jest.runAllTimers();
      });
      for (let i = 0; i < numberOfQuestions; i++) {
        const currentQuestionCategory = questions[i].category
          .split(':')[1]
          .trim();
        answerQuestion({
          elements: elements,
          component: component,
          answer: answers[i],
          question: questions[i],
          indexQuestion: i,
        });
        expect(elements.header(component).children[0]).toEqual(
          currentQuestionCategory,
        );
        fireEvent.press(elements.nextButton(component)[i]);
      }
    });

    it('should render the header correctly for each question when has only "Multi-choice" questions', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = quizFixtures().multiChoiceQuestions(numberOfQuestions);
      const answers = quizFixtures().makeQuestionsAnswers(questions);
      const resolvers = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolvers));
      act(() => {
        jest.runAllTimers();
      });
      for (let i = 0; i < numberOfQuestions; i++) {
        const currentQuestionCategory = questions[i].category
          .split(':')[1]
          .trim();
        answerQuestion({
          elements: elements,
          component: component,
          answer: answers[i],
          question: questions[i],
          indexQuestion: i,
        });
        expect(elements.header(component).children[0]).toEqual(
          currentQuestionCategory,
        );
        fireEvent.press(elements.nextButton(component)[i]);
      }
    });

    it('should render the header correctly for each question when has only "True/False" questions', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = quizFixtures().booleanQuestions(numberOfQuestions);
      const answers = quizFixtures().makeQuestionsAnswers(questions);
      const resolvers = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolvers));
      act(() => {
        jest.runAllTimers();
      });
      for (let i = 0; i < numberOfQuestions; i++) {
        const currentQuestionCategory = questions[i].category
          .split(':')[1]
          .trim();
        answerQuestion({
          elements: elements,
          component: component,
          answer: answers[i],
          question: questions[i],
          indexQuestion: i,
        });
        expect(elements.header(component).children[0]).toEqual(
          currentQuestionCategory,
        );
        fireEvent.press(elements.nextButton(component)[i]);
      }
    });
  });

  describe('Navigating to the next question', () => {
    it('should not navigate to the next question when the user didnt select an answer and didnt press the "NEXT" button', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const resolvers = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questions(component)[0].props.testID).toEqual(
        'question-item-focused',
      );
      expect(elements.questions(component)[1].props.testID).toEqual(
        'question-item-unfocused',
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questions(component)[0].props.testID).toEqual(
        'question-item-focused',
      );
      expect(elements.questions(component)[1].props.testID).toEqual(
        'question-item-unfocused',
      );
    });

    it('should not navigate to the next question when the user selectes an answer but didnt press the "NEXT" button', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const answers = quizFixtures().makeQuestionsAnswers(questions);
      const resolvers = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questions(component)[0].props.testID).toEqual(
        'question-item-focused',
      );
      expect(elements.questions(component)[1].props.testID).toEqual(
        'question-item-unfocused',
      );
      answerQuestion({
        elements: elements,
        component: component,
        answer: answers[0],
        question: questions[0],
        indexQuestion: 0,
      });
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questions(component)[0].props.testID).toEqual(
        'question-item-focused',
      );
      expect(elements.questions(component)[1].props.testID).toEqual(
        'question-item-unfocused',
      );
    });

    it('should not navigate to the next question when the user pressed the "NEXT" button but didnt select an answer', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const resolvers = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questions(component)[0].props.testID).toEqual(
        'question-item-focused',
      );
      expect(elements.questions(component)[1].props.testID).toEqual(
        'question-item-unfocused',
      );
      fireEvent.press(elements.nextButton(component)[0]);
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.questions(component)[0].props.testID).toEqual(
        'question-item-focused',
      );
      expect(elements.questions(component)[1].props.testID).toEqual(
        'question-item-unfocused',
      );
    });

    it('should navigate to the next question when the user selects an answer and press the "NEXT" button', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const answers = quizFixtures().makeQuestionsAnswers(questions);
      const resolvers = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolvers));
      act(() => {
        jest.runAllTimers();
      });
      for (let i = 0; i < questions.length - 1; i++) {
        expect(elements.questions(component)[i].props.testID).toEqual(
          'question-item-focused',
        );
        expect(elements.questions(component)[i + 1].props.testID).toEqual(
          'question-item-unfocused',
        );
        answerQuestion({
          elements: elements,
          component: component,
          answer: answers[i],
          question: questions[i],
          indexQuestion: i,
        });
        fireEvent.press(elements.nextButton(component)[i]);
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.questions(component)[i].props.testID).toEqual(
          'question-item-unfocused',
        );
        expect(elements.questions(component)[i + 1].props.testID).toEqual(
          'question-item-focused',
        );
      }
    });
  });

  describe('Navigate to the "Results" screen', () => {
    it('should navigate to the "Results" screen when the user answers all the questions', () => {
      const navigate = jest.fn();
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const answers = quizFixtures().makeQuestionsAnswers(questions);
      const resolvers = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(
        renderQuestions(numberOfQuestions, resolvers, navigate),
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(navigate).toHaveBeenCalledTimes(0);
      answerQuestionsWithinRange({
        range: questions.length,
        elements,
        component,
        questions,
        answers,
      });
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(Routes.Quiz.RESULTS, {
        questions,
        answers,
      });
    });
  });

  describe('Restart Quiz', () => {
    it('should not show the "Restart-quiz" button when its loading', () => {
      const numberOfQuestions = randomPositiveNumber(10, 1);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const resolver = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolver));
      expect(elements.loading(component)).not.toBeNull();
      expect(elements.restartQuizButton(component)).toBeNull();
      expect(elements.restartQuizIcon(component)).toBeNull();
    });

    it('should not show the "Restart-quiz" button on the first question', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const resolver = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolver));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loading(component)).toBeNull();
      checkIsNotShowinRestartButton(elements, component);
    });

    it('should not show the "Restart-quiz" button when there is just one "True/False" question', () => {
      const numberOfQuestions = 1;
      const questions = quizFixtures().booleanQuestions(numberOfQuestions);
      const resolver = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolver));
      act(() => {
        jest.runAllTimers();
      });
      checkIsNotShowinRestartButton(elements, component);
    });

    it('should not show the "Restart-quiz" button when theres just one "Multi-choice" question', () => {
      const numberOfQuestions = 1;
      const questions = quizFixtures().multiChoiceQuestions(numberOfQuestions);
      const resolver = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolver));
      act(() => {
        jest.runAllTimers();
      });
      checkIsNotShowinRestartButton(elements, component);
    });

    it('should focus at the first question of the quiz when the user presses the "Restart-quiz" button', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const answers = quizFixtures().makeQuestionsAnswers(questions);
      const resolver = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolver));
      act(() => {
        jest.runAllTimers();
      });
      for (let i = 1; i < questions.length; i++) {
        answerQuestionsWithinRange({
          range: i,
          elements,
          component,
          questions,
          answers,
        });
        fireEvent.press(elements.restartQuizButton(component));
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.questions(component)[0].props.testID).toEqual(
          'question-item-focused',
        );
      }
    });

    it('should keep the answers of the already answered questions when the user presses the "Restart-quiz" button', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = quizFixtures().multiChoiceQuestions(numberOfQuestions);
      const answers = quizFixtures().makeQuestionsAnswers(questions);
      const resolver = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolver));
      act(() => {
        jest.runAllTimers();
      });
      answerQuestionsWithinRange({
        range: questions.length,
        elements,
        component,
        questions,
        answers,
      });
      fireEvent.press(elements.restartQuizButton(component));
      act(() => {
        jest.runAllTimers();
      });
      for (let i = 0; i < numberOfQuestions; i++) {
        const question = elements.questions(component)[i];
        const isBooleanQuestion =
          questions[i].type === SchemaTypes.QuestionType.BOOLEAN.toLowerCase();
        if (isBooleanQuestion) {
          const booleanOptionSelected = within(question).getByTestId(
            `${answers[i]}-option-button`,
          );
          expect(booleanOptionSelected.props.style.backgroundColor).toEqual(
            theme.colors.primary,
          );
        } else {
          const indexOptionSelected = within(question)
            .getAllByTestId('multi-choice-option-button')
            .findIndex(multiChoiceOptionButton => {
              return (
                multiChoiceOptionButton.props.style.backgroundColor ===
                theme.colors.primary
              );
            });
          const textOptionSelected = within(question).getAllByTestId(
            'multi-choice-option-text',
          )[indexOptionSelected];
          expect(textOptionSelected.children[0]).toEqual(answers[i]);
        }
      }
    });
  });

  describe('Error state', () => {
    it('should show the "Error-state" when some "Network-error" happens', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const resolvers = quizFixtures().getNetworkErrorResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loading(component)).toBeNull();
      expect(elements.questionsList(component)).toBeNull();
      expect(elements.error(component)).not.toBeNull();
    });

    it('should show the "Error-state" when some "GraphQL-error" happens', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = quizFixtures().mixedQuestions(numberOfQuestions);
      const resolvers = quizFixtures().getGraphQLErrorResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loading(component)).toBeNull();
      expect(elements.questionsList(component)).toBeNull();
      expect(elements.error(component)).not.toBeNull();
    });
  });

  describe('No questions found', () => {
    it('should show the "No-Questions-Found" when an empty array-of-questions is received', () => {
      const numberOfQuestions = randomPositiveNumber(10, 2);
      const questions = [];
      const resolvers = quizFixtures().getSuccessResolver(
        numberOfQuestions,
        questions,
      );
      const component = render(renderQuestions(numberOfQuestions, resolvers));
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
