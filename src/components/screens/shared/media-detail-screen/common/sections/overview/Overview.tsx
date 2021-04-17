import React from 'react';
import { useTranslation } from 'react-i18next';

import MediaItemDescription from '@components/common/media-item-description/MediaItemDescription';
import Section from '@components/common/section/Section';
import * as TRANSLATIONS from '@i18n/tags';

import LoadingOverview from './loading-overview/LoadingOverview';
import * as Styles from './Overview.styles';

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
        <Styles.MediaItemDescriptionWrapper
          testID="media-item-description-wrapper"
        >
          <MediaItemDescription
            description={overview}
          />
        </Styles.MediaItemDescriptionWrapper>
      )}
    </Section>
  );
};

export default Overview;
