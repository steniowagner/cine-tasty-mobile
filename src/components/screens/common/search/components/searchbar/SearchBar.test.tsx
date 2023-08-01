import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {RenderAPI, fireEvent, render} from '@testing-library/react-native';

import {dark as theme} from '@styles/themes';

import {SearchBar, SearchBarProps} from './SearchBar';

const renderSearchBar = (props: SearchBarProps) => (
  <ThemeProvider theme={theme}>
    <SearchBar {...props} />
  </ThemeProvider>
);

describe('<SearchBar />', () => {
  const elements = {
    input: (api: RenderAPI) => api.queryByTestId('search-input'),
    closeButton: (api: RenderAPI) =>
      api.queryByTestId('header-icon-button-wrapper-close'),
  };

  describe('Rendering', () => {
    it('should show the placeholder correctly', () => {
      const placeholder = 'SOME_PLACEHOLDER';
      const component = render(
        renderSearchBar({
          onTypeSearchQuery: jest.fn(),
          onPressClose: jest.fn(),
          placeholder,
        }),
      );
      expect(elements.input(component).props.placeholder).toEqual(placeholder);
    });
  });

  describe('User events', () => {
    it('should call "onPressClose" when the user presses the "close-button"', () => {
      const onPressClose = jest.fn();
      const component = render(
        renderSearchBar({
          onTypeSearchQuery: jest.fn(),
          placeholder: 'SOME_PLACEHOLDER',
          onPressClose,
        }),
      );
      expect(onPressClose).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.closeButton(component));
      expect(onPressClose).toHaveBeenCalledTimes(1);
    });

    it('should call "onTypeSearchQuery" after the user type something', () => {
      const onTypeSearchQuery = jest.fn();
      const content = 'SOME_CONTENT_TYPED';
      const component = render(
        renderSearchBar({
          placeholder: 'SOME_PLACEHOLDER',
          onPressClose: jest.fn(),
          onTypeSearchQuery,
        }),
      );
      expect(onTypeSearchQuery).toHaveBeenCalledTimes(0);
      fireEvent(elements.input(component), 'onChangeText', content);
      expect(onTypeSearchQuery).toHaveBeenCalledTimes(1);
      expect(onTypeSearchQuery).toHaveBeenCalledWith(content);
    });

    it('should call "onSubmitEditing" after the user type something', () => {
      const onPressSearch = jest.fn();
      const component = render(
        renderSearchBar({
          placeholder: 'SOME_PLACEHOLDER',
          onPressClose: jest.fn(),
          onTypeSearchQuery: jest.fn(),
          onPressSearch,
        }),
      );
      expect(onPressSearch).toHaveBeenCalledTimes(0);
      fireEvent(elements.input(component), 'onSubmitEditing');
      expect(onPressSearch).toHaveBeenCalledTimes(1);
    });
  });
});
