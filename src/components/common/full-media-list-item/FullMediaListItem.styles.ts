import {TouchableOpacity, Text, View} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({theme}) => theme.metrics.largeSize}px;
`;

export const TextContentWrapper = styled(View)`
  width: 64%;
`;

export const TitleText = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-bottom: ${({theme}) => theme.metrics.smallSize}px;
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('5.5%')}px;
  color: ${({theme}) => theme.colors.text};
  font-family: CircularStd-Bold;
`;

export const GenresText = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-top: ${({theme}) => theme.metrics.mediumSize}px;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.text};
  font-family: CircularStd-Medium;
`;
