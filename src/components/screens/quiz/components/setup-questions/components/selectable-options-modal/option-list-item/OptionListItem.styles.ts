import {TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components/native';

import {SVGIcon} from '@components';
import {dark} from '@styles/themes';

type ListItemStyleProps = {
  isSelected: boolean;
};

export const ListItemWrapper = styled(TouchableOpacity)<ListItemStyleProps>`
  width: 100%;
  height: ${({theme}) => theme.metrics.getWidthFromDP('20%')}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${({theme}) => theme.metrics.largeSize}px;
  background-color: ${({isSelected}) =>
    isSelected ? dark.colors.background : dark.colors.text};
`;

export const ListItemText = styled(Text)<ListItemStyleProps>`
  font-family: CircularStd-Medium;
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  color: ${({isSelected}) =>
    isSelected ? dark.colors.text : dark.colors.background};
`;

export const CheckboxIcon = styled(SVGIcon).attrs(({theme}) => ({
  size: theme.metrics.getWidthFromDP('8%'),
}))``;
