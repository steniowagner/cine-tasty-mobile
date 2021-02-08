import { useCallback } from 'react';

import { useThemeProvider } from 'providers/theme/Theme';
import { ThemeId } from 'types';

import useGetThemeOptions from './useGetThemeOptions';

type ThemeOption = {
  onPress: () => void;
  title: string;
  id: ThemeId;
};

type State = {
  themeOptions: ThemeOption[];
  selectedTheme: ThemeId;
};

const useThemeSettingsOption = (): State => {
  const {
    onSetSystemTheme,
    onSetLightTheme,
    onSetDarkTheme,
    themeId,
  } = useThemeProvider();

  const onPressDarkOption = useCallback(() => {
    if (themeId === ThemeId.DARK) {
      return;
    }

    onSetDarkTheme();
  }, [themeId]);

  const onPressLightOption = useCallback(() => {
    if (themeId === ThemeId.LIGHT) {
      return;
    }

    onSetLightTheme();
  }, [themeId]);

  const onPressSystemPreferencesOption = useCallback(() => {
    if (themeId === ThemeId.SYSTEM) {
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
