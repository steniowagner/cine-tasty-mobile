import {ActivityIndicator, Platform, View} from 'react-native';
import styled from 'styled-components/native';

export const LoadingWrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background};
`;

export const CustomActivityIndicator = styled(ActivityIndicator).attrs(
  ({theme}) => ({
    color: theme.colors.text,
    size: Platform.select({
      android: 'large',
      ios: 'small',
    }),
  }),
)``;
