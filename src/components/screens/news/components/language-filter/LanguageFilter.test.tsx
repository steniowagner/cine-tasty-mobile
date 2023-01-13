import React from 'react';
import {
  RenderAPI,
  fireEvent,
  cleanup,
  render,
  act,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import {dark as theme} from '@styles/themes/dark';
import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';

import {ITEM_LIST_HEIGHT} from './list-item/LanguageListItem.styles';
import LanguageFilter, {ANIMATION_TIMING} from './LanguageFilter';
import languages from './languages';

const renderLanguageFilter = (
  lastFilterSelected: SchemaTypes.ArticleLanguage,
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

const makeSelectedLanguageIndex = () =>
  Math.floor(Math.random() * (languages.length - 1));

describe('<LanguageFilter />', () => {
  const elements = {
    languageList: (api: RenderAPI) => api.queryByTestId('languages-list'),
    selectButton: (api: RenderAPI) => api.queryByTestId('select-button'),
    languageListItems: (api: RenderAPI) =>
      api.queryAllByTestId('language-filter-list-item'),
    languageFlagsIcons: (api: RenderAPI) => api.queryAllByTestId(/icon-/),
    languageFlagsTexts: (api: RenderAPI) =>
      api.queryAllByTestId('language-text'),
  };

  afterEach(cleanup);

  beforeEach(() => {
    setupTimeTravel();
    jest.useFakeTimers();
  });

  it('should render the list of items correctly', () => {
    const indexLanguageSelected = makeSelectedLanguageIndex();
    const component = render(
      renderLanguageFilter(languages[indexLanguageSelected].id),
    );
    act(() => {
      jest.runAllTimers();
    });
    expect(elements.languageList(component)).not.toBeNull();
    expect(elements.languageListItems(component).length).toEqual(
      languages.length,
    );
  });

  it('should render the list on the correct sequence', () => {
    const component = render(renderLanguageFilter(undefined));
    act(() => {
      jest.runAllTimers();
    });
    for (let i = 0; i < languages.length; i++) {
      expect(elements.languageFlagsIcons(component)[i].props.testID).toEqual(
        `icon-${languages[i].flag}`,
      );
      expect(elements.languageFlagsTexts(component)[i].children[0]).toEqual(
        `${Translations.Tags.NEWS_LANGUAGES}:${languages[i].name}`,
      );
    }
  });

  it('should render the "language-list" on the position of the "language-selected"', () => {
    const mockScrollTo = jest.fn();
    jest.spyOn(React, 'useRef').mockReturnValue({
      current: {scrollTo: mockScrollTo},
    });
    const indexLanguageSelected = makeSelectedLanguageIndex();
    render(renderLanguageFilter(languages[indexLanguageSelected].id));
    act(() => {
      jest.runAllTimers();
    });
    expect(mockScrollTo).toHaveBeenCalledTimes(1);
    expect(mockScrollTo).toHaveBeenCalledWith({
      x: 0,
      y: indexLanguageSelected * ITEM_LIST_HEIGHT,
      animated: true,
    });
  });

  it('should call "onSelectLanguage" when the "select-button" is pressed with a different language than the one received', () => {
    const initialIndexSelected = 0;
    const nextItemSelected = initialIndexSelected + 1;
    const onSelect = jest.fn();
    const component = render(
      renderLanguageFilter(languages[initialIndexSelected].id, onSelect),
    );
    expect(onSelect).toHaveBeenCalledTimes(0);
    fireEvent.press(elements.languageListItems(component)[nextItemSelected]);
    fireEvent.press(elements.selectButton(component));
    act(() => {
      timeTravel(ANIMATION_TIMING);
    });
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(languages[nextItemSelected].id);
  });

  it('should not call "onSelectLanguage" when press "select-button" when the language selected is the same of the one received as "lastLanguageSelected"', () => {
    const initialIndexSelected = 0;
    const onSelect = jest.fn();
    const component = render(
      renderLanguageFilter(languages[initialIndexSelected].id, onSelect),
    );
    fireEvent.press(
      elements.languageListItems(component)[initialIndexSelected],
    );
    fireEvent.press(elements.selectButton(component));
    act(() => {
      timeTravel(ANIMATION_TIMING);
    });
    expect(onSelect).toHaveBeenCalledTimes(0);
  });
});
