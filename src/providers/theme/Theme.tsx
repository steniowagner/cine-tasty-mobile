import React, {createContext, useContext} from 'react';
import {ThemeProvider, DefaultTheme} from 'styled-components/native';

import * as Types from '@local-types';

import {useTheme} from './useTheme';

type ThemeContextProps = {
  initializeTheme: () => Promise<void>;
  onSetLightTheme: () => void;
  onSetSystemTheme: () => void;
  onSetDarkTheme: () => void;
  themeId: Types.ThemeId;
  theme: DefaultTheme;
};

type ThemeContextProviderProps = {
  children: React.ReactChild;
};

const ThemeContextProvider = (props: ThemeContextProviderProps) => {
  const theme = useTheme();
  return (
    <ThemeContext.Provider
      value={{
        initializeTheme: theme.initializeTheme,
        onSetSystemTheme: theme.onSetSystemTheme,
        themeId: theme.themeSelected.id,
        onSetLightTheme: theme.onSetLightTheme,
        onSetDarkTheme: theme.onSetDarkTheme,
        theme: theme.themeSelected,
      }}>
      <ThemeProvider theme={theme.themeSelected}>
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export {ThemeContextProvider};

const ThemeContext = createContext<ThemeContextProps>({
  initializeTheme: () => new Promise(resolve => resolve()),
  onSetSystemTheme: () => {},
  onSetLightTheme: () => {},
  onSetDarkTheme: () => {},
  themeId: null,
  theme: null,
});

export default ThemeContext;

export const useThemeProvider = () => useContext(ThemeContext);
