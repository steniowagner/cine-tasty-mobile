import {TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components/native';

type ListItemWrapperStyleProps = {
  isSelected: boolean;
};

export const ListItemWrapper = styled(
  TouchableOpacity,
)<ListItemWrapperStyleProps>`
  width: 100%;
  height: ${({theme}) => theme.metrics.getWidthFromDP('20%')}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${({theme}) => theme.metrics.largeSize}px;
  background-color: ${({isSelected, theme}) =>
    isSelected ? theme.colors.primary : 'transparent'};
`;

export const ListItemText = styled(Text)`
  font-family: CircularStd-Medium;
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  color: ${({theme}) => theme.colors.buttonText};
`;
