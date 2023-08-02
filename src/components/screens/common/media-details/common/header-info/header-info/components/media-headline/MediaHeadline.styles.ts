import {View, Text} from 'react-native';
import styled from 'styled-components/native';

import {light} from '@styles/themes';

type StarsWrapperStyleProps = {
  hasTags: boolean;
};

export const Wrapper = styled(View)`
  width: 90%;
  align-items: center;
`;

export const StarsWrapper = styled(View)<StarsWrapperStyleProps>`
  background-color: ${({theme}) =>
    theme.colors.background === light.colors.background
      ? theme.colors.buttonText
      : 'transparent'};
  margin-top: ${({theme}) => theme.metrics.extraSmallSize}px;
  margin-bottom: ${({theme, hasTags}) =>
    hasTags ? theme.metrics.smallSize : theme.metrics.extraSmallSize}px;
  padding: ${({theme}) =>
    theme.colors.background === light.colors.background
      ? theme.metrics.mediumSize
      : 0}px;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
`;

export const TitleText = styled(Text).attrs({
  numberOfLines: 3,
})`
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('8%')}px;
  color: ${({theme}) => theme.colors.text};
  font-family: CircularStd-Black;
  text-align: center;
`;

export const GenreText = styled(Text)`
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.text};
  font-family: CircularStd-Bold;
  text-align: center;
`;
