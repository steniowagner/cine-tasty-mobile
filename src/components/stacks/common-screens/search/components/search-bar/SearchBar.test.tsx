import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes';

import { SearchBar } from './SearchBar';
import { RenderAPI, fireEvent, render } from '@testing-library/react-native';

const PLACEHOLDER = 'PLACEHOLDER';

type RenderSearchBarParams = {
  onTypeSearchQuery?: jest.Mock;
  onPressSearch?: jest.Mock;
  onPressClose?: jest.Mock;
};

const renderSearchBar = (params: RenderSearchBarParams) => (
  <ThemeProvider theme={theme}>
    <SearchBar
      placeholder={PLACEHOLDER}
      onTypeSearchQuery={params.onTypeSearchQuery || jest.fn()}
      onPressSearch={params.onPressSearch || jest.fn()}
      onPressClose={params.onPressClose || jest.fn()}
    />
  </ThemeProvider>
);

describe('Common-screens/Search/SearchBar', () => {
  const elements = {
    closeButton: (api: RenderAPI) =>
      api.getByTestId('header-icon-button-wrapper-close'),
    input: (api: RenderAPI) => api.getByTestId('search-input'),
  };

  describe('Rendering', () => {
    it('should show the "placeholder" correctly', () => {
      const component = render(renderSearchBar({}));
      expect(elements.input(component).props.placeholder).toEqual(PLACEHOLDER);
    });
  });

  describe('Pressing', () => {
    it('should call "onPressClose" when "close the search"', () => {
      const onPressClose = jest.fn();
      const component = render(
        renderSearchBar({
          onPressClose,
        }),
      );
      expect(onPressClose).toBeCalledTimes(0);
      fireEvent.press(elements.closeButton(component));
      expect(onPressClose).toBeCalledTimes(1);
    });
  });

  describe('Inputing', () => {
    it('should call "onTypeSearchQuery" correctly when change the "input-content"', () => {
      const onTypeSearchQuery = jest.fn();
      const content = 'SOME_CONTENT_TYPED';
      const component = render(
        renderSearchBar({
          onTypeSearchQuery,
        }),
      );
      expect(onTypeSearchQuery).toBeCalledTimes(0);
      fireEvent(elements.input(component), 'onChangeText', content);
      expect(onTypeSearchQuery).toBeCalledTimes(1);
      expect(onTypeSearchQuery).toBeCalledWith(content);
    });

    it('should call "onSubmitEditing" correctly when press the "keyboard-search-cta"', () => {
      const onPressSearch = jest.fn();
      const component = render(
        renderSearchBar({
          onPressSearch,
        }),
      );
      expect(onPressSearch).toBeCalledTimes(0);
      fireEvent(elements.input(component), 'onSubmitEditing');
      expect(onPressSearch).toBeCalledTimes(1);
    });
  });
});
