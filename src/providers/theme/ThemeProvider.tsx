import React, { createContext, useContext } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components/native';

import { useAppTheme, INITIAL_THEME } from './use-app-theme';

type ThemeContextProps = {
  setInitialTheme: () => Promise<void>;
  onSetLightTheme: () => void;
  onSetSystemTheme: () => void;
  onSetDarkTheme: () => void;
  theme: DefaultTheme;
};

type ThemeContextProviderProps = {
  children: JSX.Element;
};

export const ThemeContextProvider = (props: ThemeContextProviderProps) => {
  const appTheme = useAppTheme();

  return (
    <ThemeContext.Provider
      value={{
        setInitialTheme: appTheme.setInitialTheme,
        onSetSystemTheme: appTheme.setSystemTheme,
        onSetLightTheme: appTheme.setLightTheme,
        onSetDarkTheme: appTheme.setDarkTheme,
        theme: appTheme.themeSelected,
      }}>
      <ThemeProvider theme={appTheme.themeSelected}>
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

const ThemeContext = createContext<ThemeContextProps>({
  setInitialTheme: () => new Promise(resolve => resolve()),
  onSetSystemTheme: () => {},
  onSetLightTheme: () => {},
  onSetDarkTheme: () => {},
  theme: INITIAL_THEME,
});

export const useThemeProvider = () => useContext(ThemeContext);

export default ThemeContext;
