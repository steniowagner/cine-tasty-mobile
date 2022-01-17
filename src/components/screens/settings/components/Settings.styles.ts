import {View} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({theme}) => theme.metrics.mediumSize}px;
  padding-top: ${({theme}) => theme.metrics.extraLargeSize}px;
`;
