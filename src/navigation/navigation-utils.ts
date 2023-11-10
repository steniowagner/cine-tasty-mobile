import { DefaultTheme } from 'styled-components/native';

export const defaultHeaderStyle = {
  headerBackTitleVisible: false,
  headerStyle: {
    shadowColor: 'transparent',
    elevation: 0,
  },
};

export const getTransparentHeaderOptions = (theme: DefaultTheme) => ({
  headerBackTitleVisible: false,
  headerTransparent: true,
  headerTintColor: theme.colors.text,
  title: '',
  headerStyle: {
    shadowColor: 'transparent',
    elevation: 0,
  },
});
