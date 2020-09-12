import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { ArticleLanguage } from 'types/schema';
import { dark } from 'styles/themes';

import timeTravel from '../../../../../../__mocks__/timeTravel';
import LanguageFilter, { ANIMATION_TIMING } from './LanguageFilter';
import languages from './languages';

const renderLanguageFilter = (
  lastFilterSelected: ArticleLanguage,
  onSelect = jest.fn(),
  onClose = jest.fn(),
) => (
  <ThemeProvider theme={dark}>
    <LanguageFilter
      lastLanguageSelected={lastFilterSelected}
      onSelectLanguage={onSelect}
      closeModal={onClose}
    />
  </ThemeProvider>
);

describe('Testing <LanguageFilter />', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render the list of items correctly', () => {
    const INDEX_SELECTED = 0;

    const { queryAllByTestId, getByTestId, getAllByTestId } = render(
      renderLanguageFilter(languages[INDEX_SELECTED].id),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('languages-list')).not.toBe(null);

    const { initialNumToRender } = getByTestId('languages-list').props;

    expect(getAllByTestId('language-filter-list-item').length).toBe(initialNumToRender);

    expect(
      queryAllByTestId('language-text').every((languageItem, index) => {
        return languageItem.children[0].split(':')[3] === languages[index].name;
      }),
    ).toBe(true);
  });

  it('should render the selected item correctly', () => {
    const INDEX_SELECTED = 1;

    const { getByTestId } = render(renderLanguageFilter(languages[INDEX_SELECTED].id));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('languages-list').props.initialScrollIndex).toBe(INDEX_SELECTED);

    expect(getByTestId('icon')).not.toBeNull();
  });

  it('should call onSelectLanguage when the Select Button is pressed with a different language than the one received', () => {
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

  it('should not call onSelectLanguage when press Select Button when the language selected is the same of the one received as lastLanguageSelected', () => {
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
