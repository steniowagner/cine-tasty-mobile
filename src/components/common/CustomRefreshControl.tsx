import { RefreshControl } from 'react-native';
import styled from 'styled-components';

const CustomRefreshControl = styled(RefreshControl).attrs(({ theme }) => ({
  progressBackgroundColor: theme.colors.primary,
  tintColor: theme.colors.primary,
  colors: [theme.colors.text],
}))``;

export default CustomRefreshControl;
