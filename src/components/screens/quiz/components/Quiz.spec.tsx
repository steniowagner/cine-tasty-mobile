import React from 'react';
import { fireEvent, cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import * as TRANSLATIONS from 'i18n/tags';
import theme from 'styles/theme';

import LOCAL_ROUTES from '../routes/route-names';
import Quiz from './Quiz';

const renderQuiz = (navigate = jest.fn()) => (
  <ThemeProvider theme={theme}>
    <Quiz navigation={{ navigate }} />
  </ThemeProvider>
);

describe('Testing <Quiz />', () => {
  afterEach(cleanup);

  it('should render the Quiz screen correctly', () => {
    const { queryByText } = render(renderQuiz());

    expect(queryByText(TRANSLATIONS.QUIZ_CHOOSE_QUESTIONS)).not.toBeNull();

    expect(queryByText(TRANSLATIONS.QUIZ_DESCRIPTION)).not.toBeNull();

    expect(queryByText(TRANSLATIONS.QUIZ_CHALLENGE)).not.toBeNull();

    expect(queryByText(TRANSLATIONS.QUIZ_WELCOME)).not.toBeNull();
  });

  it('should call the navigate function correctly when the user press the "CHOOSE-QUESTIONS" button', () => {
    const navigate = jest.fn();

    const { queryByTestId } = render(renderQuiz(navigate));

    fireEvent.press(queryByTestId('rounded-button'));

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith(LOCAL_ROUTES.SETUP_QUESTIONS.id);
  });
});
