import { useCallback, useState, useMemo } from 'react';
import { DefaultTheme } from 'styled-components';

import {
  getItemFromStorage,
  persistItemInStorage,
} from 'utils/async-storage-adapter/AsyncStorageAdapter';
import { dark, light } from 'styles/themes';
import CONSTANTS from 'utils/constants';
import { ThemeId } from 'types';

import useSystemThemePreference from './useSystemThemePreference';

const undefinedTheme = { ...dark, id: undefined };

type State = {
  handleInitialThemeSelection: () => Promise<void>;
  onSetSystemTheme: () => void;
  onSetLightTheme: () => void;
  onSetDarkTheme: () => void;
  theme: DefaultTheme;
};

const useTheme = (): State => {
  const [theme, setTheme] = useState<ThemeId>(null);

  const { systemTheme } = useSystemThemePreference();

  const onSetLightTheme = useCallback(async () => {
    setTheme(ThemeId.LIGHT);

    await persistItemInStorage(CONSTANTS.KEYS.APP_THEME, ThemeId.LIGHT);
  }, []);

  const onSetDarkTheme = useCallback(async () => {
    setTheme(ThemeId.DARK);

    await persistItemInStorage(CONSTANTS.KEYS.APP_THEME, ThemeId.DARK);
  }, []);

  const onSetSystemTheme = useCallback(async () => {
    setTheme(ThemeId.SYSTEM);

    await persistItemInStorage(CONSTANTS.KEYS.APP_THEME, ThemeId.SYSTEM);
  }, []);

  const handleInitialThemeSelection = useCallback(async (): Promise<void> => {
    const themeFromStorage = await getItemFromStorage<ThemeId, null>(
      CONSTANTS.KEYS.APP_THEME,
      null,
    );

    if (themeFromStorage === ThemeId.SYSTEM) {
      // need to force an update
      setTheme(ThemeId.SYSTEM);

      return;
    }

    if (!themeFromStorage) {
      setTheme(ThemeId.DARK);

      return;
    }

    setTheme(themeFromStorage);
  }, [theme]);

  const themeSelected = useMemo(() => {
    if (!theme) {
      return undefinedTheme;
    }

    if (theme === ThemeId.SYSTEM) {
      return systemTheme === ThemeId.DARK ? dark : light;
    }

    return theme === ThemeId.DARK ? dark : light;
  }, [systemTheme, theme]);

  return {
    handleInitialThemeSelection,
    theme: themeSelected,
    onSetSystemTheme,
    onSetLightTheme,
    onSetDarkTheme,
  };
};

export default useTheme;
