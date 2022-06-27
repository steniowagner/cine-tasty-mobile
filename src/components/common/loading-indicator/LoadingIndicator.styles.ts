import {ActivityIndicator, View} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Indicator = styled(ActivityIndicator).attrs(({theme}) => ({
  color: theme.colors.text,
  size: 'large',
}))``;
