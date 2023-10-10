import React, { useEffect } from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { useTheme } from 'styled-components/native';

import { ThemeId } from '@app-types';

export const AndroidNavigationBar = () => {
  const theme = useTheme();

  useEffect(() => {
    const isLight = ThemeId.LIGHT === theme.id;
    changeNavigationBarColor(theme.colors.secondary, isLight, true);
  }, [theme]);

  return <></>;
};
