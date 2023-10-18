import React from 'react';
import {
  act,
  fireEvent,
  render,
  RenderAPI,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes';
import { NewsLanguage } from '@schema-types';

import { languages } from './language-filter-list/filter-languages/languages';
import { LanguagesFilterModal } from './LanguagesFilterModal';

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

const renderLanguagesFilterModal = (
  onSelectLanguage = jest.fn(),
  onCloseModal = jest.fn(),
) => (
  <ThemeProvider theme={theme}>
    <LanguagesFilterModal
      onSelectLanguage={onSelectLanguage}
      languageSelected={NewsLanguage.PT}
      onCloseModal={onCloseModal}
      isOpen
    />
  </ThemeProvider>
);

describe('Screens/News/LanguagesFilterModal', () => {
  const elements = {
    languageItems: (component: RenderAPI) =>
      component.getAllByTestId('language-filter-list-item'),
    selectButton: (component: RenderAPI) =>
      component.getByTestId('select-button'),
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  test.each(languagesSortedInEnglish)(
    'should call "onSelectLanguage" and "onCloseModal" correctly when the language %p is selected',
    language => {
      const indexLanguageSelected = languagesSortedInEnglish.findIndex(
        ({ id }) => id === language.id,
      );
      const onSelectLanguage = jest.fn();
      const onCloseModal = jest.fn();
      const component = render(
        renderLanguagesFilterModal(onSelectLanguage, onCloseModal),
      );
      expect(onSelectLanguage).toBeCalledTimes(0);
      expect(onCloseModal).toBeCalledTimes(0);
      fireEvent.press(elements.languageItems(component)[indexLanguageSelected]);
      act(() => {
        jest.runAllTimers();
      });
      fireEvent.press(elements.selectButton(component));
      act(() => {
        jest.runAllTimers();
      });
      expect(onCloseModal).toBeCalledTimes(1);
      expect(onSelectLanguage).toBeCalledTimes(1);
      expect(onSelectLanguage).toBeCalledWith(language.id);
    },
  );
});
