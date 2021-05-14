import { useCallback } from 'react';

import { useThemeProvider } from '@src/providers/theme/Theme';
import * as Types from '@local-types';

import useGetThemeOptions from './useGetThemeOptions';

const useThemeSettingsOption = () => {
  const themeProvider = useThemeProvider();

  const onPressDarkOption = useCallback(() => {
    if (themeProvider.themeId === Types.ThemeId.DARK) {
      return;
    }

    themeProvider.onSetDarkTheme();
  }, [themeProvider.themeId]);

  const onPressLightOption = useCallback(() => {
    if (themeProvider.themeId === Types.ThemeId.LIGHT) {
      return;
    }

    themeProvider.onSetLightTheme();
  }, [themeProvider.themeId]);

  const onPressSystemPreferencesOption = useCallback(() => {
    if (themeProvider.themeId === Types.ThemeId.SYSTEM) {
      return;
    }

    themeProvider.onSetSystemTheme();
  }, [themeProvider.themeId]);

  const getThemeOptions = useGetThemeOptions({
    onPressSystemPreferencesOption,
    onPressLightOption,
    onPressDarkOption,
  });

  return {
    themeOptions: getThemeOptions.themeOptions,
    selectedTheme: themeProvider.themeId,
  };
};

export default useThemeSettingsOption;
