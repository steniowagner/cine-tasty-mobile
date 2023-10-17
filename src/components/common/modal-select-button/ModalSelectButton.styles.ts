import { TouchableOpacityProps } from 'react-native';
import styled, { IStyledComponent } from 'styled-components/native';
import { Substitute } from 'styled-components/native/dist/types';

import { isEqualsOrLargerThanIphoneX } from '@utils';
import { Typography } from '@common-components';

interface SelectButtonStyleProps {
  borderBottomRightRadius?: number;
  borderBottomLeftRadius?: number;
}

export const SelectButton: IStyledComponent<
  'native',
  Substitute<TouchableOpacityProps, SelectButtonStyleProps>
> = styled.TouchableOpacity<SelectButtonStyleProps>`
  width: 100%;
  height: ${({ theme }) =>
    isEqualsOrLargerThanIphoneX()
      ? theme.metrics.getWidthFromDP('20')
      : theme.metrics.getWidthFromDP('16')}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-bottom-right-radius: ${({ borderBottomRightRadius }) =>
    borderBottomRightRadius ?? 0}px;
  border-bottom-left-radius: ${({ borderBottomLeftRadius }) =>
    borderBottomLeftRadius ?? 0}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const SelectButtonText = styled(Typography.MediumText).attrs(
  ({ theme }) => ({
    color: theme.colors.buttonText,
    bold: true,
  }),
)`
  font-size: ${({ theme }) => theme.metrics.xl}px;
  color: ${({ theme }) => theme.colors.buttonText};
  text-transform: uppercase;
`;
