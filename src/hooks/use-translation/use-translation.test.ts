import { renderHook } from '@testing-library/react-native';

import { supportedLanguages } from '@i18n/supported-languages';
import { Translations } from '@i18n/tags';

import { useTranslation } from './use-translation';

const mockTranslations = jest.fn();
const mockT = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => mockTranslations(),
}));

describe('Hooks/use-translations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call "i18n.t" correctly when calling "translate"', () => {
    mockTranslations.mockReturnValue({
      t: mockT,
      i18n: {
        language: 'pt',
      },
    });
    const { result } = renderHook(() => useTranslation());
    expect(mockT).toHaveBeenCalledTimes(0);
    result.current.translate(Translations.Tabs.TABS_HOME, { value: 1 });
    expect(mockT).toHaveBeenCalledTimes(1);
    expect(mockT).toBeCalledWith(Translations.Tabs.TABS_HOME, {
      value: 1,
    });
  });

  it('should return the "supportedLanguages"', () => {
    mockTranslations.mockReturnValue({
      t: jest.fn(),
      i18n: {
        language: supportedLanguages,
      },
    });
    const { result } = renderHook(() => useTranslation());
    expect(result.current.supportedLanguages).toEqual(supportedLanguages);
  });

  test.each(supportedLanguages)(
    'should return the "currentLanguage" correctly when the "i18n-language" is %p',
    supportedLanguage => {
      mockTranslations.mockReturnValue({
        t: jest.fn(),
        i18n: {
          language: supportedLanguage,
        },
      });
      const { result } = renderHook(() => useTranslation());
      expect(result.current.currentLanguage).toEqual(supportedLanguage);
    },
  );
});
