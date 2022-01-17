import {Text, View} from 'react-native';
import styled from 'styled-components/native';

type DotStyleProps = {
  isSelected: boolean;
};

export const ContentWrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({theme}) => theme.metrics.extraLargeSize}px;
  padding-vertical: ${({theme}) => theme.metrics.extraLargeSize}px;
  []background-color: ${({theme}) => theme.colors.secondary};
`;

export const Dot = styled(Text)<DotStyleProps>`
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('8%')}px;
  color: ${({isSelected, theme}) =>
    isSelected ? theme.colors.primary : theme.colors.contrast};
`;

export const PaginationWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  align-self: center;
`;
