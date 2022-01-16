/* eslint-disable global-require */

import CONSTANTS from '@utils/constants';

describe('Testing the handleLanguageDetection()', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe("Testing the flow when there's no language saved on storage (first run)", () => {
    describe('The App has translation for the OS language', () => {
      it('[Android] should return the correct language', async () => {
        jest.mock('react-native', () => ({
          Platform: {
            OS: 'android',
            select: () => 'pt_BR'.split('-'),
          },
          Dimensions: {
            get: jest.fn().mockReturnValueOnce({width: 100, height: 100}),
          },
          PixelRatio: {
            roundToNearestPixel: () => 1,
          },
          NativeModules: {
            I18nManager: {
              localeIdentifier: 'pt_BR',
            },
          },
        }));

        jest.mock('../utils/async-storage-adapter/storage');

        const storage = require('../utils/async-storage-adapter/storage');

        storage.get.mockImplementationOnce(() => '');

        const handleLanguageDetection = require('./handleLanguageDetection');

        const language = await handleLanguageDetection.default();

        expect(storage.set).toBeCalledTimes(1);

        expect(storage.set).toBeCalledWith(
          CONSTANTS.KEYS.LANGUAGE,
          'ptBR',
        );

        expect(language).toBe('ptBR');
      });

      it('[iOS >= 13] should return the correct language', async () => {
        jest.mock('react-native', () => ({
          Platform: {
            OS: 'ios',
            select: () => 'pt-BR'.split('_'),
          },
          Dimensions: {
            get: jest.fn().mockReturnValueOnce({width: 100, height: 100}),
          },
          PixelRatio: {
            roundToNearestPixel: () => 1,
          },
          NativeModules: {
            SettingsManager: {
              settings: {
                AppleLocale: 'pt-BR',
              },
            },
          },
        }));

        jest.mock('../utils/async-storage-adapter/storage');

        const storage = require('../utils/async-storage-adapter/storage');

        storage.get.mockImplementationOnce(() => '');

        const handleLanguageDetection = require('./handleLanguageDetection');

        const language = await handleLanguageDetection.default();

        expect(storage.set).toBeCalledTimes(1);

        expect(storage.set).toBeCalledWith(
          CONSTANTS.KEYS.LANGUAGE,
          'ptBR',
        );

        expect(language).toBe('ptBR');
      });

      it('[ios < 13] should return the correct language', async () => {
        jest.mock('react-native', () => ({
          Platform: {
            OS: 'ios',
            select: {
              android: 'pt-BR'.split('-'),
              ios: 'pt-BR'.split('_'),
            },
          },
          Dimensions: {
            get: jest.fn().mockReturnValueOnce({width: 100, height: 100}),
          },
          PixelRatio: {
            roundToNearestPixel: () => 1,
          },
          NativeModules: {
            SettingsManager: {
              settings: {
                AppleLanguages: ['pt-BR'],
              },
            },
          },
        }));

        jest.mock('../utils/async-storage-adapter/storage');

        const storage = require('../utils/async-storage-adapter/storage');

        storage.get.mockImplementationOnce(() => '');

        const handleLanguageDetection = require('./handleLanguageDetection');

        const language = await handleLanguageDetection.default();

        expect(storage.set).toBeCalledTimes(1);

        expect(storage.set).toBeCalledWith(
          CONSTANTS.KEYS.LANGUAGE,
          'ptBR',
        );

        expect(language).toBe('ptBR');
      });
    });

    describe('The App has no translation for the OS language', () => {
      it('[Android] should return the "en" when there\'s no translation for that language', async () => {
        jest.mock('react-native', () => ({
          Platform: {
            OS: 'android',
            select: () => 'x_Y'.split('-'),
          },
          Dimensions: {
            get: jest.fn().mockReturnValueOnce({width: 100, height: 100}),
          },
          PixelRatio: {
            roundToNearestPixel: () => 1,
          },
          NativeModules: {
            I18nManager: {
              localeIdentifier: 'x_Y',
            },
          },
        }));

        jest.mock('../utils/async-storage-adapter/storage');

        const storage = require('../utils/async-storage-adapter/storage');

        storage.get.mockImplementationOnce(() => '');

        const handleLanguageDetection = require('./handleLanguageDetection');

        const language = await handleLanguageDetection.default();

        expect(storage.set).toBeCalledTimes(1);

        expect(storage.set).toBeCalledWith(
          CONSTANTS.KEYS.LANGUAGE,
          CONSTANTS.VALUES.FALLBACK_LANGUAGE,
        );

        expect(language).toBe(CONSTANTS.VALUES.FALLBACK_LANGUAGE);
      });

      it('[iOS >= 13] should return the "en" when there\'s no traslation for that language', async () => {
        jest.mock('../utils/async-storage-adapter/storage');

        const storage = require('../utils/async-storage-adapter/storage');

        storage.get.mockImplementationOnce(() => '');

        jest.mock('react-native', () => ({
          Platform: {
            OS: 'ios',
            select: () => 'x-Y'.split('_'),
          },
          Dimensions: {
            get: jest.fn().mockReturnValueOnce({width: 100, height: 100}),
          },
          PixelRatio: {
            roundToNearestPixel: () => 1,
          },
          NativeModules: {
            SettingsManager: {
              settings: {
                AppleLocale: 'x-Y',
              },
            },
          },
        }));

        const handleLanguageDetection = require('./handleLanguageDetection');

        const language = await handleLanguageDetection.default();

        expect(storage.set).toBeCalledTimes(1);

        expect(storage.set).toBeCalledWith(
          CONSTANTS.KEYS.LANGUAGE,
          CONSTANTS.VALUES.FALLBACK_LANGUAGE,
        );

        expect(language).toBe(CONSTANTS.VALUES.FALLBACK_LANGUAGE);
      });

      it('[ios < 13] should return the "en" when there\'s no traslation for that language', async () => {
        jest.mock('../utils/async-storage-adapter/storage');

        const storage = require('../utils/async-storage-adapter/storage');

        storage.get.mockImplementationOnce(() => '');

        jest.mock('react-native', () => ({
          Platform: {
            OS: 'ios',
            select: () => 'x-Y'.split('_'),
          },
          Dimensions: {
            get: jest.fn().mockReturnValueOnce({width: 100, height: 100}),
          },
          PixelRatio: {
            roundToNearestPixel: () => 1,
          },
          NativeModules: {
            SettingsManager: {
              settings: {
                AppleLanguages: ['x-Y'],
              },
            },
          },
        }));

        const handleLanguageDetection = require('./handleLanguageDetection');

        const language = await handleLanguageDetection.default();

        expect(storage.set).toBeCalledTimes(1);

        expect(storage.set).toBeCalledWith(
          CONSTANTS.KEYS.LANGUAGE,
          CONSTANTS.VALUES.FALLBACK_LANGUAGE,
        );

        expect(language).toBe(CONSTANTS.VALUES.FALLBACK_LANGUAGE);
      });
    });
  });

  describe("Testing the flow when there's a language saved on storage", () => {
    it('should return the language saved on storage', async () => {
      jest.mock('../utils/async-storage-adapter/storage');

      const {
        storage.get,
      } = require('../utils/async-storage-adapter/storage');

      storage.get.mockImplementationOnce(() => 'ptBR');

      const handleLanguageDetection = require('./handleLanguageDetection');

      const language = await handleLanguageDetection.default();

      expect(language).toBe('ptBR');
    });
  });
});
