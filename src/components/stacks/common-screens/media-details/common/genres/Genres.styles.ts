import { ViewProps } from 'react-native';
import styled, { IStyledComponent } from 'styled-components/native';
import { Substitute } from 'styled-components/native/dist/types';

type ExtraTagStyleProp = {
  isGenre: boolean;
};

export const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding-horizontal: ${({ theme }) => theme.metrics.md}px;
`;

export const Item: IStyledComponent<
  'native',
  Substitute<ViewProps, ExtraTagStyleProp>
> = styled.View<ExtraTagStyleProp>`
  margin-right: ${({ theme }) => theme.metrics.sm}px;
  margin-top: ${({ theme }) => theme.metrics.md}px;
  padding-horizontal: ${({ theme }) => theme.metrics.lg}px;
  padding-vertical: ${({ theme }) => theme.metrics.md}px;
  background-color: ${({ isGenre, theme }) =>
    isGenre ? theme.colors.primary : theme.colors.contrast};
  border-radius: ${({ theme }) => theme.borderRadius.xs}px;
`;
