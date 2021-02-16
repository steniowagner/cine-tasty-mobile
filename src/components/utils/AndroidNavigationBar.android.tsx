import React, { useEffect } from 'react';
import { View } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { DefaultTheme, withTheme } from 'styled-components';
import { ThemeId } from 'types';

type Props = {
  theme: DefaultTheme;
};

const AndroidNavigationBar = ({ theme }: Props) => {
  useEffect(() => {
    const isLight = ThemeId.LIGHT === theme.id;

    changeNavigationBarColor(theme.colors.secondary, isLight, true);
  }, [theme]);

  return <View />;
};

export default withTheme(AndroidNavigationBar);
