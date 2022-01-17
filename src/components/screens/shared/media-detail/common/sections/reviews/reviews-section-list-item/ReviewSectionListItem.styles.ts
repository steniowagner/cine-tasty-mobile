import {Text, View} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  width: ${({theme}) => theme.metrics.width}px;
  padding-horizontal: ${({theme}) => theme.metrics.largeSize}px;
`;

export const AuthorText = styled(Text)`
  margin-bottom: ${({theme}) => theme.metrics.mediumSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  color: ${({theme}) => theme.colors.subText};
`;

export const ReviewText = styled(Text).attrs({
  numberOfLines: 4,
})`
  font-family: CircularStd-Medium;
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  color: ${({theme}) => theme.colors.text};
`;
