import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { DefaultTheme } from 'styled-components';

import {
  getItemFromStorage,
  persistItemInStorage,
} from 'utils/async-storage-adapter/AsyncStorageAdapter';
import CONSTANTS from 'utils/constants';
import { ThemeID } from 'types';

import { dark as darkTheme, light as lightTheme } from '../themes';

interface ThemeContextProviderState {
  onToggleTheme: () => void;
  appTheme: DefaultTheme;
}

const useThemeContextProvider = (): ThemeContextProviderState => {
  const [theme, setTheme] = useState<ThemeID>(null);

  const handleThemeSelection = async (): Promise<void> => {
    const themeSaved = await getItemFromStorage<ThemeID, null>(
      CONSTANTS.KEYS.APP_THEME,
      null,
    );

    if (!themeSaved) {
      setTheme(ThemeID.DARK);

      return;
    }

    setTheme(themeSaved);
  };

  useEffect(() => {
    handleThemeSelection();
  }, []);

  const onToggleTheme = () => {
    setTheme((previousTheme: ThemeID) => {
      const themeSelected = previousTheme === ThemeID.DARK ? ThemeID.LIGHT : ThemeID.DARK;

      persistItemInStorage(CONSTANTS.KEYS.APP_THEME, themeSelected);

      return themeSelected;
    });
  };

  const getAppTheme = (): DefaultTheme => {
    const themeSelected = theme === ThemeID.DARK ? darkTheme : lightTheme;

    return themeSelected;
  };

  return {
    appTheme: getAppTheme(),
    onToggleTheme,
  };
};

export default useThemeContextProvider;
