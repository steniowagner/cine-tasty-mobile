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
  description: string;
};

const Overview = ({ description }: Props) => {
  const { t } = useTranslation();

  return (
    <Section
      title={t('translations:mediaDetail:sections:overview')}
    >
      <MediaItemDescriptionWrapper>
        <MediaItemDescription
          description={description}
        />
      </MediaItemDescriptionWrapper>
    </Section>
  );
};

export default Overview;
