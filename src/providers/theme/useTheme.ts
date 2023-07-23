import {useCallback, useEffect, useState, useMemo} from 'react';

import {useSystemThemePreference} from '@hooks';
import {dark, light} from '@styles/themes';
import {CONSTANTS, storage} from '@utils';
import * as Types from '@local-types';

const undefinedTheme = {...dark, id: undefined};

const useTheme = () => {
  const [theme, setTheme] = useState<Types.ThemeId>(null);

  const {systemTheme} = useSystemThemePreference();

  const handleInitialThemeSelection = useCallback(async (): Promise<void> => {
    const themeFromStorage = await storage.get<Types.ThemeId, null>(
      CONSTANTS.KEYS.APP_THEME,
      null,
    );

    if (themeFromStorage === Types.ThemeId.SYSTEM) {
      // need to force an update
      setTheme(Types.ThemeId.SYSTEM);

      return;
    }

    if (!themeFromStorage) {
      setTheme(Types.ThemeId.DARK);

      return;
    }

    setTheme(themeFromStorage);
  }, [theme]);

  useEffect(() => {
    handleInitialThemeSelection();
  }, []);

  const onSetLightTheme = useCallback(async () => {
    setTheme(Types.ThemeId.LIGHT);

    await storage.set(CONSTANTS.KEYS.APP_THEME, Types.ThemeId.LIGHT);
  }, []);

  const onSetDarkTheme = useCallback(async () => {
    setTheme(Types.ThemeId.DARK);

    await storage.set(CONSTANTS.KEYS.APP_THEME, Types.ThemeId.DARK);
  }, []);

  const onSetSystemTheme = useCallback(async () => {
    setTheme(Types.ThemeId.SYSTEM);

    await storage.set(CONSTANTS.KEYS.APP_THEME, Types.ThemeId.SYSTEM);
  }, []);

  const themeSelected = useMemo(() => {
    if (!theme) {
      return undefinedTheme;
    }

    if (theme === Types.ThemeId.SYSTEM) {
      return systemTheme === Types.ThemeId.DARK
        ? {...dark, id: Types.ThemeId.SYSTEM}
        : {...light, id: Types.ThemeId.SYSTEM};
    }

    return theme === Types.ThemeId.DARK ? dark : light;
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
