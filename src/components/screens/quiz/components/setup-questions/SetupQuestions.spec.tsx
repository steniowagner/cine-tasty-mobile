import React from 'react';
import { ThemeProvider } from 'styled-components';
import { cleanup, fireEvent, render } from '@testing-library/react-native';

import { CustomizedModalChildrenType } from 'types';
import * as TRANSLATIONS from 'i18n/tags';
import theme from 'styles/theme';

import { navigation } from '../../../../../../__mocks__/ReactNavigation';
import { INITIAL_NUMBER_QUESTIONS } from './useSetupQuestions';
import { difficulties, categories, types } from './options';
import LOCAL_ROUTES from '../../routes/route-names';
import SetupQuestions from './SetupQuestions';

const getNavigationParam = (navigate = jest.fn) => ({
  ...navigation,
  navigate,
});

const renderSetupQuestions = (navigate = jest.fn) => (
  <ThemeProvider theme={theme}>
    <SetupQuestions navigation={getNavigationParam(navigate)} />
  </ThemeProvider>
);

describe('Testing <SetupQuestions />', () => {
  afterEach(cleanup);

  it('should render correctly with the default params', () => {
    const { getAllByTestId, getByText } = render(renderSetupQuestions());

    const [difficultySelected, categorySelected, typeSelected] = getAllByTestId(
      'option-value',
    );

    expect(difficultySelected.props.children.includes(difficulties[0].id)).toEqual(true);

    expect(categorySelected.props.children.includes(categories[0].id)).toEqual(true);

    expect(typeSelected.props.children.includes(types[0].id)).toEqual(true);

    expect(getAllByTestId('default-text')[0].children[0]).toEqual(
      String(INITIAL_NUMBER_QUESTIONS),
    );

    expect(getByText(TRANSLATIONS.QUIZ_NUMBER_OF_QUESTIONS)).not.toBeNull();

    expect(getByText(TRANSLATIONS.QUIZ_DIFFICULTY)).not.toBeNull();

    expect(getByText(TRANSLATIONS.QUIZ_CATEGORY)).not.toBeNull();

    expect(getByText(TRANSLATIONS.QUIZ_TYPE)).not.toBeNull();
  });

  it('should navigate to CustomModal correctly when the user press the difficulty-dropdown', () => {
    const navigate = jest.fn();

    const { getAllByTestId } = render(renderSetupQuestions(navigate));

    const [difficultDropdown] = getAllByTestId('dropdown-button');

    fireEvent.press(difficultDropdown);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(typeof navigate.mock.calls[0][1].extraData.onPressSelect).toEqual('function');
    expect(navigate.mock.calls[0][1].extraData.dataset).toEqual(difficulties);
    expect(navigate.mock.calls[0][1].extraData.lastItemSelected).toEqual(0);
    expect(navigate.mock.calls[0][1].type).toEqual(
      CustomizedModalChildrenType.MEDIA_FILTER,
    );
    expect(navigate.mock.calls[0][1].headerText).toEqual(
      TRANSLATIONS.QUIZ_SET_DIFFICULTY,
    );
    expect(navigate.mock.calls[0][0]).toEqual('CUSTOM_MODAL');
  });

  it('should navigate to CustomModal correctly when the user press the category-dropdown', () => {
    const navigate = jest.fn();

    const { getAllByTestId } = render(renderSetupQuestions(navigate));

    const [, categoryDropdown] = getAllByTestId('dropdown-button');

    fireEvent.press(categoryDropdown);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(typeof navigate.mock.calls[0][1].extraData.onPressSelect).toEqual('function');
    expect(navigate.mock.calls[0][1].extraData.dataset).toEqual(categories);
    expect(navigate.mock.calls[0][1].extraData.lastItemSelected).toEqual(0);
    expect(navigate.mock.calls[0][1].type).toEqual(
      CustomizedModalChildrenType.MEDIA_FILTER,
    );
    expect(navigate.mock.calls[0][1].headerText).toEqual(TRANSLATIONS.QUIZ_SET_CATEGORY);
    expect(navigate.mock.calls[0][0]).toEqual('CUSTOM_MODAL');
  });

  it('should navigate to CustomModal correctly when the user press the type-dropdown', () => {
    const navigate = jest.fn();

    const { getAllByTestId } = render(renderSetupQuestions(navigate));

    const [, , typeDropdown] = getAllByTestId('dropdown-button');

    fireEvent.press(typeDropdown);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(typeof navigate.mock.calls[0][1].extraData.onPressSelect).toEqual('function');
    expect(navigate.mock.calls[0][1].extraData.dataset).toEqual(types);
    expect(navigate.mock.calls[0][1].extraData.lastItemSelected).toEqual(0);
    expect(navigate.mock.calls[0][1].type).toEqual(
      CustomizedModalChildrenType.MEDIA_FILTER,
    );
    expect(navigate.mock.calls[0][1].headerText).toEqual(TRANSLATIONS.QUIZ_SET_TYPE);
    expect(navigate.mock.calls[0][0]).toEqual('CUSTOM_MODAL');
  });

  it('should navigate to Questions with the selected params when the user press the "START QUIZ" button', () => {
    const navigate = jest.fn();

    const { getByTestId } = render(renderSetupQuestions(navigate));

    fireEvent.press(getByTestId('rounded-button'));

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toBeCalledWith(LOCAL_ROUTES.QUESTIONS.id, {
      numberOfQuestions: INITIAL_NUMBER_QUESTIONS,
      difficulty: difficulties[0].value,
      category: categories[0].value,
      type: types[0].value,
    });
  });
});
