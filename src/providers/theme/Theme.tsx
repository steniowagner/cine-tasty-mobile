import React, { createContext, useEffect, useContext } from 'react';
import { ThemeProvider } from 'styled-components';

import { ThemeId } from 'types';

import useTheme from './useTheme';

type ThemeContextProps = {
  handleInitialThemeSelection: () => Promise<void>;
  onToggleTheme: () => void;
  themeId: ThemeId;
};

type Props = {
  children: JSX.Element;
};

const ThemeContextProvider = ({ children }: Props) => {
  const { handleInitialThemeSelection, onToggleTheme, theme } = useTheme();

  useEffect(() => {
    handleInitialThemeSelection();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        handleInitialThemeSelection,
        themeId: theme.id,
        onToggleTheme,
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
  onToggleTheme: () => {},
  themeId: null,
});

export default ThemeContext;

export const useThemeProvider = () => useContext(ThemeContext);
