import { useCallback, useEffect, useState, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { dark, light } from '@styles/themes';
import { ThemeId } from '@app-types';
import { storage } from '@utils';

export const INITIAL_THEME = { ...dark, id: undefined };

export const APP_THEME_STORAGE_KEY = 'APP_THEME';

export const useAppTheme = () => {
  const [themeId, setThemeId] = useState<ThemeId | undefined>();

  const colorScheme = useColorScheme();

  const setInitialTheme = useCallback(async (): Promise<void> => {
    const themeFromStorage = await storage.get<ThemeId>(APP_THEME_STORAGE_KEY);
    const initialTheme = themeFromStorage || ThemeId.DARK;
    setThemeId(initialTheme);
  }, [storage.get]);

  const setLightTheme = useCallback(async () => {
    setThemeId(ThemeId.LIGHT);
    await storage.set(APP_THEME_STORAGE_KEY, ThemeId.LIGHT);
  }, [storage.set]);

  const setDarkTheme = useCallback(async () => {
    setThemeId(ThemeId.DARK);
    await storage.set(APP_THEME_STORAGE_KEY, ThemeId.DARK);
  }, [storage.set]);

  const setSystemTheme = useCallback(async () => {
    setThemeId(ThemeId.SYSTEM);
    await storage.set(APP_THEME_STORAGE_KEY, ThemeId.SYSTEM);
  }, [storage.set]);

  const themeSelected = useMemo(() => {
    if (!themeId) {
      return INITIAL_THEME;
    }
    if (themeId === ThemeId.SYSTEM) {
      return colorScheme === 'dark'
        ? { ...dark, id: ThemeId.SYSTEM }
        : { ...light, id: ThemeId.SYSTEM };
    }
    return themeId === ThemeId.DARK ? dark : light;
  }, [colorScheme, themeId]);

  useEffect(() => {
    setInitialTheme();
  }, []);

  return {
    themeSelected,
    setInitialTheme,
    setSystemTheme,
    setLightTheme,
    setDarkTheme,
  };
};
