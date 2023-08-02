import {useCallback, useEffect, useState, useMemo} from 'react';
import {useColorScheme} from 'react-native';

import {dark, light} from '@styles/themes';
import {CONSTANTS, storage} from '@utils';
import * as Types from '@local-types';

export const useTheme = () => {
  const [themeId, setThemeId] = useState<Types.ThemeId>(null);

  const colorScheme = useColorScheme();

  const systemTheme = useMemo(() => {
    if (colorScheme === 'light') {
      return Types.ThemeId.LIGHT;
    }
    return Types.ThemeId.DARK;
  }, [colorScheme]);

  const onSetLightTheme = useCallback(async () => {
    if (themeId === Types.ThemeId.LIGHT) {
      return;
    }
    setThemeId(Types.ThemeId.LIGHT);
    await storage.set(CONSTANTS.KEYS.APP_THEME, Types.ThemeId.LIGHT);
  }, [themeId]);

  const onSetDarkTheme = useCallback(async () => {
    if (themeId === Types.ThemeId.DARK) {
      return;
    }
    setThemeId(Types.ThemeId.DARK);
    await storage.set(CONSTANTS.KEYS.APP_THEME, Types.ThemeId.DARK);
  }, [themeId]);

  const onSetSystemTheme = useCallback(async () => {
    if (themeId === Types.ThemeId.SYSTEM) {
      return;
    }
    setThemeId(Types.ThemeId.SYSTEM);
    await storage.set(CONSTANTS.KEYS.APP_THEME, Types.ThemeId.SYSTEM);
  }, [themeId]);

  const themeSelected = useMemo(() => {
    if (!themeId) {
      return {...dark, id: undefined};
    }
    if (themeId === Types.ThemeId.SYSTEM) {
      return systemTheme === Types.ThemeId.DARK
        ? {...dark, id: Types.ThemeId.SYSTEM}
        : {...light, id: Types.ThemeId.SYSTEM};
    }
    return themeId === Types.ThemeId.DARK ? dark : light;
  }, [systemTheme, themeId]);

  const initializeTheme = useCallback(async (): Promise<void> => {
    const themeFromStorage = await storage.get<Types.ThemeId, null>(
      CONSTANTS.KEYS.APP_THEME,
      null,
    );
    if (themeFromStorage === Types.ThemeId.SYSTEM) {
      setThemeId(Types.ThemeId.SYSTEM);
      return;
    }
    if (!themeFromStorage) {
      setThemeId(Types.ThemeId.DARK);
      return;
    }
    setThemeId(themeFromStorage);
  }, []);

  useEffect(() => {
    initializeTheme();
  }, []);

  return {
    initializeTheme,
    themeSelected,
    onSetSystemTheme,
    onSetLightTheme,
    onSetDarkTheme,
  };
};
