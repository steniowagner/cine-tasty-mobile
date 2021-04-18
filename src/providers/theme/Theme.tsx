import React, { createContext, useEffect, useContext } from 'react';
import { ThemeProvider } from 'styled-components';

import * as Types from '@local-types';

import useTheme from './useTheme';

type ThemeContextProps = {
  handleInitialThemeSelection: () => Promise<void>;
  onSetLightTheme: () => void;
  onSetSystemTheme: () => void;
  onSetDarkTheme: () => void;
  themeId: Types.ThemeId;
};

type ThemeContextProviderProps = {
  children: JSX.Element;
};

const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const {
    handleInitialThemeSelection,
    onSetSystemTheme,
    onSetLightTheme,
    onSetDarkTheme,
    theme,
  } = useTheme();

  useEffect(() => {
    handleInitialThemeSelection();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        handleInitialThemeSelection,
        onSetSystemTheme,
        themeId: theme.id,
        onSetLightTheme,
        onSetDarkTheme,
      }}
    >
      <ThemeProvider
        theme={theme}
      >
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider };

const ThemeContext = createContext<ThemeContextProps>({
  handleInitialThemeSelection: () => new Promise((resolve) => resolve()),
  onSetSystemTheme: () => {},
  onSetLightTheme: () => {},
  onSetDarkTheme: () => {},
  themeId: null,
});

export default ThemeContext;

export const useThemeProvider = () => useContext(ThemeContext);
