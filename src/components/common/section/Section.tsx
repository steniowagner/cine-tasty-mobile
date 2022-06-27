import React, {ReactNode} from 'react';

import * as Styles from './Section.styles';

export type SectionProps = {
  withHorizontalPadding?: boolean;
  noMarginBottom?: boolean;
  noMarginTop?: boolean;
  children: ReactNode;
  title: string;
};

export const Section = (props: SectionProps) => (
  <Styles.Wrapper
    withHorizontalPadding={props.withHorizontalPadding}
    noMarginBottom={props.noMarginBottom}
    noMarginTop={props.noMarginTop}
    testID="section-wrapper">
    <Styles.Title
      withMarginLeft={!props.withHorizontalPadding}
      testID="section-title">
      {props.title}
    </Styles.Title>
    {props.children}
  </Styles.Wrapper>
);
