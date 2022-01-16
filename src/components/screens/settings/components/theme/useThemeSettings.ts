import { useCallback } from 'react';

import { useThemeProvider } from '@src/providers/theme/Theme';
import * as Types from '@local-types';

import useGetThemeOptions from './useGetThemeOptions';

const useThemeSettingsOption = () => {
  const {
    onSetSystemTheme,
    onSetLightTheme,
    onSetDarkTheme,
    themeId,
  } = useThemeProvider();

  const onPressDarkOption = useCallback(() => {
    if (themeId === Types.ThemeId.DARK) {
      return;
    }

    onSetDarkTheme();
  }, [themeId]);

  const onPressLightOption = useCallback(() => {
    if (themeId === Types.ThemeId.LIGHT) {
      return;
    }

    onSetLightTheme();
  }, [themeId]);

  const onPressSystemPreferencesOption = useCallback(() => {
    if (themeId === Types.ThemeId.SYSTEM) {
      return;
    }

    onSetSystemTheme();
  }, [themeId]);

  const { themeOptions } = useGetThemeOptions({
    onPressSystemPreferencesOption,
    onPressLightOption,
    onPressDarkOption,
  });

  return {
    selectedTheme: themeId,
    themeOptions,
  };
};

export default useThemeSettingsOption;
