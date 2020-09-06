import React from 'react';
import { fireEvent, cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { dark } from 'styles/themes';

import LOCAL_ROUTES from '../routes/route-names';

import Quiz, {
  I18N_CHOOSE_QUESTIONS_REF,
  I18N_DESCRIPTION_REF,
  I18N_CHALLENGE_REF,
  I18N_WELCOME_REF,
} from './Quiz';

const navigate = jest.fn();

const navigation = {
  navigate,
};

const renderQuiz = () => (
  <ThemeProvider theme={dark}>
    <Quiz navigation={navigation} />
  </ThemeProvider>
);

describe('Testing <Quiz />', () => {
  afterEach(cleanup);

  it('should render the Quiz screen correctly', () => {
    const { queryByText } = render(renderQuiz());

    expect(queryByText(I18N_CHOOSE_QUESTIONS_REF)).not.toBeNull();
    expect(queryByText(I18N_DESCRIPTION_REF)).not.toBeNull();
    expect(queryByText(I18N_CHALLENGE_REF)).not.toBeNull();
    expect(queryByText(I18N_WELCOME_REF)).not.toBeNull();
  });

  it('should call the navigate function correctly when the user press the "CHOOSE-QUESTIONS" button', () => {
    const { queryByTestId } = render(renderQuiz());

    fireEvent.press(queryByTestId('rounded-button'));

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith(LOCAL_ROUTES.SETUP_QUESTIONS.id);
  });
});
