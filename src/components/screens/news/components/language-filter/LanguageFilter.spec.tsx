import React from 'react';
import {
  fireEvent, cleanup, render, act,
} from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';

import { ArticleLanguage } from '../../../../../types/schema';
import { dark } from '../../../../../styles/themes';
import LanguageListItem from './LanguageListItem';
import LanguageFilter from './LanguageFilter';
import languages from './languages';

jest.useFakeTimers();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const renderLanguageFilter = (
  lastFilterSelected: ArticleLanguage,
  onSelected = jest.fn(),
) => (
  <ThemeProvider
    theme={dark}
  >
    <LanguageFilter
      lastFilterSelected={lastFilterSelected}
      onSelect={onSelected}
    />
  </ThemeProvider>
);

describe('Testing LanguageFilter', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the list of items correctly', () => {
    const INDEX_SELECTED = 0;

    const { getAllByType, getByTestId } = render(
      renderLanguageFilter(languages[INDEX_SELECTED].id),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('languages-list')).not.toBe(null);

    const { initialNumToRender } = getByTestId('languages-list').props;

    expect(getAllByType(LanguageListItem).length).toBe(initialNumToRender);

    expect(
      getAllByType(LanguageListItem).every((languageItem, index) => {
        const language = languageItem.props.name.split(':')[2];

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

    expect(
      getAllByType(LanguageListItem)
        .filter((_, index) => index !== INDEX_NEW_ITEM_SELECTED)
        .every((languageItem) => languageItem.props.isSelected === false),
    ).toBe(true);
  });

  it('should call onSelect when the SELECT button is pressed', () => {
    const onSelect = jest.fn();
    const INDEX_SELECTED = 2;

    const { getByTestId } = render(
      renderLanguageFilter(languages[INDEX_SELECTED].id, onSelect),
    );

    const selectButton = getByTestId('select-button');

    fireEvent.press(selectButton);

    act(() => {
      jest.runAllTimers();
    });

    expect(onSelect).toHaveBeenCalledTimes(1);

    expect(onSelect).toHaveBeenCalledWith(languages[INDEX_SELECTED].id);
  });
});
