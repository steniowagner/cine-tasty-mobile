import React, { createContext } from 'react';
import { ThemeProvider } from 'styled-components';

import { ThemeId } from 'types';

import useTheme from './useTheme';

type ThemeContextProps = {
  onToggleTheme: () => void;
  themeId: ThemeId;
};

type Props = {
  children: JSX.Element;
};

const ThemeContextProvider = ({ children }: Props) => {
  const { onToggleTheme, theme } = useTheme();

  return (
    <ThemeContext.Provider
      value={{
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
  onToggleTheme: () => {},
  themeId: null,
});

export default ThemeContext;
