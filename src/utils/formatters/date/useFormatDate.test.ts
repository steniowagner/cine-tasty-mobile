import {renderHook} from '@testing-library/react-hooks';

import * as SchemaTypes from '@schema-types';

const languageMock = {language: ''};
jest.mock('@hooks', () => ({
  useTranslations: () => ({language: languageMock.language}),
}));

import {useFormatDate} from './useFormatDate';

const year = '1994';
const month = '02';
const day = '21';

const date = `${year}-${month}-${day}`;

describe('useFormatDate', () => {
  describe('Current language is Brazilian Portuguese', () => {
    beforeAll(() => {
      languageMock.language = SchemaTypes.ISO6391Language.PTBR;
    });

    it('should return correctly when the date is an empty string', () => {
      const {result} = renderHook(() => useFormatDate());
      expect(result.current.format('')).toEqual('-');
    });

    it('should return correctly when has some date', () => {
      const {result} = renderHook(() => useFormatDate());
      expect(result.current.format(date)).toEqual(`${day}/${month}/${year}`);
    });
  });

  describe('Current language is European Portuguese', () => {
    beforeAll(() => {
      languageMock.language = SchemaTypes.ISO6391Language.PT;
    });

    it('should return correctly when the date is an empty string', () => {
      const {result} = renderHook(() => useFormatDate());
      expect(result.current.format('')).toEqual('-');
    });

    it('should return correctly when has some date', () => {
      const {result} = renderHook(() => useFormatDate());
      expect(result.current.format(date)).toEqual(`${day}/${month}/${year}`);
    });
  });

  describe('Current language is Spanish', () => {
    beforeAll(() => {
      languageMock.language = SchemaTypes.ISO6391Language.ES;
    });

    it('should return correctly when the date is an empty string', () => {
      const {result} = renderHook(() => useFormatDate());
      expect(result.current.format('')).toEqual('-');
    });

    it('should return correctly when has some date', () => {
      const {result} = renderHook(() => useFormatDate());
      expect(result.current.format(date)).toEqual(`${day}/${month}/${year}`);
    });
  });

  describe('Current language is English', () => {
    beforeAll(() => {
      languageMock.language = SchemaTypes.ISO6391Language.EN;
    });

    it('should return correctly when the date is an empty string', () => {
      const {result} = renderHook(() => useFormatDate());
      expect(result.current.format('')).toEqual('-');
    });

    it('should return correctly when has some date', () => {
      const {result} = renderHook(() => useFormatDate());
      expect(result.current.format(date)).toEqual(`${year}-${month}-${day}`);
    });
  });
});
