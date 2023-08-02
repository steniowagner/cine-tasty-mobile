import {TouchableOpacity, Platform, Text} from 'react-native';
import styled from 'styled-components/native';

import * as Types from '@local-types';
import metrics from '@styles/metrics';

export const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('8%');

type WrapperButtonProps = {
  width: number;
};

type ItemTextStyleProps = {
  isSelected: boolean;
};

export const Wrapper = styled(TouchableOpacity)<WrapperButtonProps>`
  width: ${({width}) => width}px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const ItemText = styled(Text)<ItemTextStyleProps>`
  margin-top: ${({theme}) =>
    Platform.OS === 'android'
      ? theme.metrics.mediumSize
      : theme.metrics.extraSmallSize}px;
  font-family: CircularStd-Medium;
  color: ${({isSelected, theme}) => {
    const selectedTabColor =
      theme.id === Types.ThemeId.DARK
        ? theme.colors.primary
        : theme.colors.text;
    return isSelected ? selectedTabColor : theme.colors.inactiveWhite;
  }};
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('3.5%')}px;
`;
