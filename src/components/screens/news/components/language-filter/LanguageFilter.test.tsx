import React from 'react';
import {RenderAPI, cleanup, render, act} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import * as SchemaTypes from '@schema-types';

import {ITEM_LIST_HEIGHT} from './list-item/LanguageListItem.styles';
import {LanguageFilter} from './LanguageFilter';
import {languages} from './languages/languages';
import {Translations} from '@i18n/tags';
import * as mockNews from '@mocks/fixtures/news';

const renderLanguageFilter = (
  lastFilterSelected: SchemaTypes.ArticleLanguage,
  onSelect = jest.fn(),
) => (
  <ThemeProvider theme={theme}>
    <LanguageFilter
      onSelectLanguage={onSelect}
      languageSelected={lastFilterSelected}
    />
  </ThemeProvider>
);

const makeSelectedLanguageIndex = () =>
  Math.floor(Math.random() * (languages.length - 1));

describe('<LanguageFilter />', () => {
  const elements = {
    languageList: (api: RenderAPI) => api.queryByTestId('languages-list'),
    languageListItems: (api: RenderAPI) =>
      api.queryAllByTestId('language-filter-list-item'),
    languageFlagsIcons: (api: RenderAPI) => api.queryAllByTestId(/flag-svg-/),
    languageFlagsTexts: (api: RenderAPI) =>
      api.queryAllByTestId('language-text'),
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

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
    const indexLanguageSelected = makeSelectedLanguageIndex();
    const component = render(
      renderLanguageFilter(languages[indexLanguageSelected].id),
    );
    act(() => {
      jest.runAllTimers();
    });
    for (let i = 0; i < elements.languageFlagsIcons(component).length; i++) {
      expect(elements.languageFlagsIcons(component)[i].props.testID).toEqual(
        `flag-svg-${mockNews.languagesSortedInEnglish[i].flag}`,
      );
      expect(elements.languageFlagsTexts(component)[i].children[0]).toEqual(
        `${Translations.Tags.NEWS_LANGUAGES}:${mockNews.languagesSortedInEnglish[i].name}`,
      );
    }
  });

  it('should scroll the "language-list" to the "language-selected" position', () => {
    const mockScrollTo = jest.fn();
    jest.spyOn(React, 'useRef').mockReturnValue({
      current: {scrollTo: mockScrollTo},
    });
    const indexLanguageSelected = makeSelectedLanguageIndex();
    render(
      renderLanguageFilter(
        mockNews.languagesSortedInEnglish[indexLanguageSelected].id,
      ),
    );
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
});
