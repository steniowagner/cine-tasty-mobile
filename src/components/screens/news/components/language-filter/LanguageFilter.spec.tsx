import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { ArticleLanguage } from 'types/schema';
import theme from 'styles/theme';

import timeTravel, { setupTimeTravel } from '../../../../../../__mocks__/timeTravel';
import LanguageFilter, { ANIMATION_TIMING } from './LanguageFilter';
import languages from './languages';

const renderLanguageFilter = (
  lastFilterSelected: ArticleLanguage,
  onSelect = jest.fn(),
) => (
  <ThemeProvider theme={theme}>
    <LanguageFilter
      lastLanguageSelected={lastFilterSelected}
      onSelectLanguage={onSelect}
      closeModal={jest.fn()}
    />
  </ThemeProvider>
);

describe('Testing <LanguageFilter />', () => {
  afterEach(cleanup);

  beforeEach(() => {
    setupTimeTravel();
  });

  it('should render the list of items correctly', () => {
    const INDEX_SELECTED = (Math.random() * (languages.length - 1 - 0 + 1)) << 0;

    const { getByTestId, getAllByTestId } = render(
      renderLanguageFilter(languages[INDEX_SELECTED].id),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('languages-list')).not.toBe(null);

    expect(getByTestId('languages-list').props.data.length).toEqual(languages.length);

    expect(getAllByTestId('language-filter-list-item').length).toBeLessThanOrEqual(
      languages.length,
    );
  });

  it('should render the selected item correctly', () => {
    const INDEX_SELECTED = (Math.random() * (languages.length - 1 - 0 + 1)) << 0;

    const { getByTestId } = render(renderLanguageFilter(languages[INDEX_SELECTED].id));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('languages-list').props.initialScrollIndex).toBe(INDEX_SELECTED);

    expect(getByTestId('icon')).not.toBeNull();
  });

  it('should call "onSelectLanguage" when the "select-button" is pressed with a different language than the one received', () => {
    const initialIndexSelected = 0;
    const nextItemSelected = initialIndexSelected + 1;
    const onSelect = jest.fn();

    const { getAllByTestId, getByTestId } = render(
      renderLanguageFilter(languages[initialIndexSelected].id, onSelect),
    );

    fireEvent.press(getAllByTestId('language-filter-list-item')[nextItemSelected]);

    fireEvent.press(getByTestId('select-button'));

    act(() => {
      timeTravel(ANIMATION_TIMING);
    });

    expect(onSelect).toHaveBeenCalledTimes(1);

    expect(onSelect).toHaveBeenCalledWith(languages[nextItemSelected].id);
  });

  it('should not call "onSelectLanguage" when press "select-button" when the language selected is the same of the one received as "lastLanguageSelected"', () => {
    const initialIndexSelected = 0;
    const onSelect = jest.fn();

    const { getAllByTestId, getByTestId } = render(
      renderLanguageFilter(languages[initialIndexSelected].id, onSelect),
    );

    fireEvent.press(getAllByTestId('language-filter-list-item')[initialIndexSelected]);

    fireEvent.press(getByTestId('select-button'));

    act(() => {
      timeTravel(ANIMATION_TIMING);
    });

    expect(onSelect).toHaveBeenCalledTimes(0);
  });
});
