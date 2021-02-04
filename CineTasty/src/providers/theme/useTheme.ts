import {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { DefaultTheme } from 'styled-components';

import {
  getItemFromStorage,
  persistItemInStorage,
} from 'utils/async-storage-adapter/AsyncStorageAdapter';
import CONSTANTS from 'utils/constants';
import { ThemeId } from 'types';

import { dark, light } from 'styles/themes';

const undefinedTheme = { ...dark, id: undefined };

type State = {
  handleInitialThemeSelection: () => Promise<void>;
  onToggleTheme: () => void;
  theme: DefaultTheme;
};

const useTheme = (): State => {
  const [theme, setTheme] = useState<ThemeId>(null);

  const handleInitialThemeSelection = useCallback(async (): Promise<void> => {
    const themeFromStorage = await getItemFromStorage<ThemeId, null>(
      CONSTANTS.KEYS.APP_THEME,
      null,
    );

    if (!themeFromStorage) {
      setTheme(ThemeId.DARK);

      return;
    }

    setTheme(themeFromStorage);
  }, []);

  useEffect(() => {
    if (theme) {
      persistItemInStorage(CONSTANTS.KEYS.APP_THEME, theme);
    }
  }, [theme]);

  const onToggleTheme = () => {
    setTheme((previousTheme: ThemeId) => (previousTheme === ThemeId.DARK ? ThemeId.LIGHT : ThemeId.DARK));
  };

  const themeSelected = useMemo(() => {
    if (!theme) {
      return undefinedTheme;
    }

    return theme === ThemeId.DARK ? dark : light;
  }, [theme]);

  return {
    handleInitialThemeSelection,
    theme: themeSelected,
    onToggleTheme,
  };
};

export default useTheme;
