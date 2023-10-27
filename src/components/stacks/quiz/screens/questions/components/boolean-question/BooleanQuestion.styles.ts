import { TouchableOpacityProps } from 'react-native';
import styled, { IStyledComponent } from 'styled-components/native';
import { Substitute } from 'styled-components/native/dist/types';

import { Typography } from '@common-components';

type OptionSelectedStyleProps = {
  isSelected: boolean;
};

export const Wrapper = styled.View`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.xl * 2}px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.metrics.lg}px;
  margin-bottom: ${({ theme }) => theme.metrics.xl * 2}px;
`;

export const OptionButton: IStyledComponent<
  'native',
  Substitute<TouchableOpacityProps, OptionSelectedStyleProps>
> = styled.TouchableOpacity<OptionSelectedStyleProps>`
  padding-vertical: ${({ theme }) => theme.metrics.lg}px;
  padding-horizontal: ${({ theme }) => theme.metrics.xl}px;
  border-radius: ${({ theme }) => theme.metrics.sm}px;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primary : theme.colors.fallbackImageBackground};
`;

export const OptionText = styled(Typography.ExtraSmallText).attrs(
  ({ theme }) => ({
    color: theme.colors.buttonText,
    bold: true,
  }),
)`
  text-transform: uppercase;
`;
