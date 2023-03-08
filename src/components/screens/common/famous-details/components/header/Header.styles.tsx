import {Text} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';

export const DEFAULT_MARGIN_VERTICAL = metrics.smallSize;

type InfoTextStyle = {
  withCustomColor?: boolean;
  marginBottom?: number;
  marginTop?: number;
};

export const DefaultText = styled(Text)<InfoTextStyle>`
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
  font-family: CircularStd-Bold;
  color: ${({withCustomColor, theme}) =>
    withCustomColor ? theme.colors.buttonText : theme.colors.text};
`;
