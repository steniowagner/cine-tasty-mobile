import React from 'react';

import * as Styles from './Section.styles';

type SectionProps = {
  withHorizontalPadding?: boolean;
  noMarginBottom?: boolean;
  noMarginTop?: boolean;
  children: JSX.Element;
  title: string;
};

const Section = ({
  withHorizontalPadding,
  noMarginBottom,
  noMarginTop,
  children,
  title,
}: SectionProps) => (
  <Styles.Wrapper
    withHorizontalPadding={withHorizontalPadding}
    noMarginBottom={noMarginBottom}
    noMarginTop={noMarginTop}
  >
    <Styles.Title
      withMarginLeft={!withHorizontalPadding}
    >
      {title}
    </Styles.Title>
    {children}
  </Styles.Wrapper>
);

export default Section;
