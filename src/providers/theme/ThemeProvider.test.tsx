import { View, Text, TouchableOpacity } from 'react-native';
import {
  render,
  fireEvent,
  RenderAPI,
  act,
  waitFor,
} from '@testing-library/react-native';

import { dark, light } from '@styles/themes';
import { ThemeId } from '@app-types';

import { useThemeProvider, ThemeContextProvider } from './ThemeProvider';
import { APP_THEME_STORAGE_KEY } from './use-app-theme';

jest.mock('@utils');

const { storage } = require('@utils');

const mockColorScheme = jest.fn();

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockColorScheme,
  };
});

const renderThemeProvider = () => {
  const ContextChildren = () => {
    const themeProvider = useThemeProvider();

    return (
      <View>
        <Text testID="theme-colors-text">
          {JSON.stringify(themeProvider.theme.colors)}
        </Text>
        <Text testID="theme-id-text">{themeProvider.theme.id}</Text>
        <TouchableOpacity
          testID="set-dark-theme-button"
          onPress={themeProvider.onSetDarkTheme}
        />
        <TouchableOpacity
          testID="set-light-theme-button"
          onPress={themeProvider.onSetLightTheme}
        />
        <TouchableOpacity
          testID="set-system-theme-button"
          onPress={themeProvider.onSetSystemTheme}
        />
      </View>
    );
  };

  return (
    <ThemeContextProvider>
      <ContextChildren />
    </ThemeContextProvider>
  );
};

describe('Providers/ThemeProvider', () => {
  const elements = {
    themeColorsText: (api: RenderAPI) => api.getByTestId('theme-colors-text'),
    themeIdText: (api: RenderAPI) => api.getByTestId('theme-id-text'),
    selectDarkThemeButton: (api: RenderAPI) =>
      api.getByTestId('set-dark-theme-button'),
    selectLightThemeButton: (api: RenderAPI) =>
      api.getByTestId('set-light-theme-button'),
    selectSystemThemeButton: (api: RenderAPI) =>
      api.getByTestId('set-system-theme-button'),
  };

  describe('Theme selection', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call "storage.get" correctly', async () => {
      storage.get.mockResolvedValueOnce(undefined);
      render(renderThemeProvider());
      expect(storage.get).toBeCalledTimes(1);
      expect(storage.get).toBeCalledWith(APP_THEME_STORAGE_KEY);
      await waitFor(() => {});
    });

    describe('When there is no theme saved in the storage', () => {
      it('should set the "dark-theme" as "theme"', async () => {
        storage.get.mockResolvedValueOnce(undefined);
        const component = render(renderThemeProvider());
        expect(elements.themeIdText(component).children[0]).toEqual(undefined);
        expect(
          JSON.parse(elements.themeColorsText(component).children[0] as string),
        ).toEqual(dark.colors);
        await waitFor(() => {});
      });
    });

    describe('When there is some theme saved in the storage', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      describe('And the "stored-theme" is "DARK"', () => {
        it('should set the "dark-theme" as "theme"', async () => {
          storage.get.mockResolvedValueOnce(ThemeId.DARK);
          const component = render(renderThemeProvider());
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.themeIdText(component).children[0]).toEqual(
              ThemeId.DARK,
            );
            expect(
              JSON.parse(
                elements.themeColorsText(component).children[0] as string,
              ),
            ).toEqual(dark.colors);
          });
        });
      });

      describe('And the "stored-theme" is "LIGHT"', () => {
        it('should set the "light-theme" as "theme"', async () => {
          storage.get.mockResolvedValueOnce(ThemeId.LIGHT);
          const component = render(renderThemeProvider());
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.themeIdText(component).children[0]).toEqual(
              ThemeId.LIGHT,
            );
            expect(
              JSON.parse(
                elements.themeColorsText(component).children[0] as string,
              ),
            ).toEqual(light.colors);
          });
        });
      });

      describe('And the "stored-theme" is "SYSTEM"', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        describe('And "colorScheme" is "dark"', () => {
          it('should set the "system-theme" as "dark-theme"', async () => {
            storage.get.mockResolvedValueOnce(ThemeId.SYSTEM);
            mockColorScheme.mockReturnValue('dark');
            const component = render(renderThemeProvider());
            act(() => {
              jest.runAllTimers();
            });
            await waitFor(() => {
              expect(elements.themeIdText(component).children[0]).toEqual(
                ThemeId.SYSTEM,
              );
              expect(
                JSON.parse(
                  elements.themeColorsText(component).children[0] as string,
                ),
              ).toEqual(dark.colors);
            });
          });
        });

        describe('And "colorScheme" is "light"', () => {
          it('should set the "system-theme" as "light-theme"', async () => {
            storage.get.mockResolvedValueOnce(ThemeId.SYSTEM);
            mockColorScheme.mockReturnValue('light');
            const component = render(renderThemeProvider());
            act(() => {
              jest.runAllTimers();
            });
            await waitFor(() => {
              expect(elements.themeIdText(component).children[0]).toEqual(
                ThemeId.SYSTEM,
              );
              expect(
                JSON.parse(
                  elements.themeColorsText(component).children[0] as string,
                ),
              ).toEqual(light.colors);
            });
          });
        });
      });
    });
  });

  describe('Changing the theme', () => {
    describe('Writing the theme into the storage', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
      });

      it('should call "storage.set" correctly when set the theme to "DARK"', async () => {
        const component = render(renderThemeProvider());
        fireEvent.press(elements.selectDarkThemeButton(component));
        expect(storage.set.mock.calls[0][0]).toEqual(APP_THEME_STORAGE_KEY);
        expect(storage.set.mock.calls[0][1]).toEqual(ThemeId.DARK);
        await waitFor(() => {});
      });

      it('should call "storage.set" correctly when set the theme to "LIGHT"', async () => {
        const component = render(renderThemeProvider());
        fireEvent.press(elements.selectLightThemeButton(component));
        expect(storage.set.mock.calls[0][0]).toEqual(APP_THEME_STORAGE_KEY);
        expect(storage.set.mock.calls[0][1]).toEqual(ThemeId.LIGHT);
        await waitFor(() => {});
      });

      it('should call "storage.set" correctly when set the theme to "SYSTEM"', async () => {
        const component = render(renderThemeProvider());
        fireEvent.press(elements.selectSystemThemeButton(component));
        expect(storage.set.mock.calls[0][0]).toEqual(APP_THEME_STORAGE_KEY);
        expect(storage.set.mock.calls[0][1]).toEqual(ThemeId.SYSTEM);
        await waitFor(() => {});
      });
    });

    describe('When the "theme-selected" is "DARK"', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
      });

      it('should not change the theme when the user switches the theme to "dark"', async () => {
        storage.get.mockResolvedValueOnce(ThemeId.DARK);
        const component = render(renderThemeProvider());
        // current theme
        await waitFor(() => {
          expect(elements.themeIdText(component).children[0]).toEqual(
            ThemeId.DARK,
          );
          expect(
            JSON.parse(
              elements.themeColorsText(component).children[0] as string,
            ),
          ).toEqual(dark.colors);
        });
        fireEvent.press(elements.selectDarkThemeButton(component));
        // after-change theme
        await waitFor(() => {
          expect(elements.themeIdText(component).children[0]).toEqual(
            ThemeId.DARK,
          );
          expect(
            JSON.parse(
              elements.themeColorsText(component).children[0] as string,
            ),
          ).toEqual(dark.colors);
        });
      });

      describe('And the user switches the theme to "light"', () => {
        it('should change the theme to "LIGHT"', async () => {
          storage.get.mockResolvedValueOnce(ThemeId.DARK);
          const component = render(renderThemeProvider());
          // current theme
          await waitFor(() => {
            expect(elements.themeIdText(component).children[0]).toEqual(
              ThemeId.DARK,
            );
            expect(
              JSON.parse(
                elements.themeColorsText(component).children[0] as string,
              ),
            ).toEqual(dark.colors);
          });
          fireEvent.press(elements.selectLightThemeButton(component));
          // after-change theme
          await waitFor(() => {
            expect(elements.themeIdText(component).children[0]).toEqual(
              ThemeId.LIGHT,
            );
            expect(
              JSON.parse(
                elements.themeColorsText(component).children[0] as string,
              ),
            ).toEqual(light.colors);
          });
        });
      });

      describe('And the user switches the theme to "system"', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        describe('And "colorScheme" is "dark"', () => {
          it('should change the theme to "DARK"', async () => {
            storage.get.mockResolvedValueOnce(ThemeId.DARK);
            mockColorScheme.mockReturnValue('dark');
            const component = render(renderThemeProvider());
            // current theme
            await waitFor(() => {
              expect(elements.themeIdText(component).children[0]).toEqual(
                ThemeId.DARK,
              );
              expect(
                JSON.parse(
                  elements.themeColorsText(component).children[0] as string,
                ),
              ).toEqual(dark.colors);
            });
            fireEvent.press(elements.selectSystemThemeButton(component));
            // after-change theme
            await waitFor(() => {
              expect(elements.themeIdText(component).children[0]).toEqual(
                ThemeId.SYSTEM,
              );
              expect(
                JSON.parse(
                  elements.themeColorsText(component).children[0] as string,
                ),
              ).toEqual(dark.colors);
            });
          });
        });

        describe('And "colorScheme" is "light"', () => {
          it('should set the "system-theme" as "light-theme"', async () => {
            storage.get.mockResolvedValueOnce(ThemeId.DARK);
            mockColorScheme.mockReturnValue('light');
            const component = render(renderThemeProvider());
            // current theme
            await waitFor(() => {
              expect(elements.themeIdText(component).children[0]).toEqual(
                ThemeId.DARK,
              );
              expect(
                JSON.parse(
                  elements.themeColorsText(component).children[0] as string,
                ),
              ).toEqual(dark.colors);
            });
            fireEvent.press(elements.selectSystemThemeButton(component));
            // after-change theme
            await waitFor(() => {
              expect(elements.themeIdText(component).children[0]).toEqual(
                ThemeId.SYSTEM,
              );
              expect(
                JSON.parse(
                  elements.themeColorsText(component).children[0] as string,
                ),
              ).toEqual(light.colors);
            });
          });
        });
      });
    });

    describe('When the "theme-selected" is "LIGHT"', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
      });

      it('should not change the theme when the user switches the theme to "light"', async () => {
        storage.get.mockResolvedValueOnce(ThemeId.LIGHT);
        const component = render(renderThemeProvider());
        // current theme
        await waitFor(() => {
          expect(elements.themeIdText(component).children[0]).toEqual(
            ThemeId.LIGHT,
          );
          expect(
            JSON.parse(
              elements.themeColorsText(component).children[0] as string,
            ),
          ).toEqual(light.colors);
        });
        fireEvent.press(elements.selectLightThemeButton(component));
        // after-change theme
        await waitFor(() => {
          expect(elements.themeIdText(component).children[0]).toEqual(
            ThemeId.LIGHT,
          );
          expect(
            JSON.parse(
              elements.themeColorsText(component).children[0] as string,
            ),
          ).toEqual(light.colors);
        });
      });

      describe('And the user switches the theme to "dark"', () => {
        it('should change the theme to "LIGHT"', async () => {
          storage.get.mockResolvedValueOnce(ThemeId.LIGHT);
          const component = render(renderThemeProvider());
          // current theme
          await waitFor(() => {
            expect(elements.themeIdText(component).children[0]).toEqual(
              ThemeId.LIGHT,
            );
            expect(
              JSON.parse(
                elements.themeColorsText(component).children[0] as string,
              ),
            ).toEqual(light.colors);
          });
          fireEvent.press(elements.selectDarkThemeButton(component));
          // after-change theme
          await waitFor(() => {
            expect(elements.themeIdText(component).children[0]).toEqual(
              ThemeId.DARK,
            );
            expect(
              JSON.parse(
                elements.themeColorsText(component).children[0] as string,
              ),
            ).toEqual(dark.colors);
          });
        });
      });

      describe('And the user switches the theme to "system"', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        describe('And "colorScheme" is "dark"', () => {
          it('should change the theme to "DARK"', async () => {
            storage.get.mockResolvedValueOnce(ThemeId.LIGHT);
            mockColorScheme.mockReturnValue('dark');
            const component = render(renderThemeProvider());
            // current theme
            await waitFor(() => {
              expect(elements.themeIdText(component).children[0]).toEqual(
                ThemeId.LIGHT,
              );
              expect(
                JSON.parse(
                  elements.themeColorsText(component).children[0] as string,
                ),
              ).toEqual(light.colors);
            });
            fireEvent.press(elements.selectSystemThemeButton(component));
            // after-change theme
            await waitFor(() => {
              expect(elements.themeIdText(component).children[0]).toEqual(
                ThemeId.SYSTEM,
              );
              expect(
                JSON.parse(
                  elements.themeColorsText(component).children[0] as string,
                ),
              ).toEqual(dark.colors);
            });
          });
        });

        describe('And "colorScheme" is "light"', () => {
          it('should set the "system-theme" as "light-theme"', async () => {
            storage.get.mockResolvedValueOnce(ThemeId.LIGHT);
            mockColorScheme.mockReturnValue('light');
            const component = render(renderThemeProvider());
            // current theme
            await waitFor(() => {
              expect(elements.themeIdText(component).children[0]).toEqual(
                ThemeId.LIGHT,
              );
              expect(
                JSON.parse(
                  elements.themeColorsText(component).children[0] as string,
                ),
              ).toEqual(light.colors);
            });
            fireEvent.press(elements.selectSystemThemeButton(component));
            // after-change theme
            await waitFor(() => {
              expect(elements.themeIdText(component).children[0]).toEqual(
                ThemeId.SYSTEM,
              );
              expect(
                JSON.parse(
                  elements.themeColorsText(component).children[0] as string,
                ),
              ).toEqual(light.colors);
            });
          });
        });
      });
    });

    describe('When the "theme-selected" is "SYSTEM"', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
      });

      it('should not change the theme when the user switches the theme to "system"', async () => {
        storage.get.mockResolvedValueOnce(ThemeId.SYSTEM);
        const component = render(renderThemeProvider());
        // current theme
        await waitFor(() => {
          expect(elements.themeIdText(component).children[0]).toEqual(
            ThemeId.SYSTEM,
          );
        });
        fireEvent.press(elements.selectSystemThemeButton(component));
        // after-change theme
        await waitFor(() => {
          expect(elements.themeIdText(component).children[0]).toEqual(
            ThemeId.SYSTEM,
          );
        });
      });

      describe('And the user switches the theme to "light"', () => {
        it('should change the theme to "LIGHT"', async () => {
          storage.get.mockResolvedValueOnce(ThemeId.SYSTEM);
          const component = render(renderThemeProvider());
          // current theme
          await waitFor(() => {
            expect(elements.themeIdText(component).children[0]).toEqual(
              ThemeId.SYSTEM,
            );
          });
          fireEvent.press(elements.selectLightThemeButton(component));
          // after-change theme
          await waitFor(() => {
            expect(elements.themeIdText(component).children[0]).toEqual(
              ThemeId.LIGHT,
            );
            expect(
              JSON.parse(
                elements.themeColorsText(component).children[0] as string,
              ),
            ).toEqual(light.colors);
          });
        });
      });

      describe('And the user switches the theme to "dark"', () => {
        it('should change the theme to "DARK"', async () => {
          storage.get.mockResolvedValueOnce(ThemeId.SYSTEM);
          const component = render(renderThemeProvider());
          // current theme
          await waitFor(() => {
            expect(elements.themeIdText(component).children[0]).toEqual(
              ThemeId.SYSTEM,
            );
          });
          fireEvent.press(elements.selectDarkThemeButton(component));
          // after-change theme
          await waitFor(() => {
            expect(elements.themeIdText(component).children[0]).toEqual(
              ThemeId.DARK,
            );
            expect(
              JSON.parse(
                elements.themeColorsText(component).children[0] as string,
              ),
            ).toEqual(dark.colors);
          });
        });
      });
    });
  });
});
