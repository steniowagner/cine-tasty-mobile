import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { fireEvent, render, act } from 'react-native-testing-library';

import { ThemeID } from 'types';
import ThemeContext, { ThemeContextProvider } from './ThemeContextProvider';

jest.mock('utils/async-storage-adapter/AsyncStorageAdapter');

jest.useFakeTimers();

const {
  getItemFromStorage,
} = require('../../utils/async-storage-adapter/AsyncStorageAdapter');

describe('<ThemeContextProvider />', () => {
  describe('Testing the first render', () => {
    it('should have the Dark-theme set by default', () => {
      const TestComponent = () => {
        const { themeID } = useContext(ThemeContext);

        return (
          <Text
            testID="testText"
          >
            {themeID}
          </Text>
        );
      };

      const { getByText } = render(
        <ThemeContextProvider>
          <TestComponent />
        </ThemeContextProvider>,
      );

      act(() => {
        jest.runAllTimers();
      });

      expect(getByText(ThemeID.DARK)).not.toBeNull();
    });
  });

  describe('Testing the onToggleTheme()', () => {
    it('should toggle the theme to Light-theme when the current theme is the Dark-theme', () => {
      getItemFromStorage.mockImplementationOnce(() => ThemeID.DARK);

      const buttonID = 'buttonID';
      const textID = 'textID';

      const TestComponent = () => {
        const { onToggleTheme, themeID } = useContext(ThemeContext);

        return (
          <TouchableOpacity
            onPress={onToggleTheme}
            testID={buttonID}
          >
            <Text
              testID={textID}
            >
              {themeID}
            </Text>
          </TouchableOpacity>
        );
      };

      const { getByTestId } = render(
        <ThemeContextProvider>
          <TestComponent />
        </ThemeContextProvider>,
      );

      act(() => {
        jest.runAllTimers();
      });

      expect(getByTestId(textID).props.children).toEqual(ThemeID.DARK);

      fireEvent.press(getByTestId(buttonID));

      expect(getByTestId(textID).props.children).toEqual(ThemeID.LIGHT);
    });

    it('should toggle the theme to Dark-theme when the current theme is the Light-theme', () => {
      getItemFromStorage.mockImplementationOnce(() => ThemeID.LIGHT);

      const buttonID = 'buttonID';
      const textID = 'textID';

      const TestComponent = () => {
        const { onToggleTheme, themeID } = useContext(ThemeContext);

        return (
          <TouchableOpacity
            onPress={onToggleTheme}
            testID={buttonID}
          >
            <Text
              testID={textID}
            >
              {themeID}
            </Text>
          </TouchableOpacity>
        );
      };

      const { getByTestId } = render(
        <ThemeContextProvider>
          <TestComponent />
        </ThemeContextProvider>,
      );

      act(() => {
        jest.runAllTimers();
      });

      expect(getByTestId(textID).props.children).toEqual(ThemeID.LIGHT);

      fireEvent.press(getByTestId(buttonID));

      expect(getByTestId(textID).props.children).toEqual(ThemeID.DARK);
    });
  });
});
