import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

import metrics from '@styles/metrics';
import * as Types from '@local-types';

export const Wrapper = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

export const LoadingWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

export const TextWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('55%')}px;
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;

export const SourceText = styled(Text).attrs({
  numberOfLines: 1,
})`
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => (theme.id === Types.ThemeId.DARK ? theme.colors.primary : theme.colors.buttonText)};
`;

export const NewsText = styled(Text)<{ withRTL: boolean }>`
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => (theme.id === Types.ThemeId.DARK ? theme.colors.text : theme.colors.subText)};
  text-align: ${({ withRTL }) => (withRTL ? 'right' : 'left')};
`;

export const imageWrapper = {
  width: metrics.getWidthFromDP('35%'),
  height: metrics.getWidthFromDP('30%'),
  borderRadius: 8,
};
