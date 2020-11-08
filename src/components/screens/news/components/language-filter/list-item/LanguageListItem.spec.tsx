import React from 'react';
import { fireEvent, cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { dark } from 'styles/themes';

import LanguageListItem from './LanguageListItem';
import languages from '../languages';

const renderLanguageFilter = (isSelected: boolean, onPress = jest.fn()) => (
  <ThemeProvider theme={dark}>
    <LanguageListItem
      name={languages[0].name}
      Flag={languages[0].Flag}
      isSelected={isSelected}
      onPress={onPress}
    />
  </ThemeProvider>
);

describe('Testing <LangugeListItem />', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly when is selected', () => {
    const { getByTestId } = render(renderLanguageFilter(true));

    expect(getByTestId('icon')).not.toBeNull();

    expect(getByTestId('outter-flag-wrapper').props.isSelected).toBe(true);
  });

  it('should render correctly when is not selected', () => {
    const { queryByTestId, getByTestId } = render(renderLanguageFilter(false));

    expect(queryByTestId('icon')).toBeNull();

    expect(getByTestId('outter-flag-wrapper').props.isSelected).toBe(false);
  });

  it('should call onPress when is pressed', () => {
    const onPress = jest.fn();

    const { getAllByTestId } = render(renderLanguageFilter(false, onPress));

    fireEvent.press(getAllByTestId('language-filter-list-item')[0]);

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
