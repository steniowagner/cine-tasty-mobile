import {useCallback, useMemo} from 'react';
import {Platform} from 'react-native';

import {useThemeProvider} from '@src/providers/theme/Theme';
import * as Types from '@local-types';
import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';
import {CONSTANTS} from '@utils';

export const useThemeSettings = () => {
  const themeProvider = useThemeProvider();
  const translations = useTranslations();

  const handlePressDarkOption = useCallback(() => {
    if (themeProvider.themeId === Types.ThemeId.DARK) {
      return;
    }
    themeProvider.onSetDarkTheme();
  }, [themeProvider.onSetDarkTheme, themeProvider.themeId]);

  const handlePressLightOption = useCallback(() => {
    if (themeProvider.themeId === Types.ThemeId.LIGHT) {
      return;
    }
    themeProvider.onSetLightTheme();
  }, [themeProvider.onSetLightTheme, themeProvider.themeId]);

  const handlePressSystemPreferencesOption = useCallback(() => {
    if (themeProvider.themeId === Types.ThemeId.SYSTEM) {
      return;
    }
    themeProvider.onSetSystemTheme();
  }, [themeProvider.onSetSystemTheme, themeProvider.themeId]);

  const systemPreferencesOption = useMemo(
    () => ({
      onPress: handlePressSystemPreferencesOption,
      title: translations.translate(
        Translations.Tags.SETTINGS_THEME_SYSTEM_PREFERENCES,
      ),
      id: Types.ThemeId.SYSTEM,
    }),
    [handlePressSystemPreferencesOption, translations.translate],
  );

  const defaultOptions = useMemo(
    () => [
      {
        onPress: handlePressDarkOption,
        title: translations.translate(Translations.Tags.SETTINGS_THEME_DARK),
        id: Types.ThemeId.DARK,
      },
      {
        onPress: handlePressLightOption,
        title: translations.translate(Translations.Tags.SETTINGS_THEME_LIGHT),
        id: Types.ThemeId.LIGHT,
      },
    ],
    [handlePressLightOption, handlePressDarkOption, translations.translate],
  );

  const hasSystemPreferencesThemeSupport = useMemo(() => {
    if (Platform.OS === 'android') {
      return (
        Platform.Version >=
        CONSTANTS.VALUES.THEME.MIN_SUPPORTED_ANDROID_API_VERSION
      );
    }
    return (
      parseInt(Platform.Version as string, 10) >=
      CONSTANTS.VALUES.THEME.MIN_SUPPORTED_IOS_VERSION
    );
  }, []);

  const options = useMemo(() => {
    if (hasSystemPreferencesThemeSupport) {
      return [...defaultOptions, systemPreferencesOption];
    }
    return defaultOptions;
  }, [
    hasSystemPreferencesThemeSupport,
    systemPreferencesOption,
    defaultOptions,
  ]);

  return {
    selectedTheme: themeProvider.themeId,
    options,
  };
};
