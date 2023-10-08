const FALLBACK_LANGUAGE = 'SOME_FALLBACK_LANGUAGE';

describe('i18n/language-detection', () => {
  describe('When the OS is "Android"', () => {
    beforeEach(() => {
      jest.resetModules();
      jest.clearAllMocks();
    });

    describe('And the "device-language" is not mapped', () => {
      it('should return "fallback-language"', () => {
        jest.mock('react-native', () => ({
          Platform: {
            OS: 'android',
          },
          NativeModules: {
            I18nManager: {
              localeIdentifier: 'sv',
            },
          },
        }));
        const { languageDetection } = require('./language-detection');
        const language = languageDetection(FALLBACK_LANGUAGE);
        expect(language).toEqual(FALLBACK_LANGUAGE);
      });
    });

    describe('And the "device-language" is derivated from "Portuguese"', () => {
      it('should return the correct "language"', () => {
        jest.mock('react-native', () => ({
          Platform: {
            OS: 'android',
          },
          NativeModules: {
            I18nManager: {
              localeIdentifier: 'pt-XPTO',
            },
          },
        }));
        const { languageDetection } = require('./language-detection');
        const language = languageDetection(FALLBACK_LANGUAGE);
        expect(language).toEqual('pt');
      });
    });

    describe('And the "device-language" is derivated from "Spanish"', () => {
      it('should return the correct "language"', () => {
        jest.mock('react-native', () => ({
          Platform: {
            OS: 'android',
          },
          NativeModules: {
            I18nManager: {
              localeIdentifier: 'esASD',
            },
          },
        }));
        const { languageDetection } = require('./language-detection');
        const language = languageDetection(FALLBACK_LANGUAGE);
        expect(language).toEqual('es');
      });
    });

    describe('And the "device-language" is derivated from "English"', () => {
      it('should return the correct "language"', () => {
        jest.mock('react-native', () => ({
          Platform: {
            OS: 'android',
          },
          NativeModules: {
            I18nManager: {
              localeIdentifier: 'enBR',
            },
          },
        }));
        const { languageDetection } = require('./language-detection');
        const language = languageDetection(FALLBACK_LANGUAGE);
        expect(language).toEqual('en');
      });
    });
  });

  describe('When the OS is "iOS"', () => {
    describe('And the "language" is stored at "AppleLocale"', () => {
      beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
      });

      describe('And the "device-language" is not mapped', () => {
        it('should return "fallback-language"', () => {
          jest.mock('react-native', () => ({
            Platform: {
              OS: 'ios',
            },
            NativeModules: {
              SettingsManager: {
                settings: {
                  AppleLocale: 'sv_',
                },
              },
            },
          }));
          const { languageDetection } = require('./language-detection');
          const language = languageDetection(FALLBACK_LANGUAGE);
          expect(language).toEqual(FALLBACK_LANGUAGE);
        });
      });

      describe('And the "device-language" is derivated from "Portuguese"', () => {
        it('should return the correct "language"', () => {
          jest.mock('react-native', () => ({
            Platform: {
              OS: 'ios',
            },
            NativeModules: {
              SettingsManager: {
                settings: {
                  AppleLocale: 'pt-xpto',
                },
              },
            },
          }));
          const { languageDetection } = require('./language-detection');
          const language = languageDetection(FALLBACK_LANGUAGE);
          expect(language).toEqual('pt');
        });
      });

      describe('And the "device-language" is derivated from "Spanish"', () => {
        it('should return the correct "language"', () => {
          jest.mock('react-native', () => ({
            Platform: {
              OS: 'ios',
            },
            NativeModules: {
              SettingsManager: {
                settings: {
                  AppleLocale: 'es_q',
                },
              },
            },
          }));
          const { languageDetection } = require('./language-detection');
          const language = languageDetection(FALLBACK_LANGUAGE);
          expect(language).toEqual('es');
        });
      });

      describe('And the "device-language" is derivated from "English"', () => {
        it('should return the correct "language"', () => {
          jest.mock('react-native', () => ({
            Platform: {
              OS: 'ios',
            },
            NativeModules: {
              SettingsManager: {
                settings: {
                  AppleLocale: 'enUS',
                },
              },
            },
          }));
          const { languageDetection } = require('./language-detection');
          const language = languageDetection(FALLBACK_LANGUAGE);
          expect(language).toEqual('en');
        });
      });
    });

    describe('And the "language" is stored at "AppleLanguages[0]"', () => {
      beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
      });

      describe('And the "device-language" is not mapped', () => {
        it('should return "fallback-language"', () => {
          jest.mock('react-native', () => ({
            Platform: {
              OS: 'ios',
            },
            NativeModules: {
              SettingsManager: {
                settings: {
                  AppleLanguages: ['sv_'],
                },
              },
            },
          }));
          const { languageDetection } = require('./language-detection');
          const language = languageDetection(FALLBACK_LANGUAGE);
          expect(language).toEqual(FALLBACK_LANGUAGE);
        });
      });

      describe('And the "device-language" is derivated from "Portuguese"', () => {
        it('should return the correct "language"', () => {
          jest.mock('react-native', () => ({
            Platform: {
              OS: 'ios',
            },
            NativeModules: {
              SettingsManager: {
                settings: {
                  AppleLanguages: ['pt-xpto'],
                },
              },
            },
          }));
          const { languageDetection } = require('./language-detection');
          const language = languageDetection(FALLBACK_LANGUAGE);
          expect(language).toEqual('pt');
        });
      });

      describe('And the "device-language" is derivated from "Spanish"', () => {
        it('should return the correct "language"', () => {
          jest.mock('react-native', () => ({
            Platform: {
              OS: 'ios',
            },
            NativeModules: {
              SettingsManager: {
                settings: {
                  AppleLanguages: ['es_q'],
                },
              },
            },
          }));
          const { languageDetection } = require('./language-detection');
          const language = languageDetection(FALLBACK_LANGUAGE);
          expect(language).toEqual('es');
        });
      });

      describe('And the "device-language" is derivated from "English"', () => {
        it('should return the correct "language"', () => {
          jest.mock('react-native', () => ({
            Platform: {
              OS: 'ios',
            },
            NativeModules: {
              SettingsManager: {
                settings: {
                  AppleLanguages: ['enus'],
                },
              },
            },
          }));
          const { languageDetection } = require('./language-detection');
          const language = languageDetection(FALLBACK_LANGUAGE);
          expect(language).toEqual('en');
        });
      });
    });
  });
});
