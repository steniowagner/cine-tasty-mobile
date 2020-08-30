import { Text } from 'react-native';
import styled from 'styled-components';

export const DEFAULT_MARGIN_VERTICAL_PERCENTAGE = '1%';

interface InfoTextStyle {
  readonly withVerticalMargin?: number;
  readonly withCustomColor?: number;
}

const InfoText = styled(Text)<InfoTextStyle>`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  margin-vertical: ${({ withVerticalMargin, theme }) => (withVerticalMargin
    ? theme.metrics.getWidthFromDP(DEFAULT_MARGIN_VERTICAL_PERCENTAGE)
    : 0)}px;
  font-family: CircularStd-Book;
  color: ${({ withCustomColor, theme }) => (withCustomColor ? theme.colors.primary : theme.colors.text)};
`;

export default InfoText;