import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import MediaItemDescription from 'components/common/media-item-description/MediaItemDescription';
import Section from 'components/common/Section';
import CONSTANTS from 'utils/constants';

import LoadingExpansibleTextSection from './LoadingExpansibleTextSection';

const MediaItemDescriptionWrapper = styled(View)`
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize * 2}px;
`;

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
      <MediaItemDescriptionWrapper
        testID="media-item-description-wrapper"
      >
        <MediaItemDescription
          description={text}
        />
      </MediaItemDescriptionWrapper>
    )}
  </Section>
);

export default ExpansibleTextSection;
