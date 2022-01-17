import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  width: 100%;
  height: ${({theme}) => theme.metrics.getWidthFromDP('18%')}px;
  justify-content: center;
  align-items: center;
`;

export const LoadButton = styled(TouchableOpacity).attrs(({theme}) => ({
  hitSlop: {
    top: theme.metrics.largeSize,
    bottom: theme.metrics.largeSize,
    left: theme.metrics.largeSize,
    right: theme.metrics.largeSize,
  },
}))``;

export const CustomActivityIndicator = styled(ActivityIndicator).attrs(
  ({theme}) => ({
    color: theme.colors.text,
  }),
)``;
