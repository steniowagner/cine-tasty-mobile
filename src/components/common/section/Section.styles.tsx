import {Text, View} from 'react-native';
import styled from 'styled-components/native';

import {CONSTANTS} from '@utils';

type WrapperPaddingStyleProps = {
  withHorizontalPadding?: boolean;
  noMarginBottom?: boolean;
  noMarginTop?: boolean;
};

type TitleMarginStyleProps = {
  withMarginLeft?: boolean;
};

export const Wrapper = styled(View)<WrapperPaddingStyleProps>`
  width: 100%;
  padding-horizontal: ${({withHorizontalPadding}) =>
    withHorizontalPadding ? CONSTANTS.VALUES.DEFAULT_SPACING : 0}px;
  margin-top: ${({noMarginTop, theme}) =>
    noMarginTop ? 0 : theme.metrics.extraLargeSize}px;
  margin-bottom: ${({noMarginBottom, theme}) =>
    noMarginBottom ? 0 : theme.metrics.extraLargeSize}px;
`;

export const Title = styled(Text)<TitleMarginStyleProps>`
  margin-left: ${({withMarginLeft}) =>
    withMarginLeft ? CONSTANTS.VALUES.DEFAULT_SPACING : 0}px
  margin-bottom: ${({theme}) => theme.metrics.largeSize}px;
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({theme}) => theme.colors.text};
  font-family: CircularStd-Black;
`;
