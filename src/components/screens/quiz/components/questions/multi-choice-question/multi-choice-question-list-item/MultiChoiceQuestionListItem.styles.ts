import {TouchableOpacity, View, Text} from 'react-native';
import styled from 'styled-components/native';

type SelectionStyleProps = {
  isSelected: boolean;
};

export const ListItemWrapper = styled(TouchableOpacity)<SelectionStyleProps>`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({theme}) => theme.metrics.smallSize}px;
  padding: ${({theme}) => theme.metrics.mediumSize}px;
  background-color: ${({isSelected, theme}) =>
    isSelected ? theme.colors.primary : 'white'};
  border-width: 1px;
  border-color: ${({isSelected, theme}) =>
    isSelected ? theme.colors.primary : theme.colors.buttonText};
  border-radius: ${({theme}) => theme.metrics.width}px;
`;

export const AnswerTextWrapper = styled(View)`
  width: 80%;
  margin-left: ${({theme}) => theme.metrics.smallSize}px;
  align-self: center;
  padding-horizontal: ${({theme}) => theme.metrics.mediumSize}px;
`;

export const QuestionsIndicatorText = styled(Text)<SelectionStyleProps>`
  font-family: CircularStd-Bold;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.buttonText};
  text-align: center;
`;
