import {StyleSheet, View} from 'react-native';
import metrics from '@styles/metrics';
import styled from 'styled-components/native';

export const IOS_NON_MONOBROWN_EXTRA_HEIGHT = metrics.getWidthFromDP('14%');
export const IOS_MONOBROWN_EXTRA_HEIGHT = metrics.getWidthFromDP('12%');

export const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Gap = styled(View)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('10%')}px;
`;

export const TitleWrapper = styled(View)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('80%')}px;
  padding-horizontal: ${({theme}) => theme.metrics.largeSize}px;
`;

export const sheet = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontFamily: 'CircularStd-Bold',
    fontSize: metrics.getWidthFromDP('4.2%'),
  },
});
