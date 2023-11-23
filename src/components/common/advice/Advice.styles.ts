import { Platform, ViewProps } from 'react-native';
import styled, { IStyledComponent } from 'styled-components/native';
import { Substitute } from 'styled-components/native/dist/types';

import { Typography } from '..';

type WrapperStyleProps = {
  withMarginTop?: boolean;
};

export const Wrapper: IStyledComponent<
  'native',
  Substitute<ViewProps, WrapperStyleProps>
> = styled.View<WrapperStyleProps>`
  flex: 1;
  align-items: center;
  margin-top: ${({ withMarginTop, theme }) => {
    const marginTop = Platform.select({
      android: theme.metrics.xl * 4,
      ios: theme.metrics.xl * 6,
    });
    return withMarginTop ? marginTop : 0;
  }}px;
  padding-horizontal: ${({ theme }) => theme.metrics.xl}px;
`;

export const IconWrapper = styled.View`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('32')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('32')}px;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.getWidthFromDP('24')}px;
  margin-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('12')}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled(Typography.MediumText).attrs({
  numberOfLines: 1,
  alignment: 'center',
})``;

export const Description = styled(Typography.SmallText).attrs(({ theme }) => ({
  color: theme.colors.subText,
  numberOfLines: 2,
  alignment: 'center',
}))`
  margin-vertical: ${({ theme }) => theme.metrics.getWidthFromDP('7')}px;
`;

export const Suggestion = styled(Typography.ExtraSmallText).attrs(
  ({ theme }) => ({
    numberOfLines: 2,
    color: theme.colors.text,
    alignment: 'center',
  }),
)``;
