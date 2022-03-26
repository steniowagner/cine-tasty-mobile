import React from 'react';

import {MediaItemDescription, Section} from '@components/common';

import {LoadingExpansibleTextSection} from './loading-expansible-text-section/LoadingExpansibleTextSection';
import * as Styles from './ExpansibleTextSection.styles';

type ExpansibleTextSectionProps = {
  sectionTitle: string;
  isLoading: boolean;
  text: string;
};

export const ExpansibleTextSection = (props: ExpansibleTextSectionProps) => (
  <Section title={props.sectionTitle} noMarginBottom>
    {props.isLoading ? (
      <LoadingExpansibleTextSection />
    ) : (
      <Styles.MediaItemDescriptionWrapper testID="media-item-description-wrapper">
        <MediaItemDescription description={props.text} />
      </Styles.MediaItemDescriptionWrapper>
    )}
  </Section>
);
