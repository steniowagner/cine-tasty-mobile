import React, { useEffect } from 'react';
import { View } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { DefaultTheme, withTheme } from 'styled-components';

type Props = {
  theme: DefaultTheme;
};

const AndroidNavigationBar = ({ theme }: Props) => {
  useEffect(() => {
    changeNavigationBarColor(theme.colors.secondary, false, true);
  }, [theme]);

  return <View />;
};

export default withTheme(AndroidNavigationBar);
