import {renderHook} from '@testing-library/react-hooks';

import * as SchemaTypes from '@schema-types';
import PORTUGUESE from '@i18n/locale/ptBR';
import SPANISH from '@i18n/locale/es';
import ENGLISH from '@i18n/locale/en';

import {useLanguages} from './useLanguages';
import {languages} from './languages';

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
    const expecetedSequence = [
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
            language.flag === expecetedSequence[index].flag &&
            language.id === expecetedSequence[index].id,
        ),
      ).toEqual(true);
    });
  });

  describe('When the selected language is Spanish', () => {
    const expecetedSequence = [
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
            language.flag === expecetedSequence[index].flag &&
            language.id === expecetedSequence[index].id,
        ),
      ).toEqual(true);
    });
  });

  describe('When the selected language is English', () => {
    const expecetedSequence = [
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
            language.flag === expecetedSequence[index].flag &&
            language.id === expecetedSequence[index].id,
        ),
      ).toEqual(true);
    });
  });
});
