import {TouchableOpacity, View, Text} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';
import {dark} from '@styles/themes';

type SelectedItemStyleProps = {
  isSelected: boolean;
};

export const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('10%');
export const ITEM_LIST_HEIGHT = metrics.getWidthFromDP('20%');

export const Wrapper = styled(TouchableOpacity)<SelectedItemStyleProps>`
  height: ${ITEM_LIST_HEIGHT}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${({theme}) => theme.metrics.largeSize}px;
  background-color: ${({isSelected}) =>
    isSelected ? dark.colors.background : dark.colors.text};
`;

export const LanguageText = styled(Text)<SelectedItemStyleProps>`
  margin-left: ${({theme}) => theme.metrics.extraLargeSize}px;
  color: ${({isSelected}) =>
    isSelected ? dark.colors.text : dark.colors.background};
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Bold;
`;

export const OutterFlagWrapper = styled(View)<SelectedItemStyleProps>`
  width: ${({theme}) => theme.metrics.getWidthFromDP('12%')}px;
  height: ${({theme}) => theme.metrics.getWidthFromDP('12%')}px;
  border-radius: ${({theme}) => theme.metrics.getWidthFromDP('6%')}px;
  background-color: ${({theme, isSelected}) =>
    isSelected ? theme.colors.primary : 'white'};
  justify-content: center;
  align-items: center;
`;

export const InnerFlagWrapper = styled(View)`
  width: ${DEFAULT_ICON_SIZE}px;
  height: ${DEFAULT_ICON_SIZE}px;
`;

export const ContentWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;
