import React from 'react';

import * as Styles from './Section.styles';

type SectionProps = {
  withHorizontalPadding?: boolean;
  noMarginBottom?: boolean;
  noMarginTop?: boolean;
  children: JSX.Element;
  title: string;
};

const Section = (props: SectionProps) => (
  <Styles.Wrapper
    withHorizontalPadding={props.withHorizontalPadding}
    noMarginBottom={props.noMarginBottom}
    noMarginTop={props.noMarginTop}
  >
    <Styles.Title
      withMarginLeft={!props.withHorizontalPadding}
    >
      {props.title}
    </Styles.Title>
    {props.children}
  </Styles.Wrapper>
);

export default Section;
