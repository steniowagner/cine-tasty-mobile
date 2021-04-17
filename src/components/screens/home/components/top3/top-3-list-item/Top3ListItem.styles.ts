import { Animated, View, Text } from 'react-native';
import styled from 'styled-components';
import * as Types from '@local-types';

import * as LoadingTop3Styles from '../LoadingTop3.styles';

type ItemWrapperStyleProps = {
  isTheMiddle: boolean;
  width: number;
};

type StarsWrapperStyleProps = {
  currentTheme: Types.ThemeId;
};

export const Wrapper = styled(Animated.View)<ItemWrapperStyleProps>`
  width: ${LoadingTop3Styles.ITEM_WIDTH}px;
  margin-horizontal: ${({ isTheMiddle }) => (isTheMiddle ? LoadingTop3Styles.ITEM_MARGING_HORIZONTAL : 0)}px;
  height: ${LoadingTop3Styles.ITEM_HEIGHT}px;
`;

export const TextContentWrapper = styled(View)`
  width: 100%;
  height: 50%;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
`;

export const StarsWrapper = styled(View)<StarsWrapperStyleProps>`
  justify-content: center;
  align-items: center;
  background-color: ${({ currentTheme, theme }) => (currentTheme === Types.ThemeId.LIGHT ? theme.colors.buttonText : 'transparent')};
  padding: ${({ currentTheme, theme }) => (currentTheme === Types.ThemeId.LIGHT ? theme.metrics.mediumSize : 0)}px;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

export const TitleText = styled(Text).attrs({
  numberOfLines: 3,
})`
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Black;
  text-align: center;
`;

export const GenreText = styled(Text)`
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Bold;
  text-align: center;
`;

export const LearnMoreButtonWrapper = styled(View)`
  width: 80%;
`;
