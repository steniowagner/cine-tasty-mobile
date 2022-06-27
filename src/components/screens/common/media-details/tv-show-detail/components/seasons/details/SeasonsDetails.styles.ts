import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';

export const LineDivider = styled(View)`
  width: 100%;
  margin-bottom: ${({theme}) => theme.metrics.mediumSize}px;
  height: ${StyleSheet.hairlineWidth}px;
  background-color: ${({theme}) => theme.colors.subText};
`;
