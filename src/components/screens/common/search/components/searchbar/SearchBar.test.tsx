import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';

import MockedNavigation from '@mocks/MockedNavigator';
import {ThemeContextProvider} from '@providers';

import SearchBar from './SearchBar';

jest.mock('react-native-status-bar-height', () => ({
  getStatusBarHeight: () => 10,
}));

const VALUE_TYPED = 'SOME VALUE TYPED...';
const PLACEHOLDER = 'SOME PLACEHOLDER';

type RenderSearchBarProps = {
  onTypeSearchQuery: (query: string) => void;
  onPressSearch?: () => void;
  onPressClose: () => void;
};

const renderSearchBar = (props: RenderSearchBarProps) => {
  const SearchBarIOS = () => (
    <ThemeContextProvider>
      <SearchBar
        onTypeSearchQuery={props.onTypeSearchQuery}
        onPressSearch={props.onPressSearch}
        onPressClose={props.onPressClose}
        placeholder={PLACEHOLDER}
      />
    </ThemeContextProvider>
  );

  return <MockedNavigation component={SearchBarIOS} />;
};

describe('<SearchBar /> - [iOS]', () => {
  const elements = {
    wrapper: (api: RenderAPI) => api.queryByTestId('searchbar-wrapper'),
    closeButton: (api: RenderAPI) =>
      api.queryByTestId('header-icon-button-wrapper-close'),
    input: (api: RenderAPI) => api.queryByTestId('search-input'),
  };

  describe('Render', () => {
    it('should render correctly', () => {
      const component = render(
        renderSearchBar({
          onTypeSearchQuery: jest.fn(),
          onPressSearch: jest.fn(),
          onPressClose: jest.fn(),
        }),
      );
      expect(elements.wrapper(component)).not.toBeNull();
      expect(elements.closeButton(component)).not.toBeNull();
      expect(elements.input(component).props.placeholder).toEqual(PLACEHOLDER);
    });
  });

  describe('Events', () => {
    it('should call "onTypeSearchQuery" when type some text on the input with the text-typed', () => {
      const onTypeSearchQuery = jest.fn();
      const component = render(
        renderSearchBar({
          onPressSearch: jest.fn(),
          onPressClose: jest.fn(),
          onTypeSearchQuery,
        }),
      );
      fireEvent(elements.input(component), 'onChangeText', VALUE_TYPED);
      expect(onTypeSearchQuery).toHaveBeenCalledTimes(1);
      expect(onTypeSearchQuery).toHaveBeenCalledWith(VALUE_TYPED);
    });

    it('should call "onPressSearch" when press the "search" key on the keyboard', () => {
      const onPressSearch = jest.fn();
      const component = render(
        renderSearchBar({
          onTypeSearchQuery: jest.fn(),
          onPressClose: jest.fn(),
          onPressSearch,
        }),
      );
      fireEvent(elements.input(component), 'onSubmitEditing');
      expect(onPressSearch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Press', () => {
    it('should call "onPressClose" when press the "close" icon-button', () => {
      const onPressClose = jest.fn();
      const component = render(
        renderSearchBar({
          onTypeSearchQuery: jest.fn(),
          onPressSearch: jest.fn(),
          onPressClose,
        }),
      );
      fireEvent.press(elements.closeButton(component));
      expect(onPressClose).toHaveBeenCalledTimes(1);
    });
  });
});
