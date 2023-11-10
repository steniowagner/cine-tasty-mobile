import { TouchableOpacityProps } from 'react-native';
import styled, { IStyledComponent } from 'styled-components/native';
import { Substitute } from 'styled-components/native/dist/types';

import metrics from '@styles/metrics';

type Measure = {
  width: number;
  height: number;
};

export type LayoutSize = 'large' | 'medium';

export const LAYOUT_MEASURES: Record<LayoutSize, Measure> = {
  large: {
    width: metrics.getWidthFromDP('40'),
    height: metrics.getWidthFromDP('60'),
  },
  medium: {
    width: metrics.getWidthFromDP('30'),
    height: metrics.getWidthFromDP('40'),
  },
};

type WrapperStyleProps = {
  layoutSize: LayoutSize;
};

export const Wrapper: IStyledComponent<
  'native',
  Substitute<TouchableOpacityProps, WrapperStyleProps>
> = styled.TouchableOpacity<WrapperStyleProps>`
  width: ${({ layoutSize }) => LAYOUT_MEASURES[layoutSize].width}px;
  height: 100%;
  margin-right: ${({ theme }) => theme.metrics.md}px;
`;

export const StarsContentWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.xs}px;
`;

export const Gap = styled.View`
  width: ${({ theme }) => theme.metrics.xs}px;
  height: 1px;
`;
