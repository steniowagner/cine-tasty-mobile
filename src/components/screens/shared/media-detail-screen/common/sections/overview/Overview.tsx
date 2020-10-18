import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import MediaItemDescription from 'components/common/media-item-description/MediaItemDescription';
import Section from 'components/common/Section';
import CONSTANTS from 'utils/constants';

import LoadingOverview from './LoadingOverview';

export const SECTION_TITLE_I18N_REF = 'translations:mediaDetail:sections:overview';

const MediaItemDescriptionWrapper = styled(View)`
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize * 2}px;
`;

type Props = {
  isLoading: boolean;
  overview: string;
};

const Overview = ({ isLoading, overview }: Props) => {
  const { t } = useTranslation();

  return (
    <Section
      title={t(SECTION_TITLE_I18N_REF)}
      noMarginBottom
    >
      {isLoading ? (
        <LoadingOverview />
      ) : (
        <MediaItemDescriptionWrapper
          testID="media-item-description-wrapper"
        >
          <MediaItemDescription
            description={overview}
          />
        </MediaItemDescriptionWrapper>
      )}
    </Section>
  );
};

export default Overview;
