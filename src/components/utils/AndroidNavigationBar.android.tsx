import React, { useEffect } from 'react';
import { View } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { DefaultTheme, withTheme } from 'styled-components';

import * as Types from '@local-types';

type AndroidNavigationBarProps = {
  theme: DefaultTheme;
};

const AndroidNavigationBar = ({ theme }: AndroidNavigationBarProps) => {
  useEffect(() => {
    const isLight = Types.ThemeId.LIGHT === theme.id;

    changeNavigationBarColor(theme.colors.secondary, isLight, true);
  }, [theme]);

  return <View />;
};

export default withTheme(AndroidNavigationBar);
