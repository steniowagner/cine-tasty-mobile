import { RefreshControl, Platform } from 'react-native';
import styled from 'styled-components';

const CustomRefreshControl = styled(RefreshControl).attrs(({ theme }) => ({
  progressBackgroundColor: theme.colors.text,
  tintColor: theme.colors.text,
  colors: [theme.colors.text],
  size: Platform.select({
    android: 'large',
    ios: 'small',
  }),
}))``;

export default CustomRefreshControl;
