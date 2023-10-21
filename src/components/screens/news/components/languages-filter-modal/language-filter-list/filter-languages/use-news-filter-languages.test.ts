import { act, renderHook, waitFor } from '@testing-library/react-native';

import { pt as PORTUGUESE } from '@i18n/locale/pt';
import { es as SPANISH } from '@i18n/locale/es';
import { en as ENGLISH } from '@i18n/locale/en';
import { NewsFilterLanguage } from '@/types';

import { useNewsFilterLanguages } from './use-news-filter-languages';
import { languages } from './languages';

const languagesSortedInPortuguese = [
  languages[5],
  languages[1],
  languages[12],
  languages[11],
  languages[4],
  languages[6],
  languages[3],
  languages[0],
  languages[7],
  languages[2],
  languages[8],
  languages[9],
  languages[10],
];

const languagesSortedInSpanish = [
  languages[5],
  languages[1],
  languages[12],
  languages[11],
  languages[4],
  languages[6],
  languages[3],
  languages[0],
  languages[7],
  languages[2],
  languages[8],
  languages[9],
  languages[10],
];

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

const languageMock = { language: '' };
const mockTranslate = jest.fn();

jest.mock('@hooks', () => ({
  useTranslation: () => ({
    language: languageMock.language,
    translate: mockTranslate,
  }),
}));

describe('Screens/News/use-news-filter-languages', () => {
  describe('When the "language" is "Portuguese"', () => {
    beforeAll(() => {
      jest.resetAllMocks();
      languageMock.language = 'pt';
      mockTranslate.mockImplementation(
        (language: string) =>
          PORTUGUESE.news.languages[
            language.split('languages:')[1] as NewsFilterLanguage
          ],
      );
    });

    it('should show the items in the correct order', () => {
      const { result } = renderHook(() => useNewsFilterLanguages());
      expect(
        result.current.every(
          (language, index) =>
            language.flag === languagesSortedInPortuguese[index].flag &&
            language.id === languagesSortedInPortuguese[index].id,
        ),
      ).toEqual(true);
    });
  });

  describe('When the "language" is "Spanish"', () => {
    beforeAll(() => {
      jest.resetAllMocks();
      languageMock.language = 'es';
      mockTranslate.mockImplementation(
        (language: string) =>
          SPANISH.news.languages[
            language.split('languages:')[1] as NewsFilterLanguage
          ],
      );
    });

    it('should show the items in the correct order', () => {
      const { result } = renderHook(() => useNewsFilterLanguages());
      expect(
        result.current.every(
          (language, index) =>
            language.flag === languagesSortedInSpanish[index].flag &&
            language.id === languagesSortedInSpanish[index].id,
        ),
      ).toEqual(true);
    });
  });

  describe('When the "language" is "English"', () => {
    beforeAll(() => {
      jest.resetAllMocks();
      languageMock.language = 'en';
      mockTranslate.mockImplementation(
        (language: string) =>
          ENGLISH.news.languages[
            language.split('languages:')[1] as NewsFilterLanguage
          ],
      );
    });

    it('should show the items in the correct order', () => {
      const { result } = renderHook(() => useNewsFilterLanguages());
      expect(
        result.current.every(
          (language, index) =>
            language.flag === languagesSortedInEnglish[index].flag &&
            language.id === languagesSortedInEnglish[index].id,
        ),
      ).toEqual(true);
    });
  });
});
