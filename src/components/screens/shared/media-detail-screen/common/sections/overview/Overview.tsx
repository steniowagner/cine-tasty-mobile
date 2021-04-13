import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import MediaItemDescription from '@components/common/media-item-description/MediaItemDescription';
import Section from '@components/common/Section';
import * as TRANSLATIONS from '@i18n/tags';
import CONSTANTS from '@utils/constants';

import LoadingOverview from './LoadingOverview';

const MediaItemDescriptionWrapper = styled(View)`
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

type Props = {
  isLoading: boolean;
  overview: string;
};

const Overview = ({ isLoading, overview }: Props) => {
  const { t } = useTranslation();

  return (
    <Section
      title={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_OVERVIEW)}
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
