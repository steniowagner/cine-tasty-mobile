import { RefreshControl } from 'react-native';
import styled from 'styled-components';

const CustomRefreshControl = styled(RefreshControl).attrs(({ theme }) => ({
  progressBackgroundColor: theme.colors.text,
  tintColor: theme.colors.text,
  colors: [theme.colors.text],
}))``;

export default CustomRefreshControl;
