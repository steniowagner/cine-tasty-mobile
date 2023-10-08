import metrics from './metrics';

export type TypographyStyle = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

type Fonts =
  | 'CircularStd-Black'
  | 'CircularStd-Bold'
  | 'CircularStd-Medium'
  | 'CircularStd-Book';

type TypographyValues = {
  fontFamily: Fonts;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
};

type TypographyElementProps = {
  bold?: boolean;
};

const fontsMapping: Record<string, Fonts> = {
  black: 'CircularStd-Black',
  bold: 'CircularStd-Bold',
  medium: 'CircularStd-Medium',
  book: 'CircularStd-Book',
};

const xs = (props: TypographyElementProps) => ({
  fontFamily: props.bold ? fontsMapping.bold : fontsMapping.medium,
  fontSize: metrics.getWidthFromDP('4'),
  lineHeight: metrics.getWidthFromDP('4'),
  letterSpacing: 0.5,
});

const sm = (props: TypographyElementProps) => ({
  fontFamily: props.bold ? fontsMapping.bold : fontsMapping.medium,
  fontSize: metrics.getWidthFromDP('5'),
  lineHeight: metrics.getWidthFromDP('5'),
  letterSpacing: 0.5,
});

const md = (props: TypographyElementProps) => ({
  fontFamily: props.bold ? fontsMapping.bold : fontsMapping.medium,
  fontSize: metrics.getWidthFromDP('7'),
  lineHeight: metrics.getWidthFromDP('7'),
  letterSpacing: 0.5,
});

const lg = (props: TypographyElementProps) => ({
  fontFamily: props.bold ? fontsMapping.bold : fontsMapping.medium,
  fontSize: metrics.getWidthFromDP('10'),
  lineHeight: metrics.getWidthFromDP('10'),
  letterSpacing: 0.5,
});

const xl = (props: TypographyElementProps) => ({
  fontFamily: props.bold ? fontsMapping.bold : fontsMapping.medium,
  fontSize: metrics.getWidthFromDP('13'),
  lineHeight: metrics.getWidthFromDP('13'),
  letterSpacing: 0.5,
});

const typography: Record<
  TypographyStyle,
  (props: TypographyElementProps) => TypographyValues
> = {
  xs,
  sm,
  md,
  lg,
  xl,
};

export default typography;
