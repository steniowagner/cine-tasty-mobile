import React from 'react';
import {
  fireEvent,
  cleanup,
  render,
  RenderAPI,
} from '@testing-library/react-native';

import MockedNavigation from '@mocks/MockedNavigator';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';

import {Quiz} from './Quiz';

const renderQuiz = (navigate = jest.fn()) => {
  const QuizComponent = ({navigation}) => (
    <Quiz
      navigation={{...navigation, navigate}}
      route={{
        name: Routes.Quiz.QUIZ,
        key: `${Routes.Quiz.QUIZ}-key`,
      }}
    />
  );
  return <MockedNavigation component={QuizComponent} />;
};

describe('<Quiz />', () => {
  const elements = {
    welcomeText: (api: RenderAPI) => api.queryByTestId('quiz-welcome-text'),
    descriptionText: (api: RenderAPI) =>
      api.queryByTestId('quiz-description-text'),
    challengeText: (api: RenderAPI) => api.queryByTestId('quiz-challenge-text'),
    chooseQuestionsButton: (api: RenderAPI) =>
      api.queryByTestId('rounded-button'),
    chooseQuestionsButtonText: (api: RenderAPI) =>
      api.queryByTestId('rounded-button-text'),
  };

  afterEach(cleanup);

  it('should render the Quiz screen correctly', () => {
    const component = render(renderQuiz());
    expect(elements.welcomeText(component)).not.toBeNull();
    expect(elements.welcomeText(component).children[0]).toEqual(
      Translations.Tags.QUIZ_WELCOME,
    );
    expect(elements.descriptionText(component)).not.toBeNull();
    expect(elements.descriptionText(component).children[0]).toEqual(
      Translations.Tags.QUIZ_DESCRIPTION,
    );
    expect(elements.challengeText(component)).not.toBeNull();
    expect(elements.challengeText(component).children[0]).toEqual(
      Translations.Tags.QUIZ_CHALLENGE,
    );
    expect(elements.chooseQuestionsButton(component)).not.toBeNull();
    expect(elements.chooseQuestionsButtonText(component)).not.toBeNull();
    expect(elements.chooseQuestionsButtonText(component).children[0]).toEqual(
      Translations.Tags.QUIZ_CHOOSE_QUESTIONS,
    );
  });

  it('should call navigate to "SETUP_QUESTIONS" screen when the user presses the "CHOOSE-QUESTIONS" button', () => {
    const navigate = jest.fn();
    const component = render(renderQuiz(navigate));
    fireEvent.press(elements.chooseQuestionsButton(component));
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(Routes.Quiz.SETUP_QUESTIONS);
  });
});
