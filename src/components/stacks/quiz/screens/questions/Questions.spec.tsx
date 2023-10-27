import React from 'react';
import { MockedResponse, MockedProvider } from '@apollo/client/testing';
import {
  RenderAPI,
  act,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import { QuizQuestionType } from '@/types/schema';
import { Routes } from '@/navigation';
import { Translations } from '@/i18n/tags';

import {
  MockedNavigator,
  BASE_QUIZ_QUESTIONS_VARIABLES,
  mockQuizQuestionsQuerySuccessResponse,
  mockQuizQuestionQueryErrorResponse,
  MULTI_CHOICE_QUESTION_CATEGORY,
  BOOLEAN_QUESTIONS_CATEGORY,
  SequenceOfQuestions,
  randomPositiveNumber,
} from '../../../../../../__mocks__';
import { QuestionsProps } from '../../routes/route-params-types';
import { Questions } from './Questions';
import MultiChoiceQuestionListItem from './components/multi-choice-question/multi-choice-question-list-item/MultiChoiceQuestionListItem';
import BooleanQuestion from './components/boolean-question/BooleanQuestion';
import { ModalSelectButton } from '@/components/common';

type RenderQuestionsProps = {
  mocks: readonly MockedResponse<Record<string, any>>[];
  navigate?: jest.Mock;
  numberOfQuestions?: number;
};

const renderQuestions = (renderQuestionsProps: RenderQuestionsProps) => {
  const QuestionsComponent = (props: QuestionsProps) => (
    <MockedProvider
      mocks={renderQuestionsProps.mocks}
      defaultOptions={{
        watchQuery: { fetchPolicy: 'no-cache' },
        query: { fetchPolicy: 'no-cache' },
      }}>
      <Questions
        navigation={{
          ...props.navigation,
          navigate: renderQuestionsProps.navigate ?? jest.fn(),
        }}
        route={{
          name: Routes.Quiz.QUESTIONS,
          key: `${Routes.Quiz.QUESTIONS}-key`,
          params: {
            ...BASE_QUIZ_QUESTIONS_VARIABLES,
            numberOfQuestions: renderQuestionsProps.numberOfQuestions ?? 1,
          },
        }}
      />
    </MockedProvider>
  );
  return <MockedNavigator component={QuestionsComponent} />;
};

describe('Stacks/Quiz/Screens/Questions', () => {
  const elements = {
    loading: (api: RenderAPI) => api.queryByTestId('loading'),
    questions: (api: RenderAPI) => api.queryAllByTestId('question-wrapper'),
    noQuestionsAdvice: (api: RenderAPI) =>
      api.queryByTestId('no-questions-advice-wrapper'),
    errorAdvice: (api: RenderAPI) => api.queryByTestId('error-advice-wrapper'),
    errorAdviceIcon: (api: RenderAPI) => api.queryByTestId('icon-alert-box'),
    noQuestionsAdviceIcon: (api: RenderAPI) =>
      api.queryByTestId('icon-playlist-remove'),
    adviceTitle: (api: RenderAPI) => api.queryByTestId('advice-title'),
    adviceDescription: (api: RenderAPI) =>
      api.queryByTestId('advice-description'),
    adviceSuggestion: (api: RenderAPI) =>
      api.queryByTestId('advice-suggestion'),
    headerTitle: (api: RenderAPI) => api.queryByTestId('header-title'),
    nextButtons: (api: RenderAPI) => api.queryAllByTestId('select-button'),
    headerRestartButton: (api: RenderAPI) =>
      api.queryByTestId('header-icon-button-wrapper-restart'),
    multiChoiceOptions: (api: RenderAPI) =>
      api.queryAllByTestId('multi-choice-option-button'),
    booleanTrueOption: (api: RenderAPI) =>
      api.queryByTestId('true-option-button'),
    booleanFalseOption: (api: RenderAPI) =>
      api.queryByTestId('false-option-button'),
  };

  describe('Rendering', () => {
    it('should render the "loading-state" by default', () => {
      const component = render(
        renderQuestions({ mocks: mockQuizQuestionsQuerySuccessResponse([]) }),
      );
      expect(elements.loading(component)).not.toBeNull();
    });

    describe('When querying successfuly', () => {
      describe('When some questions were received', () => {
        it('should render the correct number of questions', async () => {
          const questionsSequence = [
            QuizQuestionType.MULTIPLE,
            QuizQuestionType.BOOLEAN,
          ] as SequenceOfQuestions;
          const mocks =
            mockQuizQuestionsQuerySuccessResponse(questionsSequence);
          const component = render(
            renderQuestions({
              mocks,
              numberOfQuestions: questionsSequence.length,
            }),
          );
          await waitFor(() => {
            expect(elements.questions(component).length).toEqual(
              questionsSequence.length,
            );
          });
        });
      });

      describe('When no questions was received', () => {
        it('should render the "no-questions-advice" correctly', async () => {
          const questionsSequence = [
            QuizQuestionType.MULTIPLE,
            QuizQuestionType.BOOLEAN,
          ] as SequenceOfQuestions;
          const mocks = mockQuizQuestionsQuerySuccessResponse(
            questionsSequence,
            true,
          );
          const component = render(
            renderQuestions({
              numberOfQuestions: questionsSequence.length,
              mocks,
            }),
          );
          await waitFor(() => {
            expect(elements.noQuestionsAdvice(component)).not.toBeNull();
          });
          expect(elements.adviceTitle(component)?.children[0]).toEqual(
            Translations.Quiz.QUIZ_NO_QUESTIONS_ADVISE_TITLE,
          );
          expect(elements.adviceDescription(component)?.children[0]).toEqual(
            Translations.Quiz.QUIZ_NO_QUESTIONS_ADVISE_DESCRIPTION,
          );
          expect(elements.adviceSuggestion(component)?.children[0]).toEqual(
            Translations.Quiz.QUIZ_NO_QUESTIONS_ADVISE_SUGGESTION,
          );
          expect(elements.noQuestionsAdviceIcon(component)).not.toBeNull();
        });
      });
    });

    describe('When querying with some error', () => {
      it('should show the "error-advice"', async () => {
        const mocks = mockQuizQuestionQueryErrorResponse();
        const component = render(
          renderQuestions({
            mocks,
            numberOfQuestions: 0,
          }),
        );
        await waitFor(() => {
          expect(elements.errorAdvice(component)).not.toBeNull();
        });
        expect(elements.adviceTitle(component)?.children[0]).toEqual(
          Translations.Error.ERROR_ADVICE_TITLE,
        );
        expect(elements.adviceDescription(component)?.children[0]).toEqual(
          Translations.Error.ERROR_ADVICE_DESCRIPTION,
        );
        expect(elements.adviceSuggestion(component)?.children[0]).toEqual(
          Translations.Error.ERROR_ADVICE_SUGGESTION,
        );
        expect(elements.errorAdviceIcon(component)).not.toBeNull();
      });
    });
  });

  describe('Header', () => {
    describe('Title', () => {
      const questionsSequence = [
        QuizQuestionType.MULTIPLE,
        QuizQuestionType.BOOLEAN,
      ] as SequenceOfQuestions;

      it('should render the "header-title" correctly', async () => {
        const mocks = mockQuizQuestionsQuerySuccessResponse(questionsSequence);
        const component = render(
          renderQuestions({
            mocks,
            numberOfQuestions: questionsSequence.length,
          }),
        );
        await waitFor(() => {
          expect(elements.questions(component).length).toEqual(
            questionsSequence.length,
          );
        });
        // first question is multi-choice
        await waitFor(() => {
          expect(
            elements.headerTitle(component)?.children[0],
          ).not.toBeUndefined();
        });
        expect(elements.headerTitle(component)?.children[0]).toEqual(
          MULTI_CHOICE_QUESTION_CATEGORY,
        );
        const multiOptionQuestionNextButton = elements
          .questions(component)[0]
          .findByType(ModalSelectButton);
        const multiOptionQuestionOptions = elements
          .questions(component)[0]
          .findAllByType(MultiChoiceQuestionListItem);
        const indexOptionSelected = randomPositiveNumber(
          multiOptionQuestionOptions.length - 1,
          0,
        );
        fireEvent.press(multiOptionQuestionOptions[indexOptionSelected]);
        fireEvent.press(multiOptionQuestionNextButton);
        // second question is boolean
        await waitFor(() => {
          expect(elements.headerTitle(component)?.children[0]).toEqual(
            BOOLEAN_QUESTIONS_CATEGORY,
          );
        });
        await waitFor(() => {});
      });
    });

    describe('Restart button', () => {
      const questionsSequence = [
        QuizQuestionType.MULTIPLE,
        QuizQuestionType.BOOLEAN,
      ] as SequenceOfQuestions;

      it('should show the "restart-button" only after the first question', async () => {
        const mocks = mockQuizQuestionsQuerySuccessResponse(questionsSequence);
        const component = render(
          renderQuestions({
            mocks,
            numberOfQuestions: questionsSequence.length,
          }),
        );
        await waitFor(() => {
          expect(elements.questions(component).length).toEqual(
            questionsSequence.length,
          );
        });
        await waitFor(() => {
          expect(elements.headerRestartButton(component)).toBeNull();
        });
        // first question is multi-choice
        const multiOptionQuestionNextButton = elements
          .questions(component)[0]
          .findByType(ModalSelectButton);
        const multiOptionQuestionOptions = elements
          .questions(component)[0]
          .findAllByType(MultiChoiceQuestionListItem);
        const indexOptionSelected = randomPositiveNumber(
          multiOptionQuestionOptions.length - 1,
          0,
        );
        fireEvent.press(multiOptionQuestionOptions[indexOptionSelected]);
        fireEvent.press(multiOptionQuestionNextButton);
        // should only appear after the first question
        await waitFor(() => {
          expect(elements.headerRestartButton(component)).not.toBeNull();
        });
        await waitFor(() => {});
      });

      it('should "return" to the "first question when pressed"', async () => {
        const mocks = mockQuizQuestionsQuerySuccessResponse(questionsSequence);
        const component = render(
          renderQuestions({
            mocks,
            numberOfQuestions: questionsSequence.length,
          }),
        );
        await waitFor(() => {
          expect(elements.questions(component).length).toEqual(
            questionsSequence.length,
          );
        });
        // first question is multi-choice
        const multiOptionQuestionNextButton = elements
          .questions(component)[0]
          .findByType(ModalSelectButton);
        const multiOptionQuestionOptions = elements
          .questions(component)[0]
          .findAllByType(MultiChoiceQuestionListItem);
        const indexOptionSelected = randomPositiveNumber(
          multiOptionQuestionOptions.length - 1,
          0,
        );
        fireEvent.press(multiOptionQuestionOptions[indexOptionSelected]);
        fireEvent.press(multiOptionQuestionNextButton);
        // restart-header-button should only appear after the first question
        await waitFor(() => {
          expect(elements.headerRestartButton(component)).not.toBeNull();
        });
        // pressing the restart-header-button, so it will move the list to the first-index
        fireEvent.press(elements.headerRestartButton(component)!);
        // restart-header-button not appear in the first index
        await waitFor(() => {
          expect(elements.headerRestartButton(component)).toBeNull();
        });
        await waitFor(() => {});
      });
    });
  });

  describe('Answering the questions', () => {
    it('should call "navigate" correctly when "finishes to answer the questions"', async () => {
      jest.useFakeTimers();
      const navigate = jest.fn();
      const questionsSequence = [
        QuizQuestionType.MULTIPLE,
        QuizQuestionType.BOOLEAN,
      ] as SequenceOfQuestions;
      const mocks = mockQuizQuestionsQuerySuccessResponse(questionsSequence);
      const component = render(
        renderQuestions({
          numberOfQuestions: questionsSequence.length,
          mocks,
          navigate,
        }),
      );
      await waitFor(() => {
        expect(elements.questions(component).length).toEqual(
          questionsSequence.length,
        );
      });
      // answering the first question (multi-choice)
      const indexMultiChoiceOptionSelected = randomPositiveNumber(
        elements.multiChoiceOptions(component).length - 1,
        0,
      );
      act(() => {
        fireEvent.press(
          elements.multiChoiceOptions(component)[
            indexMultiChoiceOptionSelected
          ],
        );
      });
      act(() => {
        fireEvent.press(elements.nextButtons(component)[0]);
      });
      // answering the second question (boolean)
      const randomNumber = randomPositiveNumber(1, 0);
      const booleanOptionSelected =
        randomNumber % 2 === 0
          ? elements.booleanTrueOption(component)
          : elements.booleanFalseOption(component);
      act(() => {
        fireEvent.press(booleanOptionSelected!);
      });
      expect(navigate).toBeCalledTimes(0);
      act(() => {
        fireEvent.press(elements.nextButtons(component)[1]);
      });
      const questions = mocks[0].result.data.quiz;
      const answers = [
        questions[0].options[indexMultiChoiceOptionSelected],
        randomNumber === 0 ? 'true' : 'false',
      ];
      expect(navigate).toBeCalledTimes(1);
      expect(navigate).toBeCalledWith(Routes.Quiz.RESULTS, {
        questions,
        answers,
      });
      await waitFor(() => {});
    });
  });
});
