import React from 'react';

import {MediaItemDescription, Section} from '@components';

import * as Styles from './Overview.styles';
import {useOverview} from './useOverview';

type OverviewProps = {
  overview: string;
};

export const Overview = (props: OverviewProps) => {
  const overview = useOverview();

  return (
    <Section title={overview.texts.sectionTitle}>
      <Styles.MediaItemDescriptionWrapper testID="media-item-description-wrapper">
        <MediaItemDescription description={props.overview} />
      </Styles.MediaItemDescriptionWrapper>
    </Section>
  );
};
