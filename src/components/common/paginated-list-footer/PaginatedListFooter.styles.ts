import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('18%')}px;
  justify-content: center;
  align-items: center;
`;

export const LoadButton = styled(TouchableOpacity).attrs(({ theme }) => ({
  hitSlop: {
    top: theme.metrics.lg,
    bottom: theme.metrics.lg,
    left: theme.metrics.lg,
    right: theme.metrics.lg,
  },
}))``;

export const CustomActivityIndicator = styled(ActivityIndicator).attrs(
  ({ theme }) => ({
    color: theme.colors.text,
  }),
)``;
