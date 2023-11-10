import React, { ReactNode } from 'react';

import * as Styles from './Section.styles';

export type SectionProps = {
  children: ReactNode;
  title: string;
};

export const Section = (props: SectionProps) => (
  <Styles.Wrapper testID="section-wrapper">
    <Styles.Title testID="section-title">{props.title}</Styles.Title>
    {props.children}
  </Styles.Wrapper>
);
