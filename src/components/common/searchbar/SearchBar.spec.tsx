import React from 'react';
import { fireEvent, render } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';

import { dark } from 'styles/themes';

import SearchBar, { Props } from './SearchBar';

const renderSearchBar = ({
  onTypeSearchQuery,
  onPressSearch,
  onPressClose,
  placeholder,
}: Props) => (
  <ThemeProvider
    theme={dark}
  >
    <SearchBar
      onTypeSearchQuery={onTypeSearchQuery}
      onPressSearch={onPressSearch}
      onPressClose={onPressClose}
      placeholder={placeholder}
    />
  </ThemeProvider>
);

describe('Testing <SearchBar />', () => {
  it('should render correctly', () => {
    const placeholder = 'some placeholder';

    const { getByTestId } = render(
      renderSearchBar({
        onTypeSearchQuery: jest.fn(),
        onPressSearch: jest.fn(),
        onPressClose: jest.fn(),
        placeholder,
      }),
    );

    expect(getByTestId('searchbar-wrapper')).not.toBeNull();
    expect(getByTestId('header-icon-button-wrapper')).not.toBeNull();
    expect(getByTestId('icon').props.name).toEqual('close');
    expect(getByTestId('search-input').props.placeholder).toEqual(placeholder);
  });

  it('should call onTypeSearchQuery when type some text on the input with the text-typed', () => {
    const onTypeSearchQuery = jest.fn();
    const valueTyped = 'typing...';

    const { getByTestId } = render(
      renderSearchBar({
        onPressSearch: jest.fn(),
        onPressClose: jest.fn(),
        onTypeSearchQuery,
        placeholder: '',
      }),
    );

    fireEvent(getByTestId('search-input'), 'onChangeText', valueTyped);

    expect(onTypeSearchQuery).toHaveBeenCalledTimes(1);
    expect(onTypeSearchQuery).toHaveBeenCalledWith(valueTyped);
  });

  it('should call onPressSearch when press the "search" key on the keyboard', () => {
    const onPressSearch = jest.fn();

    const { getByTestId } = render(
      renderSearchBar({
        onTypeSearchQuery: jest.fn(),
        onPressClose: jest.fn(),
        placeholder: '',
        onPressSearch,
      }),
    );

    fireEvent(getByTestId('search-input'), 'onSubmitEditing');

    expect(onPressSearch).toHaveBeenCalledTimes(1);
  });

  it('should call onPressClose when press the "close" icon-button', () => {
    const onPressClose = jest.fn();

    const { getByTestId } = render(
      renderSearchBar({
        onTypeSearchQuery: jest.fn(),
        onPressSearch: jest.fn(),
        placeholder: '',
        onPressClose,
      }),
    );

    fireEvent.press(getByTestId('header-icon-button-wrapper'));

    expect(onPressClose).toHaveBeenCalledTimes(1);
  });
});