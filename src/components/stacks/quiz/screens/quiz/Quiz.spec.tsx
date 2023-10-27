import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';

import { Translations } from '@i18n/tags';
import { Routes } from '@navigation';

import { MockedNavigator } from '../../../../../../__mocks__';
import { QuizProps } from '../../routes/route-params-types';
import { Quiz } from './Quiz';

const renderQuiz = (navigate = jest.fn()) => {
  const QuizComponent = (props: QuizProps) => (
    <Quiz
      {...props}
      navigation={{ ...props.navigation, navigate }}
      route={{
        name: Routes.Quiz.QUIZ,
        key: `${Routes.Quiz.QUIZ}-key`,
      }}
    />
  );
  return <MockedNavigator component={QuizComponent} />;
};

describe('Stacks/Quiz/Screens/Quiz', () => {
  const elements = {
    welcomeText: (api: RenderAPI) => api.getByTestId('quiz-welcome-text'),
    descriptionText: (api: RenderAPI) =>
      api.getByTestId('quiz-description-text'),
    challengeText: (api: RenderAPI) => api.getByTestId('quiz-challenge-text'),
    chooseQuestionsButton: (api: RenderAPI) =>
      api.getByTestId('rounded-button'),
    chooseQuestionsButtonText: (api: RenderAPI) =>
      api.getByTestId('rounded-button-text'),
  };

  it('should render the Quiz screen correctly', () => {
    const component = render(renderQuiz());
    expect(elements.welcomeText(component)).not.toBeNull();
    expect(elements.welcomeText(component).children[0]).toEqual(
      Translations.Quiz.QUIZ_WELCOME,
    );
    expect(elements.descriptionText(component)).not.toBeNull();
    expect(elements.descriptionText(component).children[0]).toEqual(
      Translations.Quiz.QUIZ_DESCRIPTION,
    );
    expect(elements.challengeText(component)).not.toBeNull();
    expect(elements.challengeText(component).children[0]).toEqual(
      Translations.Quiz.QUIZ_CHALLENGE,
    );
    expect(elements.chooseQuestionsButton(component)).not.toBeNull();
    expect(elements.chooseQuestionsButtonText(component)).not.toBeNull();
    expect(elements.chooseQuestionsButtonText(component).children[0]).toEqual(
      Translations.Quiz.QUIZ_CHOOSE_QUESTIONS,
    );
  });

  it('should call "navigate" correctly when presses the "CHOOSE-QUESTIONS" button', () => {
    const navigate = jest.fn();
    const component = render(renderQuiz(navigate));
    fireEvent.press(elements.chooseQuestionsButton(component));
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(Routes.Quiz.SETUP_QUESTIONS);
  });
});
