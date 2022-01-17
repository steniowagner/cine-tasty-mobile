import {TouchableOpacity, View, Text} from 'react-native';
import styled from 'styled-components/native';

type OptionSelectedStyleProps = {
  isSelected: boolean;
};

export const Wrapper = styled(View)`
  width: 100%;
  padding-horizontal: ${({theme}) => theme.metrics.getWidthFromDP('10%')}px;
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: ${({theme}) => theme.metrics.extraLargeSize}px;
`;

export const OptionButton = styled(TouchableOpacity)<OptionSelectedStyleProps>`
  padding-vertical: ${({theme}) => theme.metrics.largeSize}px;
  padding-horizontal: ${({theme}) => theme.metrics.extraLargeSize}px;
  border-radius: ${({theme}) => theme.metrics.smallSize}px;
  background-color: ${({isSelected, theme}) =>
    isSelected ? theme.colors.primary : '#CCC'};
`;

export const OptionText = styled(Text)`
  font-family: CircularStd-Bold;
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  color: ${({theme}) => theme.colors.buttonText};
  text-transform: uppercase;
`;
