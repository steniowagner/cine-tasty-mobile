import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  cleanup, fireEvent, render, act,
} from 'react-native-testing-library';
import MockDate from 'mockdate';

import { ANIMATION_TIMING } from 'components/common/custom-modal/CustomModal';
import { dark } from 'styles/themes';

import { navigation } from '../../../../../../__mocks__/ReactNavigation';
import { INITIAL_NUMBER_QUESTIONS } from './useSetupQuestions';
import { difficulties, categories, types } from './options';
import LOCAL_ROUTES from '../../routes/route-names';
import SetupQuestions from './SetupQuestions';

const renderSetupQuestions = (mockedNavigation = navigation) => (
  <ThemeProvider
    theme={dark}
  >
    <SetupQuestions
      navigation={mockedNavigation}
    />
  </ThemeProvider>
);

describe('Testing <SetupQuestions />', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.useFakeTimers();

    jest.clearAllMocks();

    MockDate.set(0);
  });

  describe('Testing the renders', () => {
    it('should render correctly with the default params', () => {
      const { getAllByTestId } = render(renderSetupQuestions());

      const [difficultySelected, categorySelected, typeSelected] = getAllByTestId(
        'option-value',
      );

      expect(difficultySelected.props.children.includes(difficulties[0].id)).toEqual(
        true,
      );

      expect(categorySelected.props.children.includes(categories[0].id)).toEqual(true);

      expect(typeSelected.props.children.includes(types[0].id)).toEqual(true);

      expect(getAllByTestId('default-text')[0].children[0]).toEqual(
        String(INITIAL_NUMBER_QUESTIONS),
      );
    });

    it('should render the difficulty selected correctly after the selection', () => {
      const INDEX_DIFFICULTY_SELECTED = 3;

      const { getByTestId, getAllByTestId } = render(renderSetupQuestions());

      const [difficultDropdown] = getAllByTestId('dropdown-button');

      fireEvent.press(difficultDropdown);

      act(() => {
        global.timeTravel(ANIMATION_TIMING);
      });

      expect(getByTestId('custom-modal')).not.toBe(null);

      fireEvent.press(getAllByTestId('option-list-item')[INDEX_DIFFICULTY_SELECTED]);

      fireEvent.press(getByTestId('select-button'));

      act(() => {
        global.timeTravel(ANIMATION_TIMING);
      });

      try {
        expect(getByTestId('custom-modal')).toBe(null);
      } catch (err) {
        expect(err.message.includes('No instances found')).toEqual(true);
      }

      const [difficultySelected] = getAllByTestId('option-value');

      expect(
        difficultySelected.props.children.includes(
          difficulties[INDEX_DIFFICULTY_SELECTED].id,
        ),
      ).toEqual(true);
    });

    it('should render the category selected correctly after the selection', () => {
      const INDEX_CATEGORY_SELECTED = 2;

      const { getByTestId, getAllByTestId } = render(renderSetupQuestions());

      const [, categoryDropdown] = getAllByTestId('dropdown-button');

      fireEvent.press(categoryDropdown);

      act(() => {
        global.timeTravel(ANIMATION_TIMING);
      });

      expect(getByTestId('custom-modal')).not.toBe(null);

      fireEvent.press(getAllByTestId('option-list-item')[INDEX_CATEGORY_SELECTED]);

      fireEvent.press(getByTestId('select-button'));

      act(() => {
        global.timeTravel(ANIMATION_TIMING);
      });

      try {
        expect(getByTestId('custom-modal')).toBe(null);
      } catch (err) {
        expect(err.message.includes('No instances found')).toEqual(true);
      }

      const [, optionSelected] = getAllByTestId('option-value');

      expect(
        optionSelected.props.children.includes(categories[INDEX_CATEGORY_SELECTED].id),
      ).toEqual(true);
    });

    it('should render the type selected correctly after the selection', () => {
      const INDEX_TYPE_SELECTED = 1;

      const { getByTestId, getAllByTestId } = render(renderSetupQuestions());

      const [, , typeDropdown] = getAllByTestId('dropdown-button');

      fireEvent.press(typeDropdown);

      act(() => {
        global.timeTravel(ANIMATION_TIMING);
      });

      expect(getByTestId('custom-modal')).not.toBe(null);

      fireEvent.press(getAllByTestId('option-list-item')[INDEX_TYPE_SELECTED]);

      fireEvent.press(getByTestId('select-button'));

      act(() => {
        global.timeTravel(ANIMATION_TIMING);
      });

      try {
        expect(getByTestId('custom-modal')).toBe(null);
      } catch (err) {
        expect(err.message.includes('No instances found')).toEqual(true);
      }

      const [, , typeSelected] = getAllByTestId('option-value');

      expect(typeSelected.props.children.includes(types[INDEX_TYPE_SELECTED].id)).toEqual(
        true,
      );
    });
  });

  describe('Testing the interactions', () => {
    it('should call navigate with the default parameters when press START QUIZ', () => {
      const navigate = jest.fn();

      const mockedNavigation = {
        ...navigation,
        navigate,
      };

      const { getByTestId } = render(renderSetupQuestions(mockedNavigation));

      fireEvent.press(getByTestId('rounded-button'));

      expect(navigate).toHaveBeenCalledTimes(1);

      expect(navigate).toBeCalledWith(LOCAL_ROUTES.QUESTIONS.id, {
        numberOfQuestions: INITIAL_NUMBER_QUESTIONS,
        difficulty: difficulties[0].value,
        category: categories[0].value,
        type: types[0].value,
      });
    });

    it('should call navigate with custom parameters when press START QUIZ', () => {
      const INDEX_DIFFICULTY_SELECTED = 3;
      const INDEX_CATEGORY_SELECTED = 2;
      const INDEX_TYPE_SELECTED = 1;
      const NUMBER_QUESTIONS = 5;

      const navigate = jest.fn();

      const mockedNavigation = {
        ...navigation,
        navigate,
      };

      const { getAllByTestId, getByTestId } = render(
        renderSetupQuestions(mockedNavigation),
      );

      const [difficultyDropdown, categoryDropdown, typeDropdown] = getAllByTestId(
        'dropdown-button',
      );

      fireEvent.press(difficultyDropdown);

      act(() => {
        global.timeTravel(ANIMATION_TIMING);
      });

      fireEvent.press(getAllByTestId('option-list-item')[INDEX_DIFFICULTY_SELECTED]);

      fireEvent.press(getByTestId('select-button'));

      act(() => {
        global.timeTravel(ANIMATION_TIMING);
      });

      fireEvent.press(categoryDropdown);

      act(() => {
        global.timeTravel(ANIMATION_TIMING);
      });

      fireEvent.press(getAllByTestId('option-list-item')[INDEX_CATEGORY_SELECTED]);

      fireEvent.press(getByTestId('select-button'));

      act(() => {
        global.timeTravel(ANIMATION_TIMING);
      });

      fireEvent.press(typeDropdown);

      act(() => {
        global.timeTravel(ANIMATION_TIMING);
      });

      fireEvent.press(getAllByTestId('option-list-item')[INDEX_TYPE_SELECTED]);

      fireEvent.press(getByTestId('select-button'));

      act(() => {
        global.timeTravel(ANIMATION_TIMING);
      });

      fireEvent(getByTestId('slider'), 'onValueChange', NUMBER_QUESTIONS);

      fireEvent.press(getByTestId('rounded-button'));

      expect(navigate).toHaveBeenCalledTimes(1);

      expect(navigate).toBeCalledWith(LOCAL_ROUTES.QUESTIONS.id, {
        numberOfQuestions: NUMBER_QUESTIONS,
        difficulty: difficulties[INDEX_DIFFICULTY_SELECTED].value,
        category: categories[INDEX_CATEGORY_SELECTED].value,
        type: types[INDEX_TYPE_SELECTED].value,
      });
    });
  });

  describe('Testing the items showed inside <CustomModal /> when a certain option is selected', () => {
    it('should show the corresponding options when the difficulty option is selected', () => {
      const { getAllByTestId, getByTestId } = render(renderSetupQuestions());

      const [difficultyOption] = getAllByTestId('dropdown-button');

      fireEvent.press(difficultyOption);

      act(() => {
        global.timeTravel(ANIMATION_TIMING);
      });

      expect(getByTestId('custom-modal')).not.toBe(null);

      const optionsList = getByTestId('options-list');

      expect(optionsList).not.toBe(null);

      expect(JSON.stringify(optionsList.props.data)).toStrictEqual(
        JSON.stringify(difficulties),
      );
    });

    it('should show the corresponding options when the category option is selected', () => {
      const { getAllByTestId, getByTestId } = render(renderSetupQuestions());

      const [, categoryOption] = getAllByTestId('dropdown-button');

      fireEvent.press(categoryOption);

      act(() => {
        global.timeTravel(ANIMATION_TIMING);
      });

      expect(getByTestId('custom-modal')).not.toBe(null);

      const optionsList = getByTestId('options-list');

      expect(optionsList).not.toBe(null);

      expect(JSON.stringify(optionsList.props.data)).toStrictEqual(
        JSON.stringify(categories),
      );
    });

    it('should show the corresponding options when the type option is selected', () => {
      const { getAllByTestId, getByTestId } = render(renderSetupQuestions());

      const [, , typeOptions] = getAllByTestId('dropdown-button');

      fireEvent.press(typeOptions);

      act(() => {
        global.timeTravel(ANIMATION_TIMING);
      });

      expect(getByTestId('custom-modal')).not.toBe(null);

      const optionsList = getByTestId('options-list');

      expect(optionsList).not.toBe(null);

      expect(JSON.stringify(optionsList.props.data)).toStrictEqual(JSON.stringify(types));
    });
  });
});
