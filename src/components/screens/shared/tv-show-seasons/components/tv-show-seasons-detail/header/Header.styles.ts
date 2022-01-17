import {View} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({theme}) => theme.metrics.extraLargeSize}px;
  padding-horizontal: ${({theme}) => theme.metrics.mediumSize}px;
`;

export const SeasonPosterImageWrapper = styled(View)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('30%')}px;
  height: ${({theme}) => theme.metrics.getWidthFromDP('40%')}px;
`;
