import metrics from '@styles/metrics';
import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';

export const LINE_DIVIDER_MARGIN_BOTTOM = metrics.mediumSize;

export const LineDivider = styled(View)`
  width: 100%;
  margin-bottom: ${LINE_DIVIDER_MARGIN_BOTTOM}px;
  height: ${StyleSheet.hairlineWidth}px;
  background-color: ${({theme}) => theme.colors.subText};
`;
