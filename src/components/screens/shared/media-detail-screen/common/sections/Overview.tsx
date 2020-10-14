import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import MediaItemDescription from 'components/common/media-item-description/MediaItemDescription';
import Section from 'components/common/Section';
import CONSTANTS from 'utils/constants';

const MediaItemDescriptionWrapper = styled(View)`
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

type Props = {
  overview: string;
};

const Overview = ({ overview }: Props) => {
  const { t } = useTranslation();

  return (
    <Section
      title={t('translations:mediaDetail:sections:overview')}
    >
      <MediaItemDescriptionWrapper>
        <MediaItemDescription
          description={overview}
        />
      </MediaItemDescriptionWrapper>
    </Section>
  );
};

export default Overview;
