import {View} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  padding-top: ${({theme}) => theme.metrics.extraLargeSize}px;
`;
