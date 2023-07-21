import {View} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  margin-top: ${({theme}) => theme.metrics.mediumSize}px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const TextWrapper = styled(View)`
  margin-top: ${({theme}) => theme.metrics.mediumSize}px;
  margin-right: ${({theme}) => theme.metrics.mediumSize}px;
  border-radius: ${({theme}) => theme.metrics.height}px;
  padding-horizontal: ${({theme}) => theme.metrics.largeSize}px;
  padding-vertical: ${({theme}) => theme.metrics.smallSize}px;
  background-color: ${({theme}) => theme.colors.primary};
`;
