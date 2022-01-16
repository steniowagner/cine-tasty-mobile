import { Text } from 'react-native';
import styled from 'styled-components';

import metrics from '@styles/metrics';

export const DEFAULT_MARGIN_VERTICAL = metrics.smallSize;

type InfoTextStyle = {
  withCustomColor?: number;
  marginBottom?: number;
  marginTop?: number;
};

const InfoText = styled(Text)<InfoTextStyle>`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  margin-top: ${({ marginTop }) => marginTop || 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  font-family: CircularStd-Bold;
  color: ${({ withCustomColor, theme }) => (withCustomColor ? theme.colors.buttonText : theme.colors.text)};
`;

export default InfoText;
