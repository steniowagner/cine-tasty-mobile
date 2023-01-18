import {renderHook} from '@testing-library/react-hooks';

import * as SchemaTypes from '@schema-types';
import PORTUGUESE from '@i18n/locale/ptBR';
import * as mockNews from '@mocks/fixtures/news';
import SPANISH from '@i18n/locale/es';
import ENGLISH from '@i18n/locale/en';

import {useLanguages} from './useLanguages';

const languageMock = {language: ''};

const mockTranslate = jest.fn();

jest.mock('@hooks', () => ({
  useTranslations: () => ({
    language: languageMock.language,
    translate: mockTranslate,
  }),
}));

describe('useLanguage', () => {
  describe('When the selected language is Portuguese', () => {
    beforeAll(() => {
      jest.resetAllMocks();
      languageMock.language = SchemaTypes.ISO6391Language.PTBR;
      mockTranslate.mockImplementation(
        (language: string) =>
          PORTUGUESE.news.languages[language.split('languages:')[1]],
      );
    });

    it('should show the items in the correct order', () => {
      const {result} = renderHook(() => useLanguages());
      expect(
        result.current.every(
          (language, index) =>
            language.flag ===
              mockNews.languagesSortedInPortuguese[index].flag &&
            language.id === mockNews.languagesSortedInPortuguese[index].id,
        ),
      ).toEqual(true);
    });
  });

  describe('When the selected language is Spanish', () => {
    beforeAll(() => {
      jest.resetAllMocks();
      languageMock.language = SchemaTypes.ISO6391Language.ES;
      mockTranslate.mockImplementation(
        (language: string) =>
          SPANISH.news.languages[language.split('languages:')[1]],
      );
    });

    it('should show the items in the correct order', () => {
      const {result} = renderHook(() => useLanguages());
      expect(
        result.current.every(
          (language, index) =>
            language.flag === mockNews.languagesSortedInSpanish[index].flag &&
            language.id === mockNews.languagesSortedInSpanish[index].id,
        ),
      ).toEqual(true);
    });
  });

  describe('When the selected language is English', () => {
    beforeAll(() => {
      jest.resetAllMocks();
      languageMock.language = SchemaTypes.ISO6391Language.EN;
      mockTranslate.mockImplementation(
        (language: string) =>
          ENGLISH.news.languages[language.split('languages:')[1]],
      );
    });

    it('should show the items in the correct order', () => {
      const {result} = renderHook(() => useLanguages());
      expect(
        result.current.every(
          (language, index) =>
            language.flag === mockNews.languagesSortedInEnglish[index].flag &&
            language.id === mockNews.languagesSortedInEnglish[index].id,
        ),
      ).toEqual(true);
    });
  });
});
