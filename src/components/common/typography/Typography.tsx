import React from 'react';
import { Text as TextNative, StyleProp, TextStyle } from 'react-native';
import {
  DefaultTheme,
  TypographyValues,
  styled,
} from 'styled-components/native';

import { TypographyStyle } from '@styles/typography';

export type DefaultTypographyProps = {
  alignment?: 'auto' | 'left' | 'center' | 'right' | 'justify';
  style?: StyleProp<TextStyle>;
  color?: string;
  bold?: boolean;
  testID?: string;
  children: string;
};

type TextParentProps = DefaultTypographyProps & {
  typographyStyle?: TypographyStyle;
  theme?: DefaultTheme;
};

const TextParent = (props: TextParentProps) => {
  const typographyStylesMapping: TypographyValues = {
    xs: props.theme!.typography.xs,
    sm: props.theme!.typography.sm,
    md: props.theme!.typography.md,
    lg: props.theme!.typography.lg,
    xl: props.theme!.typography.xl,
  };
  const styles = [
    typographyStylesMapping[props.typographyStyle!]({ bold: !!props.bold }),
    props.style,
    {
      textAlign: props.alignment ?? 'left',
      color: props.color ?? props.theme!.colors.text,
    },
  ];
  return (
    <TextNative {...props} style={styles}>
      {props.children}
    </TextNative>
  );
};

const ExtraSmallText = styled(TextParent).attrs(({ theme }) => ({
  typographyStyle: 'xs',
  theme,
}))<DefaultTypographyProps>``;

const SmallText = styled(TextParent).attrs(({ theme }) => ({
  typographyStyle: 'sm',
  theme,
}))<DefaultTypographyProps>``;

const MediumText = styled(TextParent).attrs(({ theme }) => ({
  typographyStyle: 'md',
  theme,
}))<DefaultTypographyProps>``;

const LargeText = styled(TextParent).attrs(({ theme }) => ({
  typographyStyle: 'lg',
  theme,
}))<DefaultTypographyProps>``;

const ExtraLargeText = styled(TextParent).attrs(({ theme }) => ({
  typographyStyle: 'xl',
  theme,
}))<DefaultTypographyProps>``;

export default {
  ExtraSmallText,
  SmallText,
  MediumText,
  LargeText,
  ExtraLargeText,
};
