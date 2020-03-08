import React, { useEffect } from 'react';
import { View } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { DefaultTheme, withTheme } from 'styled-components';

import { ThemeID } from '../types';

type Props = {
  theme: DefaultTheme;
};

const AndroidNavigationBar = ({ theme }: Props) => {
  useEffect(() => {
    const isLightIcons = theme.id === ThemeID.LIGHT;

    changeNavigationBarColor(theme.colors.background, isLightIcons, true);
  }, [theme]);

  return <View />;
};

export default withTheme(AndroidNavigationBar);
