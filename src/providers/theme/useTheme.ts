import { useEffect, useState, useMemo } from 'react';
import { DefaultTheme } from 'styled-components';

import {
  getItemFromStorage,
  persistItemInStorage,
} from 'utils/async-storage-adapter/AsyncStorageAdapter';
import CONSTANTS from 'utils/constants';
import { ThemeId } from 'types';

import { dark, light } from 'styles/themes';

type State = {
  onToggleTheme: () => void;
  theme: DefaultTheme;
};

const useTheme = (): State => {
  const [theme, setTheme] = useState<ThemeId>(null);

  const handleThemeSelection = async (): Promise<void> => {
    const themeSaved = await getItemFromStorage<ThemeId, null>(
      CONSTANTS.KEYS.APP_THEME,
      null,
    );

    if (!themeSaved) {
      setTheme(ThemeId.DARK);

      return;
    }

    setTheme(themeSaved);
  };

  useEffect(() => {
    handleThemeSelection();
  }, []);

  const onToggleTheme = () => {
    setTheme((previousTheme: ThemeId) => {
      const themeSelected = previousTheme === ThemeId.DARK ? ThemeId.LIGHT : ThemeId.DARK;

      persistItemInStorage(CONSTANTS.KEYS.APP_THEME, themeSelected);

      return themeSelected;
    });
  };

  const themeSelected = useMemo(() => (theme === ThemeId.DARK ? dark : light), [theme]);

  return {
    theme: themeSelected,
    onToggleTheme,
  };
};

export default useTheme;
