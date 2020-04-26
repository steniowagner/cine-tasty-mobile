import React, { createContext } from 'react';
import { ThemeProvider } from 'styled-components';

import { ThemeID } from 'types';
import useThemeContextProvider from './useThemeContextProvider';

type ThemeContextProps = {
  onToggleTheme: () => void;
  themeID: ThemeID;
};

type Props = {
  children: JSX.Element;
};

const ThemeContext = createContext<ThemeContextProps>({
  onToggleTheme: () => {},
  themeID: null,
});

const ThemeContextProvider = ({ children }: Props) => {
  const { onToggleTheme, appTheme } = useThemeContextProvider();

  return (
    <ThemeContext.Provider
      value={{
        themeID: appTheme.id,
        onToggleTheme,
      }}
    >
      <ThemeProvider
        theme={appTheme}
      >
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider };

export default ThemeContext;
