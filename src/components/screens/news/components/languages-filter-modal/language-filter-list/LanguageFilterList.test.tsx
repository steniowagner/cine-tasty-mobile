import React from 'react';
import { RenderAPI, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes/dark';
import { NewsLanguage } from '@schema-types';
import { Translations } from '@i18n/tags';

import { ITEM_LIST_HEIGHT } from './list-item/LanguageListItem.styles';
import { LanguageFilterList } from './LanguageFilterList';
import { languages } from './filter-languages/languages';

const mockScrollTo = jest.fn();

jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  return {
    ...originReact,
    useRef: () => ({
      current: {
        scrollTo: mockScrollTo,
      },
    }),
  };
});

const languagesSortedInEnglish = [
  languages[1],
  languages[3],
  languages[0],
  languages[11],
  languages[4],
  languages[5],
  languages[6],
  languages[7],
  languages[2],
  languages[8],
  languages[9],
  languages[10],
  languages[12],
];

const renderLanguageFilterList = (
  lastFilterSelected: NewsLanguage,
  onSelect = jest.fn(),
) => (
  <ThemeProvider theme={theme}>
    <LanguageFilterList
      onSelectLanguage={onSelect}
      languageSelected={lastFilterSelected}
    />
  </ThemeProvider>
);

describe('Screens/News/LanguageFilterList', () => {
  const elements = {
    languageList: (api: RenderAPI) => api.queryByTestId('languages-list'),
    languageListItems: (api: RenderAPI) =>
      api.queryAllByTestId('language-filter-list-item'),
    languageFlagsIcons: (api: RenderAPI) => api.queryAllByTestId(/flag-svg-/),
    languageFlagsTexts: (api: RenderAPI) =>
      api.queryAllByTestId('language-text'),
  };

  describe('Rendering', () => {
    describe('Rendering the components', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
      });

      test.each(languages)(
        'should render the list of items correctly when the language %p is selected',
        language => {
          const component = render(renderLanguageFilterList(language.id));
          act(() => {
            jest.runAllTimers();
          });
          expect(elements.languageList(component)).not.toBeNull();
          expect(elements.languageListItems(component).length).toEqual(
            languages.length,
          );
        },
      );
    });

    describe('List-items sequence', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
      });

      test.each(languages)(
        'should render the list on the correct sequence when the language %p is selected',
        language => {
          const component = render(renderLanguageFilterList(language.id));
          act(() => {
            jest.runAllTimers();
          });
          for (
            let i = 0;
            i < elements.languageFlagsIcons(component).length;
            i++
          ) {
            expect(
              elements.languageFlagsIcons(component)[i].props.testID,
            ).toEqual(`flag-svg-${languagesSortedInEnglish[i].flag}`);
            expect(
              elements.languageFlagsTexts(component)[i].children[0],
            ).toEqual(
              `${Translations.News.LANGUAGES}:${languagesSortedInEnglish[i].name}`,
            );
          }
        },
      );
    });
  });

  describe('Scrolling the list', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.useFakeTimers();
    });

    test.each(languagesSortedInEnglish)(
      'should scroll the "language-list" to the position of the %p language',
      language => {
        const indexLanguage = languagesSortedInEnglish.findIndex(
          ({ id }) => id === language.id,
        );
        render(renderLanguageFilterList(language.id));
        act(() => {
          jest.runAllTimers();
        });
        expect(mockScrollTo).toBeCalledTimes(1);
        expect(mockScrollTo).toBeCalledWith({
          x: 0,
          y: indexLanguage * ITEM_LIST_HEIGHT,
          animated: true,
        });
      },
    );
  });
});
