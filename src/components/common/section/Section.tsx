import React, {ReactNode} from 'react';

import * as Styles from './Section.styles';

type SectionProps = {
  withHorizontalPadding?: boolean;
  noMarginBottom?: boolean;
  noMarginTop?: boolean;
  children: ReactNode;
  title: string;
};

const Section = (props: SectionProps) => (
  <Styles.Wrapper
    withHorizontalPadding={props.withHorizontalPadding}
    noMarginBottom={props.noMarginBottom}
    noMarginTop={props.noMarginTop}>
    <Styles.Title
      withMarginLeft={!props.withHorizontalPadding}
      testID="section-title">
      {props.title}
    </Styles.Title>
    {props.children}
  </Styles.Wrapper>
);

export default Section;
