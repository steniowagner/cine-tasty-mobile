import styled from 'styled-components/native';
import {View} from 'react-native';

type WrapperStylesProp = {
  headerHeight: number;
};

export const Wrapper = styled(View)<WrapperStylesProp>`
  width: 100%;
  align-items: center;
  margin-top: ${({headerHeight, theme}) =>
    theme.metrics.extraLargeSize + headerHeight}px;
  margin-bottom: ${({theme}) => theme.metrics.extraLargeSize}px;
`;

export const MediaHeadlineWrapper = styled(View)`
  margin-top: ${({theme}) => theme.metrics.largeSize}px;
  margin-bottom: ${({theme}) => theme.metrics.extraSmallSize}px;
`;
