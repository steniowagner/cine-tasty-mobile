import React from 'react';
import { fireEvent, cleanup, render, act } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';
import MockDate from 'mockdate';

import { ArticleLanguage } from 'types/schema';
import { dark } from 'styles/themes';

import timeTravel, { setupTimeTravel } from '../../../../../../__mocks__/timeTravel';
import LanguageFilter, { ANIMATION_TIMING } from './LanguageFilter';
import LanguageListItem from './list-item/LanguageListItem';
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
      onCloseModal={onClose}
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

    const { getAllByType, getByTestId, getAllByTestId } = render(
      renderLanguageFilter(languages[INDEX_SELECTED].id),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('languages-list')).not.toBe(null);

    const { initialNumToRender } = getByTestId('languages-list').props;

    expect(getAllByTestId('language-filter-list-item').length).toBe(initialNumToRender);

    expect(
      getAllByType(LanguageListItem).every((languageItem, index) => {
        const language = languageItem.props.name.split(':')[3];

        return language === languages[index].name;
      }),
    ).toBe(true);
  });

  it('should render the selected item correctly', () => {
    const INDEX_SELECTED = 1;

    const { getAllByType, getByTestId } = render(
      renderLanguageFilter(languages[INDEX_SELECTED].id),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('languages-list').props.initialScrollIndex).toBe(INDEX_SELECTED);

    expect(getAllByType(LanguageListItem)[0].props.isSelected).toBe(true);
  });

  it('should change the isSelected prop when the item is pressed', () => {
    const INDEX_NEW_ITEM_SELECTED = 2;
    const INDEX_SELECTED = 0;

    const { getAllByType, getByTestId } = render(
      renderLanguageFilter(languages[INDEX_SELECTED].id),
    );

    act(() => {
      jest.runAllTimers();
    });

    const newItemSelected = getAllByType(LanguageListItem)[INDEX_NEW_ITEM_SELECTED];

    expect(getByTestId('languages-list').props.initialScrollIndex).toBe(INDEX_SELECTED);

    expect(getAllByType(LanguageListItem)[0].props.isSelected).toBe(true);

    fireEvent.press(newItemSelected);

    expect(newItemSelected.props.isSelected).toBe(true);

    expect(getAllByType(LanguageListItem)[0].props.isSelected).toBe(false);

    expect(
      getAllByType(LanguageListItem)
        .filter((_, index) => index !== INDEX_NEW_ITEM_SELECTED)
        .every(languageItem => languageItem.props.isSelected === false),
    ).toBe(true);
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

  it('should call onCloseModal when user press out of the card', () => {
    const onClose = jest.fn();
    const INDEX_SELECTED = 1;

    const { getByTestId } = render(
      renderLanguageFilter(languages[INDEX_SELECTED].id, undefined, onClose),
    );

    fireEvent.press(getByTestId('hide-filter-button'));

    act(() => {
      timeTravel(ANIMATION_TIMING);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
