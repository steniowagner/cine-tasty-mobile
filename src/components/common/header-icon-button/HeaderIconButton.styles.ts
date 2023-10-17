import styled, { IStyledComponent } from 'styled-components/native';

import { Substitute } from 'styled-components/native/dist/types';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { RefAttributes } from 'react';

type WrapperStyleProps = {
  withMarginRight?: boolean;
  withMarginLeft?: boolean;
};

export const Wrapper: IStyledComponent<
  'native',
  Substitute<
    Substitute<
      TouchableOpacityProps,
      TouchableOpacityProps & RefAttributes<TouchableOpacity>
    >,
    WrapperStyleProps
  >
> = styled.TouchableOpacity.attrs(({ theme }) => ({
  hitSlop: {
    top: theme.metrics.md,
    right: theme.metrics.md,
    bottom: theme.metrics.md,
    left: theme.metrics.md,
  },
}))<WrapperStyleProps>`
  margin-right: ${({ theme, withMarginRight }) =>
    withMarginRight ? theme.metrics.md : 0}px;
  margin-left: ${({ theme, withMarginLeft }) =>
    withMarginLeft ? theme.metrics.md : 0}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  justify-content: center;
  align-items: center;
`;
