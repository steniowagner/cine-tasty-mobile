import { Text } from 'react-native';
import styled from 'styled-components';

export const DEFAULT_MARGIN_VERTICAL_PERCENTAGE = '2%';

interface InfoTextStyle {
  readonly withVerticalMargin?: number;
  readonly withCustomColor?: number;
}

const InfoText = styled(Text)<InfoTextStyle>`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  margin-vertical: ${({ withVerticalMargin, theme }) => (withVerticalMargin
    ? theme.metrics.getWidthFromDP(DEFAULT_MARGIN_VERTICAL_PERCENTAGE)
    : 0)}px;
  font-family: CircularStd-Bold;
  color: ${({ withCustomColor, theme }) => (withCustomColor ? theme.colors.buttonText : theme.colors.text)};
`;

export default InfoText;
