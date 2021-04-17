import React from 'react';

import MediaItemDescription from '@components/common/media-item-description/MediaItemDescription';
import Section from '@components/common/section/Section';

import LoadingExpansibleTextSection from './loading-expansible-text-section/LoadingExpansibleTextSection';
import * as Styles from './ExpansibleTextSection.styles';

type Props = {
  sectionTitle: string;
  isLoading: boolean;
  text: string;
};

const ExpansibleTextSection = ({ sectionTitle, isLoading, text }: Props) => (
  <Section
    title={sectionTitle}
    noMarginBottom
  >
    {isLoading ? (
      <LoadingExpansibleTextSection />
    ) : (
      <Styles.MediaItemDescriptionWrapper
        testID="media-item-description-wrapper"
      >
        <MediaItemDescription
          description={text}
        />
      </Styles.MediaItemDescriptionWrapper>
    )}
  </Section>
);

export default ExpansibleTextSection;
