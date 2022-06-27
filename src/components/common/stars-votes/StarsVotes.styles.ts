import {View, Text} from 'react-native';
import styled from 'styled-components/native';

type VotesTextStyleProps = {
  textColor?: string;
};

export const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const VotesText = styled(Text)<VotesTextStyleProps>`
  font-size: ${({theme}) => theme.metrics.largeSize * 1.2}px;
  color: ${({textColor, theme}) => textColor || theme.colors.text};
  font-family: CircularStd-Medium;
`;
