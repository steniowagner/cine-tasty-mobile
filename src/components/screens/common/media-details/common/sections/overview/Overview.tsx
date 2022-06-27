import React from 'react';

import {MediaItemDescription, Section} from '@components';

import {LoadingOverview} from './loading-overview/LoadingOverview';
import * as Styles from './Overview.styles';
import {useOverview} from './useOverview';

type OverviewProps = {
  isLoading: boolean;
  overview: string;
};

export const Overview = (props: OverviewProps) => {
  const overview = useOverview();
  return (
    <Section title={overview.texts.sectionTitle}>
      {props.isLoading ? (
        <LoadingOverview />
      ) : (
        <Styles.MediaItemDescriptionWrapper testID="media-item-description-wrapper">
          <MediaItemDescription description={props.overview} />
        </Styles.MediaItemDescriptionWrapper>
      )}
    </Section>
  );
};
