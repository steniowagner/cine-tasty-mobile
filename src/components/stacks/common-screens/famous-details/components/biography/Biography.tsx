import React from 'react';

import { MediaItemDescription, Section } from '@common-components';

import * as Styles from './Biography.styles';

type BiographyProps = {
  sectionTitle: string;
  text: string;
};

export const Biography = (props: BiographyProps) => (
  <Section title={props.sectionTitle}>
    <Styles.Wrapper testID="biography">
      <MediaItemDescription description={props.text} />
    </Styles.Wrapper>
  </Section>
);
