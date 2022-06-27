import {Text, View} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  padding-top: ${({theme}) => theme.metrics.extraLargeSize}px;
  padding-horizontal: ${({theme}) => theme.metrics.largeSize}px;
`;

export const RecentText = styled(Text)`
  margin-bottom: ${({theme}) => theme.metrics.extraLargeSize}px;
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  color: ${({theme}) => theme.colors.text};
  font-family: CircularStd-Bold;
`;
