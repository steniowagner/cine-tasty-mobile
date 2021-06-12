import React from 'react';
import { Alert } from 'react-native';
import { cleanup, fireEvent, render } from '@testing-library/react-native';

import { navigation } from '@mocks/ReactNavigation';
import { ThemeContextProvider } from '@providers';
import * as TRANSLATIONS from '@i18n/tags';

jest.spyOn(Alert, 'alert');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'ptBR' },
    t: (key: string) => key,
  }),
}));

import SetupQuestions from './SetupQuestions';

const getNavigationParam = (navigate = jest.fn) => ({
  ...navigation,
  navigate,
});

const renderSetupQuestions = (navigate = jest.fn) => (
  <ThemeContextProvider>
    <SetupQuestions navigation={getNavigationParam(navigate)} />
  </ThemeContextProvider>
);

describe('Testing <SetupQuestions />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(cleanup);

  it('should not navigate to Questions when the language is other than english', () => {
    const navigate = jest.fn();

    const { getByTestId } = render(renderSetupQuestions(navigate));

    fireEvent.press(getByTestId('rounded-button'));

    expect(navigate).toHaveBeenCalledTimes(0);
  });

  it('should show an alert correctly when the user tries to start the quiz and the language is other than english', () => {
    const { getByTestId } = render(renderSetupQuestions());

    fireEvent.press(getByTestId('rounded-button'));

    expect((Alert.alert as jest.Mock).mock.calls[0][0]).toEqual(
      TRANSLATIONS.LANGUAGE_WARNING_QUIZ_TITLE,
    );

    expect((Alert.alert as jest.Mock).mock.calls[0][1]).toEqual(
      TRANSLATIONS.LANGUAGE_WARNING_QUIZ_DESCRIPTION,
    );

    expect((Alert.alert as jest.Mock).mock.calls[0][2][0].text).toEqual(
      TRANSLATIONS.LANGUAGE_WARNING_QUIZ_NEGATIVE_ACTION,
    );

    expect((Alert.alert as jest.Mock).mock.calls[0][2][1].text).toEqual(
      TRANSLATIONS.LANGUAGE_WARNING_QUIZ_POSITIVE_ACTION,
    );
  });
});
