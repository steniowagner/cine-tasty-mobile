import {View} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  width: ${({theme}) => theme.metrics.width}px;
  height: ${({theme}) => theme.metrics.height}px;
  background-color: ${({theme}) => theme.colors.background};
`;
