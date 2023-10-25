import { TouchableOpacityProps } from 'react-native';
import styled, { IStyledComponent } from 'styled-components/native';
import { Substitute } from 'styled-components/native/dist/types';

type SelectionStyleProps = {
  isSelected: boolean;
};

export const ListItemWrapper: IStyledComponent<
  'native',
  Substitute<TouchableOpacityProps, SelectionStyleProps>
> = styled.TouchableOpacity<SelectionStyleProps>`
  flex-direction: row;
  align-items: center;
  margin-horizontal: ${({ theme }) => theme.metrics.sm}px;
  margin-bottom: ${({ theme }) => theme.metrics.md}px;
  padding: ${({ theme }) => theme.metrics.md}px;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primary : theme.colors.white};
  border-width: 1px;
  border-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primary : theme.colors.buttonText};
  border-radius: ${({ theme }) => theme.metrics.width}px;
`;

export const AnswerTextWrapper = styled.View`
  width: 80%;
  margin-left: ${({ theme }) => theme.metrics.sm}px;
  align-self: center;
  padding-horizontal: ${({ theme }) => theme.metrics.md}px;
`;
